import { Heart, Car, Stethoscope, BookOpen, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const benefits = [
  {
    icon: Heart,
    title: "강북삼성병원 건강검진/비급여진료비 할인",
    subtitle: "경조사 서비스",
    url: "https://alumni.skku.edu/alumni/Benefit/congrat.do",
    ready: true,
  },
  {
    icon: Car,
    title: "무료주차 신청",
    subtitle: "주차권 서비스",
    url: "https://alumni.skku.edu/alumni/Benefit/parking.do",
    ready: true,
  },
  {
    icon: Stethoscope,
    title: "강북삼성병원 건강검진 할인",
    subtitle: "의료 혜택",
    url: "https://alumni.skku.edu/alumni/Benefit/medical.do",
    ready: true,
  },
  {
    icon: BookOpen,
    title: "총동창회보 수령 신청",
    subtitle: "동창회보 정기 수령",
    url: "#",
    ready: false,
  },
];

const BenefitsPage = () => {
  const handleClick = (benefit: typeof benefits[0]) => {
    if (!benefit.ready) {
      toast.info("준비 중입니다");
      return;
    }
    window.open(benefit.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      <h2 className="text-xl font-bold text-foreground mb-2">회비 납부자 혜택</h2>
      <p className="text-sm text-muted-foreground mb-6">
        임원 기여금 납부자에게 제공되는 혜택입니다
      </p>

      <div className="space-y-3">
        {benefits.map((b) => (
          <button
            key={b.title}
            onClick={() => handleClick(b)}
            className="w-full flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-all text-left"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <b.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">{b.title}</p>
                {!b.ready && (
                  <Badge variant="secondary" className="text-[10px] shrink-0">확인 중</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{b.subtitle}</p>
            </div>
            {b.ready && <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BenefitsPage;
