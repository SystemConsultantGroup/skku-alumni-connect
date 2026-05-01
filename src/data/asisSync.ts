import { useSyncExternalStore } from "react";
import { allMembers } from "./adminMembers";

export type AsisStatus = "synced" | "pending";
export type AsisField = "phone" | "address" | "email";

export const ASIS_FIELD_LABEL: Record<AsisField, string> = {
  phone: "연락처",
  address: "주소",
  email: "이메일",
};

export interface AsisPendingChange {
  field: AsisField;
  oldValue: string;
  newValue: string;
}

export interface AsisRecord {
  memberId: number;
  status: AsisStatus;
  changes: AsisPendingChange[];
  updatedAt: string;
}

interface AsisStore {
  records: Record<number, AsisRecord>;
}

const buildInitialRecords = (): Record<number, AsisRecord> => {
  const records: Record<number, AsisRecord> = {};
  for (const m of allMembers) {
    records[m.id] = {
      memberId: m.id,
      status: "synced",
      changes: [],
      updatedAt: "",
    };
  }

  const seed = (
    memberId: number,
    changes: AsisPendingChange[],
    updatedAt: string,
  ) => {
    records[memberId] = {
      memberId,
      status: "pending",
      changes,
      updatedAt,
    };
  };

  seed(
    2,
    [
      { field: "phone", oldValue: "010-1001-5003", newValue: allMembers.find((m) => m.id === 2)?.phone ?? "" },
    ],
    "2026-04-28T11:20:00.000Z",
  );
  seed(
    5,
    [
      { field: "address", oldValue: "서울시 마포구 성산로 22", newValue: allMembers.find((m) => m.id === 5)?.address ?? "" },
      { field: "email", oldValue: "old.daeho@example.com", newValue: allMembers.find((m) => m.id === 5)?.email ?? "" },
    ],
    "2026-04-29T09:05:00.000Z",
  );
  seed(
    8,
    [
      { field: "phone", oldValue: "010-1007-5021", newValue: allMembers.find((m) => m.id === 8)?.phone ?? "" },
      { field: "address", oldValue: "서울시 서초구 반포대로 88", newValue: allMembers.find((m) => m.id === 8)?.address ?? "" },
    ],
    "2026-04-30T17:42:00.000Z",
  );
  seed(
    13,
    [
      { field: "email", oldValue: "former.jeongmin@example.com", newValue: allMembers.find((m) => m.id === 13)?.email ?? "" },
    ],
    "2026-05-01T08:11:00.000Z",
  );
  seed(
    17,
    [
      { field: "phone", oldValue: "010-1016-5048", newValue: allMembers.find((m) => m.id === 17)?.phone ?? "" },
      { field: "address", oldValue: "대구시 중구 동성로 12", newValue: allMembers.find((m) => m.id === 17)?.address ?? "" },
      { field: "email", oldValue: "old.sangchul@example.com", newValue: allMembers.find((m) => m.id === 17)?.email ?? "" },
    ],
    "2026-04-27T13:34:00.000Z",
  );

  return records;
};

const store: AsisStore = {
  records: buildInitialRecords(),
};

const listeners = new Set<() => void>();

const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

const emit = () => {
  listeners.forEach((l) => l());
};

const snapshot = () => store;

export const useAsisStore = <T,>(selector: (s: AsisStore) => T): T =>
  useSyncExternalStore(
    subscribe,
    () => selector(snapshot()),
    () => selector(snapshot()),
  );

export const markAsisSynced = (memberId: number) => {
  const current = store.records[memberId];
  if (!current) return;
  store.records = {
    ...store.records,
    [memberId]: {
      ...current,
      status: "synced",
      changes: [],
      updatedAt: new Date().toISOString(),
    },
  };
  emit();
};

export const setAsisStatus = (memberId: number, status: AsisStatus) => {
  const current = store.records[memberId];
  const base: AsisRecord = current ?? {
    memberId,
    status: "synced",
    changes: [],
    updatedAt: "",
  };
  store.records = {
    ...store.records,
    [memberId]: {
      ...base,
      status,
      changes: status === "synced" ? [] : base.changes,
      updatedAt: new Date().toISOString(),
    },
  };
  emit();
};

export const selectAsisStore = (s: AsisStore) => s.records;

export const selectPendingAsisCount = (s: AsisStore) =>
  Object.values(s.records).filter((r) => r.status === "pending").length;
