import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";
import ManagerListTab from "./managers/ManagerListTab";
import RoleManagementTab from "./managers/RoleManagementTab";
import AuditLogTab from "./managers/AuditLogTab";

const AdminManagers = () => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">매니저 관리</h1>
      </div>
      <p className="text-muted-foreground">
        관리자 계정과 세부 권한을 관리합니다.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">운영자 목록</TabsTrigger>
          <TabsTrigger value="roles">역할 관리</TabsTrigger>
          <TabsTrigger value="audit">감사 로그</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="mt-0">
          <ManagerListTab />
        </TabsContent>
        <TabsContent value="roles" className="mt-0">
          <RoleManagementTab />
        </TabsContent>
        <TabsContent value="audit" className="mt-0">
          <AuditLogTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminManagers;
