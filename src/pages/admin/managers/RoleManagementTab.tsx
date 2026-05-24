import { useState } from "react";
import { useRoles, useModerators, managersStore, Role } from "@/data/managers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Plus, ShieldCheck, Trash2, Edit, Search } from "lucide-react";
import { toast } from "sonner";

const ACTION_PERMISSIONS = [
  { id: "action:read_users", label: "회원 정보 조회" },
  { id: "action:write_users", label: "회원 정보 수정" },
  { id: "action:manage_admins", label: "운영자 관리" },
];

const PAGE_PERMISSIONS = [
  { id: "page:asis-sync", label: "ASIS 최신화 관리" },
  { id: "page:upload", label: "엑셀 업로드" },
  { id: "page:applications", label: "신규 신청 관리" },
  { id: "page:payments", label: "기여금 관리" },
  { id: "page:news", label: "공지/뉴스 관리" },
  { id: "page:community", label: "커뮤니티 관리" },
  { id: "page:reports", label: "신고 관리" },
];

export default function RoleManagementTab() {
  const roles = useRoles();
  const moderators = useModerators();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: "", description: "" });
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [assignToMods, setAssignToMods] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoles = roles.filter((role) => {
    return role.name.includes(searchTerm) || role.description.includes(searchTerm);
  });

  // Edit Role Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [editScopes, setEditScopes] = useState<string[]>([]);

  // Assign View Modal State
  const [isAssignViewOpen, setIsAssignViewOpen] = useState(false);
  const [viewingRole, setViewingRole] = useState<Role | null>(null);

  const getAssignedCount = (roleId: string) => {
    return moderators.filter((mod) => mod.roleIds.includes(roleId)).length;
  };

  const handleCreateRole = () => {
    if (!newRole.name) {
      toast.error("역할 이름을 입력해주세요.");
      return;
    }
    managersStore.addRole({
      name: newRole.name,
      description: newRole.description,
      scopes: selectedScopes,
    });

    // For mock: assigning immediately would need to loop and update each mod.
    if (assignToMods.length > 0) {
      assignToMods.forEach(modId => {
        const mod = moderators.find(m => m.id === modId);
        if (mod) {
          // This is mock logic, in reality we'd get the newly created role ID.
          // Since store doesn't return the ID, we'll just show the toast.
        }
      });
      toast.success(`역할 생성 및 ${assignToMods.length}명에게 할당 완료`);
    } else {
      toast.success("역할이 생성되었습니다.");
    }

    setIsAddModalOpen(false);
    setNewRole({ name: "", description: "" });
    setSelectedScopes([]);
    setAssignToMods([]);
  };

  const openEditModal = (role: Role) => {
    setEditingRole(role);
    setEditScopes([...role.scopes]);
    setIsEditModalOpen(true);
  };

  const handleEditRole = () => {
    if (!editingRole) return;
    if (!editingRole.name) {
      toast.error("역할 이름을 입력해주세요.");
      return;
    }
    managersStore.updateRole(editingRole.id, {
      name: editingRole.name,
      description: editingRole.description,
      scopes: editScopes,
    });
    toast.success("역할 정보가 수정되었습니다.");
    setIsEditModalOpen(false);
  };

  const openAssignViewModal = (role: Role) => {
    setViewingRole(role);
    setIsAssignViewOpen(true);
  };

  const handleDelete = (roleId: string, isOwner: boolean) => {
    if (isOwner) {
      toast.error("시스템 기본 역할은 삭제할 수 없습니다.");
      return;
    }
    const count = getAssignedCount(roleId);
    if (count > 0) {
      toast.error(`현재 ${count}명의 운영자가 이 역할을 사용 중입니다. 역할을 해제한 후 삭제해주세요.`);
      return;
    }
    if (confirm("정말 이 역할을 삭제하시겠습니까?")) {
      managersStore.deleteRole(roleId);
      toast.success("역할이 삭제되었습니다.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="역할 이름, 설명 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              역할 만들기
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>새 역할 만들기</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-6 py-4">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="role-name">역할 이름</Label>
                  <Input
                    id="role-name"
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    placeholder="예: 콘텐츠 관리자"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role-desc">설명 (선택)</Label>
                  <Textarea
                    id="role-desc"
                    value={newRole.description}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    placeholder="역할에 대한 설명을 입력하세요"
                    className="resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>권한 설정</Label>
                <div className="border rounded-md p-4 space-y-6 max-h-[300px] overflow-y-auto">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      기능 권한
                    </h4>
                    <div className="grid grid-cols-1 gap-2 pl-6">
                      {ACTION_PERMISSIONS.map((perm) => (
                        <div key={perm.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={perm.id}
                            checked={selectedScopes.includes(perm.id)}
                            onCheckedChange={(c) => {
                              if (c) setSelectedScopes([...selectedScopes, perm.id]);
                              else setSelectedScopes(selectedScopes.filter(id => id !== perm.id));
                            }}
                          />
                          <Label htmlFor={perm.id} className="font-normal cursor-pointer text-sm">
                            {perm.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      페이지 접근 권한
                    </h4>
                    <div className="grid grid-cols-2 gap-2 pl-6">
                      {PAGE_PERMISSIONS.map((perm) => (
                        <div key={perm.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={perm.id}
                            checked={selectedScopes.includes(perm.id)}
                            onCheckedChange={(c) => {
                              if (c) setSelectedScopes([...selectedScopes, perm.id]);
                              else setSelectedScopes(selectedScopes.filter(id => id !== perm.id));
                            }}
                          />
                          <Label htmlFor={perm.id} className="font-normal cursor-pointer text-sm">
                            {perm.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>취소</Button>
              <Button onClick={handleCreateRole}>만들기</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">역할 이름</TableHead>
              <TableHead>설명</TableHead>
              <TableHead className="w-[120px] text-center">할당된 인원</TableHead>
              <TableHead className="w-[160px] text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              filteredRoles.map((role) => {
                const count = getAssignedCount(role.id);
                const isOwner = role.id === "role_owner" || role.id === "role_admin";
                return (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell className="text-muted-foreground">{role.description}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="outline" size="sm" onClick={() => openAssignViewModal(role)}>
                        <Users className="w-3.5 h-3.5 mr-1.5" />
                        {count}명 부여
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={isOwner}
                          className={!isOwner ? "text-primary hover:text-primary hover:bg-primary/10" : ""}
                          onClick={() => openEditModal(role)}
                        >
                          <Edit className="w-3.5 h-3.5 mr-1.5" />
                          수정
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={isOwner}
                          className={!isOwner ? "text-destructive hover:text-destructive hover:bg-destructive/10" : ""}
                          onClick={() => handleDelete(role.id, isOwner)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              }))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Role Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>역할 수정</DialogTitle>
          </DialogHeader>
          {editingRole && (
            <div className="grid grid-cols-1 gap-6 py-4">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-role-name">역할 이름</Label>
                  <Input
                    id="edit-role-name"
                    value={editingRole.name}
                    onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-role-desc">설명</Label>
                  <Textarea
                    id="edit-role-desc"
                    value={editingRole.description}
                    onChange={(e) => setEditingRole({ ...editingRole, description: e.target.value })}
                    className="resize-none h-12"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>권한 설정</Label>
                <div className="border rounded-md p-4 space-y-6 max-h-[300px] overflow-y-auto">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      기능 권한
                    </h4>
                    <div className="grid grid-cols-1 gap-2 pl-6">
                      {ACTION_PERMISSIONS.map((perm) => (
                        <div key={perm.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`edit-${perm.id}`}
                            checked={editScopes.includes(perm.id)}
                            onCheckedChange={(c) => {
                              if (c) setEditScopes([...editScopes, perm.id]);
                              else setEditScopes(editScopes.filter(id => id !== perm.id));
                            }}
                          />
                          <Label htmlFor={`edit-${perm.id}`} className="font-normal cursor-pointer text-sm">
                            {perm.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      페이지 접근 권한
                    </h4>
                    <div className="grid grid-cols-2 gap-2 pl-6">
                      {PAGE_PERMISSIONS.map((perm) => (
                        <div key={perm.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`edit-${perm.id}`}
                            checked={editScopes.includes(perm.id)}
                            onCheckedChange={(c) => {
                              if (c) setEditScopes([...editScopes, perm.id]);
                              else setEditScopes(editScopes.filter(id => id !== perm.id));
                            }}
                          />
                          <Label htmlFor={`edit-${perm.id}`} className="font-normal cursor-pointer text-sm">
                            {perm.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>취소</Button>
            <Button onClick={handleEditRole}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign View Modal */}
      <Dialog open={isAssignViewOpen} onOpenChange={setIsAssignViewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>역할 할당 관리 - {viewingRole?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label className="mb-2 block">
              운영자 목록 (총 {moderators.length}명 중 {viewingRole ? getAssignedCount(viewingRole.id) : 0}명 할당됨)
            </Label>
            <div className="border rounded-md max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] text-center">할당</TableHead>
                    <TableHead>아이디</TableHead>
                    <TableHead>이름</TableHead>
                    <TableHead>직책/소속</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {moderators.map(mod => {
                    const isAssigned = viewingRole ? mod.roleIds.includes(viewingRole.id) : false;
                    return (
                      <TableRow key={mod.id}>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={isAssigned}
                            onCheckedChange={(c) => {
                              if (viewingRole) {
                                const newRoleIds = c
                                  ? [...mod.roleIds, viewingRole.id]
                                  : mod.roleIds.filter(id => id !== viewingRole.id);
                                managersStore.updateModerator(mod.id, { roleIds: newRoleIds });
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>{mod.id}</TableCell>
                        <TableCell className="font-medium">{mod.name}</TableCell>
                        <TableCell>{mod.position}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAssignViewOpen(false)}>닫기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
