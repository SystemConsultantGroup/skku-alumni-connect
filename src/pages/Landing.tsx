import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import skkuLogo from "@/assets/skku-alumni-logo.svg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm text-center animate-fade-in">
        <div className="mb-12">
          <img
            src={skkuLogo}
            alt="성균관대학교 총동창회"
            className="h-16 mx-auto mb-6 object-contain"
          />
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
            임원수첩
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => navigate("/login")}
            className="w-full h-12 text-base font-semibold rounded-lg"
          >
            로그인
          </Button>
          <Button
            onClick={() => navigate("/register/verify")}
            variant="outline"
            className="w-full h-12 text-base font-semibold rounded-lg border-primary text-primary hover:bg-primary/5"
          >
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
