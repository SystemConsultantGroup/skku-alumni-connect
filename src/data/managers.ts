import { useSyncExternalStore } from "react";

export type ModeratorStatus = "active" | "inactive";

export interface Moderator {
  id: string;
  status: ModeratorStatus;
  name: string;
  email: string;
  position: string;
  roleIds: string[];
  lastLoginAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  scopes: string[]; // e.g., 'page:dashboard', 'action:read_users'
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actionType: string;
  targetResource: string;
}

// Initial Mock Data
let roles: Role[] = [
  {
    id: "role_owner",
    name: "마스터 관리자",
    description: "모든 권한을 가진 최고 관리자입니다.",
    scopes: ["*"],
  },
  {
    id: "role_admin",
    name: "일반 관리자",
    description: "운영자 관리를 포함한 대부분의 권한을 가집니다.",
    scopes: ["page:*", "action:write_users", "action:manage_admins"],
  },
  {
    id: "role_asis",
    name: "ASIS 동기화 담당",
    description: "ASIS 최신화 관리 페이지에만 접근할 수 있습니다.",
    scopes: ["page:asis-sync", "action:read_users", "action:write_users"],
  },
];

let moderators: Moderator[] = [
  {
    id: "admin1",
    status: "active",
    name: "장재원",
    email: "president@skku.edu",
    position: "총동창회 회장",
    roleIds: ["role_owner"],
    lastLoginAt: "2026-05-18T10:30:00Z",
  },
  {
    id: "admin2",
    status: "active",
    name: "안상인",
    email: "secretary@skku.edu",
    position: "사무총장",
    roleIds: ["role_admin"],
    lastLoginAt: "2026-05-17T09:15:00Z",
  },
  {
    id: "staff1",
    status: "active",
    name: "김사무",
    email: "staff@skku.edu",
    position: "사무처 직원",
    roleIds: ["role_asis"],
    lastLoginAt: "2026-05-18T11:00:00Z",
  },
];

let auditLogs: AuditLogEntry[] = [
  {
    id: "log_4",
    timestamp: "2026-05-18T11:10:00Z",
    actorId: "president",
    actorName: "안상인",
    actionType: "관리자 추가",
    targetResource: "staff2",
  },
  {
    id: "log_3",
    timestamp: "2026-05-18T11:05:00Z",
    actorId: "scg",
    actorName: "장재원",
    actionType: "역할 추가",
    targetResource: "ASIS 동기화 담당",
  },
  {
    id: "log_2",
    timestamp: "2026-05-17T11:10:00Z",
    actorId: "president",
    actorName: "안상인",
    actionType: "관리자 추가",
    targetResource: "staff1",
  },
  {
    id: "log_1",
    timestamp: "2026-05-16T11:10:00Z",
    actorId: "president",
    actorName: "안상인",
    actionType: "관리자 비활성화",
    targetResource: "staff1",
  },
];

type Listener = () => void;
let listeners: Listener[] = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export const managersStore = {
  getRoles: () => roles,
  getModerators: () => moderators,
  getAuditLogs: () => auditLogs,

  addModerator: (mod: Omit<Moderator, "id" | "lastLoginAt">) => {
    const newId = `staff_${Date.now()}`;
    const newMod: Moderator = { ...mod, id: newId, lastLoginAt: "-" };
    moderators = [...moderators, newMod];
    
    auditLogs = [
      {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        actorId: "system", // Should be current user in real app
        actorName: "System",
        actionType: "Added Moderator",
        targetResource: newId,
      },
      ...auditLogs,
    ];
    
    emitChange();
  },

  updateModerator: (id: string, updates: Partial<Omit<Moderator, "id">>) => {
    moderators = moderators.map((mod) => (mod.id === id ? { ...mod, ...updates } : mod));
    
    auditLogs = [
      {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        actorId: "system",
        actorName: "System",
        actionType: "Updated Moderator",
        targetResource: id,
      },
      ...auditLogs,
    ];
    
    emitChange();
  },

  deleteModerator: (id: string) => {
    moderators = moderators.filter((mod) => mod.id !== id);
    
    auditLogs = [
      {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        actorId: "system",
        actorName: "System",
        actionType: "Deleted Moderator",
        targetResource: id,
      },
      ...auditLogs,
    ];
    
    emitChange();
  },

  addRole: (role: Omit<Role, "id">) => {
    const newId = `role_${Date.now()}`;
    const newRole: Role = { ...role, id: newId };
    roles = [...roles, newRole];
    
    auditLogs = [
      {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        actorId: "system",
        actorName: "System",
        actionType: "Created Role",
        targetResource: newId,
      },
      ...auditLogs,
    ];
    
    emitChange();
  },

  updateRole: (id: string, updates: Partial<Omit<Role, "id">>) => {
    roles = roles.map((role) => (role.id === id ? { ...role, ...updates } : role));
    
    auditLogs = [
      {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        actorId: "system",
        actorName: "System",
        actionType: "Updated Role",
        targetResource: id,
      },
      ...auditLogs,
    ];
    
    emitChange();
  },

  deleteRole: (id: string) => {
    roles = roles.filter((role) => role.id !== id);
    // Also remove role from assigned moderators
    moderators = moderators.map((mod) => ({
      ...mod,
      roleIds: mod.roleIds.filter(rid => rid !== id)
    }));
    
    auditLogs = [
      {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        actorId: "system",
        actorName: "System",
        actionType: "Deleted Role",
        targetResource: id,
      },
      ...auditLogs,
    ];
    
    emitChange();
  },

  subscribe: (listener: Listener) => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};

export function useModerators() {
  return useSyncExternalStore(managersStore.subscribe, managersStore.getModerators);
}

export function useRoles() {
  return useSyncExternalStore(managersStore.subscribe, managersStore.getRoles);
}

export function useAuditLogs() {
  return useSyncExternalStore(managersStore.subscribe, managersStore.getAuditLogs);
}
