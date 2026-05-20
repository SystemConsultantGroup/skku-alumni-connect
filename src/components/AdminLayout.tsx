import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Upload,
  FileText,
  CreditCard,
  Newspaper,
  MessageSquare,
  Flag,
  LogOut,
  RefreshCw,
  Shield,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { selectPendingReportCount, useReportStore } from "@/data/reports";
import { selectPendingAsisCount, useAsisStore } from "@/data/asisSync";

type MenuChild = { label: string; path: string };

type MenuItem = {
  label: string;
  icon: LucideIcon;
  path: string;
  children?: MenuChild[];
};

const menuItems: MenuItem[] = [
  { label: "대시보드", icon: LayoutDashboard, path: "/admin" },
  { label: "회원 관리", icon: Users, path: "/admin/members" },
  { label: "ASIS 최신화 관리", icon: RefreshCw, path: "/admin/asis-sync" },
  { label: "엑셀 업로드", icon: Upload, path: "/admin/upload" },
  { label: "신규 신청 관리", icon: FileText, path: "/admin/applications" },
  { label: "기여금 관리", icon: CreditCard, path: "/admin/payments" },
  { label: "공지/뉴스 관리", icon: Newspaper, path: "/admin/news" },
  { label: "커뮤니티 관리", icon: MessageSquare, path: "/admin/community" },
  { label: "신고 관리", icon: Flag, path: "/admin/reports" },
  {
    label: "매니저 관리",
    icon: Shield,
    path: "/admin/managers",
    children: [
      { label: "운영자 목록", path: "/admin/managers/list" },
      { label: "역할 관리", path: "/admin/managers/roles" },
      { label: "감사 로그", path: "/admin/managers/audit" },
    ],
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pendingReports = useReportStore(selectPendingReportCount);
  const pendingAsis = useAsisStore(selectPendingAsisCount);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setOpenGroups((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const item of menuItems) {
        if (item.children && location.pathname.startsWith(item.path)) {
          if (!next[item.path]) {
            next[item.path] = true;
            changed = true;
          }
        }
      }
      return changed ? next : prev;
    });
  }, [location.pathname]);

  const isParentActive = (item: MenuItem) => {
    if (item.children) {
      return location.pathname.startsWith(item.path);
    }
    if (item.path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(item.path);
  };

  const isChildActive = (path: string) => location.pathname === path;

  const badgeCountFor = (path: string): number => {
    if (path === "/admin/reports") return pendingReports;
    if (path === "/admin/asis-sync") return pendingAsis;
    return 0;
  };

  const handleParentClick = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      const willOpen = !openGroups[item.path];
      setOpenGroups((prev) => ({ ...prev, [item.path]: willOpen }));
      if (!location.pathname.startsWith(item.path)) {
        navigate(item.children[0].path);
      }
      return;
    }
    navigate(item.path);
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-60 bg-card border-r border-border flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-4 border-b border-border">
          <h1 className="font-bold text-foreground text-lg">총동창회 관리자</h1>
          <p className="text-xs text-muted-foreground">사무처 관리 시스템</p>
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {menuItems.map((item) => {
            const badgeCount = badgeCountFor(item.path);
            const hasChildren = !!item.children?.length;
            const parentActive = isParentActive(item);
            const isOpen = openGroups[item.path] ?? false;

            return (
              <div key={item.path}>
                <button
                  onClick={() => handleParentClick(item)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    parentActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  aria-expanded={hasChildren ? isOpen : undefined}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {badgeCount > 0 && (
                    <span className="bg-destructive text-destructive-foreground text-[10px] font-semibold rounded-full px-1.5 min-w-[18px] text-center leading-[18px]">
                      {badgeCount}
                    </span>
                  )}
                  {hasChildren && (
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {hasChildren && isOpen && (
                  <div className="mt-0.5 mb-1 ml-3 pl-3 border-l border-border space-y-0.5">
                    {item.children!.map((child) => {
                      const active = isChildActive(child.path);
                      return (
                        <button
                          key={child.path}
                          onClick={() => navigate(child.path)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            active
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          {child.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-2 border-t border-border">
          <button
            onClick={() => navigate("/admin/login")}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
