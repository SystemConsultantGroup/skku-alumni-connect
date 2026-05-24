import { Outlet, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/admin/managers/list": {
    title: "운영자 목록",
    description:
      "운영자를 추가, 조회하고 수정할 수 있습니다.",
  },
  "/admin/managers/roles": {
    title: "역할 관리",
    description:
      "역할을 정의하고 다른 운영자에게 부여할 수 있습니다.",
  },
  "/admin/managers/audit": {
    title: "감사 로그",
    description:
      "모든 운영자의 작업 내역을 확인할 수 있습니다.",
  },
};

const DEFAULT_META = {
  title: "운영자 관리",
  description: "관리자 계정과 세부 권한을 관리합니다.",
};

const AdminManagers = () => {
  const location = useLocation();
  const meta = PAGE_META[location.pathname] ?? DEFAULT_META;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">{meta.title}</h1>
      </div>
      <p className="text-muted-foreground">{meta.description}</p>

      <Outlet />
    </div>
  );
};

export default AdminManagers;
