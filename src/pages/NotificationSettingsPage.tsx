import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Megaphone, Newspaper, Users, Briefcase, LucideIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type ChannelKey = "notice" | "news" | "community" | "business";

type Channel = {
  key: ChannelKey;
  label: string;
  description: string;
  icon: LucideIcon;
};

const CHANNELS: Channel[] = [
  {
    key: "notice",
    label: "공지사항",
    description: "총동창회 공지 및 안내",
    icon: Megaphone,
  },
  {
    key: "news",
    label: "뉴스",
    description: "동문 소식 및 새 기사",
    icon: Newspaper,
  },
  {
    key: "community",
    label: "커뮤니티",
    description: "클럽 · 연구회 새 게시물",
    icon: Users,
  },
  {
    key: "business",
    label: "비즈니스",
    description: "협업 제안 및 비즈니스 게시물",
    icon: Briefcase,
  },
];

const NotificationSettingsPage = () => {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState<Record<ChannelKey, boolean>>({
    notice: true,
    news: true,
    community: true,
    business: true,
  });

  const toggle = (key: ChannelKey) => {
    setEnabled((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        뒤로
      </button>

      <div>
        <h1 className="text-xl font-bold text-foreground">알림설정</h1>
        <p className="text-sm text-muted-foreground mt-1">
          채널별로 알림 수신 여부를 설정할 수 있습니다.
        </p>
      </div>

      <section>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          채널별 알림
        </h3>
        <div className="space-y-2">
          {CHANNELS.map(({ key, label, description, icon: Icon }) => (
            <label
              key={key}
              htmlFor={`notif-${key}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
              </div>
              <Switch
                id={`notif-${key}`}
                checked={enabled[key]}
                onCheckedChange={() => toggle(key)}
              />
            </label>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NotificationSettingsPage;
