import { Outlet } from "react-router-dom";
import { Shield } from "lucide-react";

const AdminManagers = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">매니저 관리</h1>
      </div>
      <p className="text-muted-foreground">
        관리자 계정과 세부 권한을 관리합니다.
      </p>

      <Outlet />
    </div>
  );
};

export default AdminManagers;
