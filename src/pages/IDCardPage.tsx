import { useState } from "react";
import { User } from "lucide-react";
import skkuLogo from "@/assets/logo-2.png";

const mockData = {
  name: "홍길동",
  dept: "경영학과",
  year: "86",
  position: "부회장",
};

const IDCardPage = () => {
  const [isHorizontal, setIsHorizontal] = useState(true);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      <h2 className="text-xl font-bold text-foreground mb-6">디지털 신분증</h2>

      {/* Toggle */}
      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => setIsHorizontal(true)}
          className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
            isHorizontal ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          가로형
        </button>
        <button
          onClick={() => setIsHorizontal(false)}
          className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
            !isHorizontal ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          세로형
        </button>
      </div>

      {/* Card */}
      <div className="flex justify-center">
        {isHorizontal ? (
          /* Horizontal card */
          <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-primary px-5 py-3 flex items-center justify-between">
              <img src={skkuLogo} alt="SKKU" className="h-6 brightness-0 invert object-contain" />
              <span className="text-primary-foreground text-xs font-medium">EXECUTIVE ID</span>
            </div>
            <div className="p-5 flex gap-5">
              <div className="w-20 h-24 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-foreground">{mockData.name}</p>
                <p className="text-sm text-primary font-semibold mt-0.5">{mockData.position}</p>
                <p className="text-xs text-muted-foreground mt-1">{mockData.dept} / {mockData.year}학번</p>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    (03081) 서울시 종로구 율곡로 171, 204호(원남동, 글로벌센터)
                  </p>
                  <p className="text-[10px] text-primary mt-0.5">alumni.skku.edu</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Vertical card */
          <div className="w-72 bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-primary px-5 py-4 text-center">
              <img src={skkuLogo} alt="SKKU" className="h-6 brightness-0 invert mx-auto object-contain" />
              <p className="text-primary-foreground text-[10px] mt-1.5 font-medium">
                SUNGKYUNKWAN UNIVERSITY ALUMNI ASSOCIATION
              </p>
            </div>
            <div className="p-6 text-center">
              <div className="w-24 h-28 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-primary" />
              </div>
              <p className="text-xl font-bold text-foreground">{mockData.name}</p>
              <p className="text-sm text-primary font-semibold mt-1">{mockData.position}</p>
              <p className="text-xs text-muted-foreground mt-1">{mockData.dept} / {mockData.year}학번</p>
              <div className="mt-4 pt-4 border-t border-border text-left">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  (03081) 서울시 종로구 율곡로 171, 204호(원남동, 글로벌센터)
                </p>
                <p className="text-[10px] text-primary mt-1">https://alumni.skku.edu</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-8">
        화면을 보여주시면 신분증으로 활용할 수 있습니다
      </p>
    </div>
  );
};

export default IDCardPage;
