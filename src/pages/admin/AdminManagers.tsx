import { Outlet, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/admin/managers/list": {
    title: "운영자 목록",
    description:
      "관리자 페이지에 접근할 수 있는 운영자 계정을 등록하고, 정보·역할·로그인 상태를 관리합니다.",
  },
  "/admin/managers/roles": {
    title: "역할 관리",
    description:
      "운영자에게 부여할 역할을 만들고, 기능 권한과 페이지 접근 권한을 세분화하여 설정합니다.",
  },
  "/admin/managers/audit": {
    title: "감사 로그",
    description:
      "운영자가 수행한 주요 작업 이력을 조회하고, 기간·작업 유형별로 필터링하여 감사 추적에 활용합니다.",
  },
};

const DEFAULT_META = {
  title: "매니저 관리",
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
