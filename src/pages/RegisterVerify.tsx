import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/PageHeader";
import StepIndicator from "@/components/StepIndicator";
import { AlertTriangle } from "lucide-react";
import { MEMBERS } from "@/data/members";

const departments = [
  "경영학과", "컴퓨터공학과", "법학과", "건축학과", "경제학과",
  "행정학과", "의학과", "전자공학과", "화학공학과", "IMBA",
];
const years = Array.from({ length: 51 }, (_, i) => String(1960 + i));

const positionFees: Record<string, string> = {
  부회장: "100만원",
  감사: "100만원",
  자문위원: "30만원",
  상임이사: "30만원",
  이사: "10만원",
};

const STEPS = ["임원 등록 확인", "납부확인", "계정설정"];

type FormState = {
  name: string;
  dept: string;
  year: string;
  phone: string;
  email: string;
  position: string;
};

const EMPTY_FORM: FormState = {
  name: "", dept: "", year: "", phone: "", email: "", position: "",
};

const SUCCESS_SAMPLE: FormState = {
  name: "조창식", dept: "IMBA", year: "2007", phone: "010-1234-5678",
  email: "", position: "",
};

const FAIL_SAMPLE: FormState = {
  name: "홍길동", dept: "경영학과", year: "2000", phone: "010-9999-9999",
  email: "test@example.com", position: "이사",
};

const RegisterVerify = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [matchFailed, setMatchFailed] = useState(false);

  const validateBasic = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "성명을 입력해주세요";
    if (!form.dept) e.dept = "학과를 선택해주세요";
    if (!form.year) e.year = "학번을 선택해주세요";
    if (!form.phone.trim()) e.phone = "연락처를 입력해주세요";
    else if (!/^010-\d{4}-\d{4}$/.test(form.phone)) e.phone = "010-0000-0000 형식으로 입력해주세요";
    return e;
  };

  const validateExtended = () => {
    const e = validateBasic();
    if (!form.email.trim()) e.email = "이메일을 입력해주세요";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "올바른 이메일 형식이 아닙니다";
    if (!form.position) e.position = "희망 직급을 선택해주세요";
    return e;
  };

  const handleVerify = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validateBasic();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const matched = MEMBERS.some(
      (m) =>
        m.name === form.name.trim() &&
        m.department === form.dept &&
        String(m.admissionYear) === form.year,
    );

    if (matched) {
      setMatchFailed(false);
      navigate("/register/payment-check");
    } else {
      setMatchFailed(true);
    }
  };

  const handleApplyNew = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validateExtended();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    navigate("/register/new-apply/complete", { state: form });
  };

  const fillSuccess = () => {
    setForm(SUCCESS_SAMPLE);
    setErrors({});
    setMatchFailed(false);
  };

  const fillFail = () => {
    setForm(FAIL_SAMPLE);
    setErrors({});
    setMatchFailed(false);
  };

  return (
    <div className="page-container animate-fade-in">
      <PageHeader title="임원 등록 확인" />

      {/* TODO: 프로토타입 검수 후 제거 */}
      <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-900">
        <p className="text-xs font-semibold mb-2">🧪 프로토타입 테스트 — 클릭하여 자동 입력</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={fillSuccess}
            className="flex-1 rounded-md border border-amber-400 bg-white px-3 py-1.5 text-xs font-medium hover:bg-amber-100 transition-colors"
          >
            매칭 성공 데이터
          </button>
          <button
            type="button"
            onClick={fillFail}
            className="flex-1 rounded-md border border-amber-400 bg-white px-3 py-1.5 text-xs font-medium hover:bg-amber-100 transition-colors"
          >
            매칭 실패 데이터
          </button>
        </div>
      </div>

      <StepIndicator steps={STEPS} currentStep={1} />

      <p className="text-muted-foreground mb-6">
        총동창회에 등록된 정보로 본인을 확인합니다
      </p>

      <form onSubmit={matchFailed ? handleApplyNew : handleVerify} className="space-y-4">
        <div>
          <Label>성명</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="이름을 입력하세요"
            className="mt-1.5"
          />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label>학과/학부</Label>
          <Select value={form.dept} onValueChange={(v) => setForm({ ...form, dept: v })}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="학과를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.dept && <p className="text-destructive text-xs mt-1">{errors.dept}</p>}
        </div>

        <div>
          <Label>학번/입학년도</Label>
          <Select value={form.year} onValueChange={(v) => setForm({ ...form, year: v })}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="학번을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.year && <p className="text-destructive text-xs mt-1">{errors.year}</p>}
        </div>

        <div>
          <Label>연락처</Label>
          <Input
            value={form.phone}
            onChange={(e) => {
              let value = e.target.value.replace(/[^0-9]/g, '');

              if (value.length > 3 && value.length <= 7) {
                value = value.replace(/^(\d{3})(\d+)/, '$1-$2');
              } else if (value.length > 7) {
                if (value.length > 11) {
                  value = value.slice(0, 11);
                }
                value = value.replace(/^(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
              }

              setForm({ ...form, phone: value });
            }}
            placeholder="010-0000-0000"
            className="mt-1.5"
          />
          {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
        </div>

        {matchFailed && (
          <>
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-destructive mb-1">매칭 실패</p>
                <p className="text-muted-foreground leading-relaxed">
                  입력하신 정보와 일치하는 임원 정보가 없습니다.
                  <br />신규 임원으로 신청하시려면 아래 정보를 추가 입력해주세요.
                </p>
              </div>
            </div>

            <div>
              <Label>이메일</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@example.com"
                className="mt-1.5"
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label>희망 직급</Label>
              <Select value={form.position} onValueChange={(v) => setForm({ ...form, position: v })}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="직급을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(positionFees).map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.position && <p className="text-destructive text-xs mt-1">{errors.position}</p>}
              {form.position && (
                <p className="text-sm text-primary font-medium mt-1.5">
                  기여금: {positionFees[form.position]}
                </p>
              )}
            </div>
          </>
        )}

        {matchFailed ? (
          <div className="space-y-3">
            <Button type="submit" className="w-full" size="lg">
              신규 임원 신청하기
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              size="lg"
              onClick={() => {
                setMatchFailed(false);
                setErrors({});
              }}
            >
              다시 입력하기
            </Button>
            <p className="text-xs text-muted-foreground leading-relaxed text-center pt-2">
              정보가 정확한데도 매칭이 안 되는 경우,
              <br />총동창회 사무처(
              <a href="tel:02-760-1290" className="text-primary underline">02-760-1290</a>
              )로 문의해 주세요.
            </p>
          </div>
        ) : (
          <Button type="submit" className="w-full" size="lg">
            확인
          </Button>
        )}
      </form>
    </div>
  );
};

export default RegisterVerify;
