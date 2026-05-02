import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowLeft, Search, X, ChevronDown,
  Plus,
  User,
  ImageIcon,
  Send,
  Camera,
  Sprout,
  Factory,
  Truck,
  HardHat,
  UtensilsCrossed,
  Landmark,
  Cpu,
  GraduationCap,
  HeartPulse,
  Building2,
} from "lucide-react";
import { MEMBERS, FILTER_OPTIONS } from "@/data/members";
import { toast } from "sonner";
import ReportMenu from "@/components/ReportMenu";
import OwnerActionMenu from "@/components/OwnerActionMenu";
import { useReportStore, selectDeleted } from "@/data/reports";
import { useIsAuthorNameBlocked } from "@/hooks/useBlockedAuthors";
import { CURRENT_USER, resolveAuthorId } from "@/lib/currentUser";
import { EyeOff } from "lucide-react";

const INDUSTRIES = [
  { name: "농업/광업/수산업/목축업", icon: Sprout },
  { name: "제조업", icon: Factory },
  { name: "유통/물류/도소매업", icon: Truck },
  { name: "건설/건축/부동산업", icon: HardHat },
  { name: "숙박/음식점/서비스업", icon: UtensilsCrossed },
  { name: "금융/보험업", icon: Landmark },
  { name: "전기/정보통신", icon: Cpu },
  { name: "교육/연구개발업", icon: GraduationCap },
  { name: "예술/스포츠/보건/의료업", icon: HeartPulse },
  { name: "공무원/회사원/협회/단체", icon: Building2 },
];

interface CollabPost {
  id: string;
  industry: string;
  title: string;
  preview: string;
  body: string;
  author: string;
  date: string;
  hasThumbnail: boolean;
}

const INITIAL_COLLAB_POSTS: CollabPost[] = [
  // 농업/광업/수산업/목축업
  { id: "b-agri-1", industry: "농업/광업/수산업/목축업", title: "스마트팜 공동 운영 파트너 모집", preview: "충남 논산에 1,000평 규모 스마트팜을 신규 조성 중입니다. 작물 기획...", body: "충남 논산에 1,000평 규모 스마트팜을 신규 조성 중입니다.\n\n토마토·딸기 수경재배 라인을 운영하며, 유통·판매 채널 확보가 가능한 동문 기업과 공동 운영 모델을 협의하고자 합니다.\n\n- 시설 규모: 약 3,300㎡\n- 가동 시점: 2026년 7월\n- 협력 형태: 공동출자 또는 위탁판매\n\n샘플 시식 및 현장 견학 가능합니다.\n연락처: noh@greenfarm.co.kr", author: "노현석", date: "2026.04.28", hasThumbnail: true },
  { id: "b-agri-2", industry: "농업/광업/수산업/목축업", title: "친환경 유기농 농산물 직거래 협력", preview: "강원 평창에서 유기농 채소를 재배하고 있습니다. 동문 기업 구내식당...", body: "강원 평창에서 유기농 채소를 재배하고 있습니다.\n\n동문 기업 구내식당, 외식 프랜차이즈, 카페에 직거래로 공급하고자 합니다.\n\n- 주요 품목: 쌈채소, 토마토, 감자, 옥수수\n- 공급 단가: 도매 시세 대비 5~10% 할인\n- 배송: 수도권 익일 새벽배송\n\n샘플 박스 무료 발송 가능합니다.", author: "임지원", date: "2026.04.10", hasThumbnail: false },
  { id: "b-agri-3", industry: "농업/광업/수산업/목축업", title: "수산물 가공·HMR 합작 제안", preview: "부산 기장에서 자체 가공시설을 보유하고 있습니다. HMR(가정간편식)...", body: "부산 기장에서 자체 가공시설을 보유한 수산물 업체입니다.\n\nHMR(가정간편식) 신제품 라인을 함께 기획·유통할 동문 기업을 찾습니다.\n\n- 보유 설비: 급속냉동, 진공포장, 레토르트\n- 주요 어종: 고등어, 갈치, 꽃게, 새우\n- 협력 형태: ODM 또는 공동 브랜드\n\n시제품 시식 가능합니다.", author: "박해성", date: "2026.03.27", hasThumbnail: false },

  // 제조업
  { id: "b-manuf-1", industry: "제조업", title: "친환경 포장재 OEM 파트너 모집", preview: "생분해 PLA 소재 기반 식품 포장재를 양산 중입니다. 자체 브랜드를...", body: "생분해 PLA 소재 기반 식품 포장재를 양산 중입니다.\n\n자체 브랜드를 보유한 식품·외식 기업과 OEM 파트너십을 모색합니다.\n\n- 주요 제품: 친환경 컵/뚜껑, 일회용 용기, 비닐 대체 포장\n- 인증: FDA, EU 식품접촉인증 보유\n- MOQ: 5,000개부터 가능\n\n샘플 발송 가능합니다.", author: "임소정", date: "2026.04.25", hasThumbnail: true },
  { id: "b-manuf-2", industry: "제조업", title: "전기차 부품 2차 협력사 합작 제안", preview: "현대·기아 1차 협력사로서, 2차 벤더 풀을 확장하고 있습니다...", body: "현대·기아 1차 협력사로서, 2차 벤더 풀을 확장하고 있습니다.\n\n정밀 가공/사출/금형 분야 동문 기업과 장기 공급 계약 체결을 희망합니다.\n\n- 품목: 모터 하우징, 인버터 케이스, 커넥터 부품\n- 연간 물량: 부품당 50만~200만 개\n- 단가 협의 후 3년 단위 공급계약\n\n품질 인증(IATF 16949) 보유 기업 우선.", author: "조성호", date: "2026.04.05", hasThumbnail: false },
  { id: "b-manuf-3", industry: "제조업", title: "스마트팩토리 자동화 공동 도입", preview: "중소 제조사 5~10개사가 모여 공동 발주를 통해 자동화 비용을 절감...", body: "중소 제조사 5~10개사가 모여 공동 발주를 통해 자동화 비용을 절감하고자 합니다.\n\nMES, 협동로봇, 비전검사 시스템을 패키지로 도입하면 단가가 30% 이상 절감됩니다.\n\n현재 3개사 참여 확정, 추가 2~7개사 모집 중입니다.\n\n첫 미팅: 2026년 5월 셋째 주 (서울 강남)", author: "강수민", date: "2026.03.20", hasThumbnail: false },
  { id: "b-manuf-4", industry: "제조업", title: "반도체 후공정 검사 장비 공동개발", preview: "AI 비전 기반 반도체 패키지 검사 장비를 공동개발할 동문 기업...", body: "AI 비전 기반 반도체 패키지 검사 장비를 공동개발할 동문 기업을 찾습니다.\n\n당사는 AI 모델·소프트웨어를, 파트너사는 광학·기구설계 또는 양산 인프라를 담당하는 형태입니다.\n\n- 목표 시장: 반도체 패키징 후공정\n- 정부 R&D 연계 가능 (3년·15억 규모)\n- 지분 또는 라이선스 협의 가능", author: "윤하린", date: "2026.02.28", hasThumbnail: true },

  // 유통/물류/도소매업
  { id: "b-logi-1", industry: "유통/물류/도소매업", title: "수도권 라스트마일 배송 합작", preview: "수도권 라스트마일 배송 네트워크를 운영 중이며, 이커머스/D2C...", body: "수도권 라스트마일 배송 네트워크를 운영 중입니다.\n\n자체 배송 부담이 큰 이커머스/D2C 동문 기업에 통합 배송 솔루션을 제공합니다.\n\n- 일 처리량: 최대 5만 건\n- 새벽/당일 배송 옵션\n- 동문 기업 단가 15% 할인\n\nAPI 연동 지원합니다.", author: "정태훈", date: "2026.04.22", hasThumbnail: false },
  { id: "b-logi-2", industry: "유통/물류/도소매업", title: "동남아 수출입 통관·물류 파트너", preview: "베트남, 인도네시아, 태국에 자체 법인과 창고를 운영합니다...", body: "베트남, 인도네시아, 태국에 자체 법인과 창고를 운영합니다.\n\n동남아 진출을 준비 중인 동문 기업의 통관·창고·내륙운송을 원스톱으로 지원합니다.\n\n- 보유 창고: 호치민, 자카르타, 방콕\n- 콜드체인 가능\n- 동문 기업 첫 3개월 보관료 면제", author: "장유진", date: "2026.04.02", hasThumbnail: true },
  { id: "b-logi-3", industry: "유통/물류/도소매업", title: "프리미엄 식품 유통 채널 공동 운영", preview: "백화점, 대형 호텔, 고급 외식업체 채널을 보유하고 있습니다...", body: "백화점, 대형 호텔, 고급 외식업체 채널을 보유하고 있습니다.\n\n동문 기업의 프리미엄 식품·주류·디저트 등 신제품 입점을 지원합니다.\n\n- 거래처: 신세계, 갤러리아, 5성급 호텔 다수\n- 수수료: 마진 15~20%\n- 입점 컨설팅 무료 제공", author: "한지수", date: "2026.03.18", hasThumbnail: false },

  // 건설/건축/부동산업
  { id: "b2", industry: "건설/건축/부동산업", title: "강남 상업용 부동산 공동투자 제안", preview: "강남역 인근 상업용 부동산 공동투자 기회가 있어 동문 여러분께...", body: "강남역 인근 상업용 부동산 공동투자 기회가 있어 동문 여러분께 제안드립니다.\n\n위치: 강남역 도보 5분\n규모: 지상 6층 근린생활시설\n예상 수익률: 연 5~7%\n\n최소 투자금액: 1억원\n모집 인원: 5~10명\n\n관심 있으신 분은 개별 연락 부탁드립니다.", author: "박서연", date: "2026.03.18", hasThumbnail: true },
  { id: "b-cons-2", industry: "건설/건축/부동산업", title: "노후 상가 리모델링 시공 협력업체", preview: "수도권 노후 상가 리모델링 사업을 확대하고 있습니다. 인테리어...", body: "수도권 노후 상가 리모델링 사업을 확대하고 있습니다.\n\n인테리어, 설비, 전기, 사인물 분야 협력업체를 찾습니다.\n\n- 연간 시공 건수: 약 80건\n- 평균 공사비: 건당 1억~5억\n- 결제 조건: 기성 30일 / 잔금 검수 후 즉시\n\n보유 면허/실적 자료 제출 부탁드립니다.", author: "김도현", date: "2026.04.18", hasThumbnail: false },
  { id: "b-cons-3", industry: "건설/건축/부동산업", title: "지방거점 임대주택 공동 출자", preview: "대전·청주·천안 거점 도시의 직주근접 임대주택 사업에 LP로 참여...", body: "대전·청주·천안 거점 도시의 직주근접 임대주택 사업에 LP로 참여하실 동문을 모십니다.\n\n- 대상: 도시형 생활주택 3개 단지 (총 240세대)\n- 출자 단위: 5,000만원~\n- 예상 IRR: 8~10%\n- 운영 기간: 7년\n\n사업설명회: 2026년 5월 17일 (성균관대 국제관)", author: "박서연", date: "2026.03.30", hasThumbnail: true },
  { id: "b-cons-4", industry: "건설/건축/부동산업", title: "친환경 건축자재 공동 구매·유통", preview: "저탄소 콘크리트, 단열 자재 등을 다량 확보했습니다. 시공사 단체...", body: "저탄소 콘크리트, 단열 자재 등을 다량 확보했습니다.\n\n시공사 단체 공동구매 시 시장가 대비 12~18% 할인 가능합니다.\n\n- 자재: 저탄소 콘크리트, PF 단열재, LED 조명, 시스템 창호\n- 최소 발주: 10억 원 이상 단체 구매\n- 납기 보장 및 하자보수 지원", author: "송재훈", date: "2026.02.20", hasThumbnail: false },

  // 숙박/음식점/서비스업
  { id: "b-srv-1", industry: "숙박/음식점/서비스업", title: "강원·제주 리조트 객실 공동 운영", preview: "강원도 평창과 제주 서귀포 리조트 객실 일부를 동문 기업 워크숍...", body: "강원도 평창과 제주 서귀포 리조트 객실 일부를 동문 기업 워크숍·연수·휴양 용도로 공동 운영하고자 합니다.\n\n- 객실 수: 평창 40실, 제주 30실\n- 동문 단체 30% 할인\n- 컨퍼런스룸·식음료 패키지 제공\n\n2026년 하반기 계약 시 추가 혜택 협의 가능합니다.", author: "최보경", date: "2026.04.20", hasThumbnail: true },
  { id: "b-srv-2", industry: "숙박/음식점/서비스업", title: "동문 외식 프랜차이즈 가맹점주 모집", preview: "한식 다이닝 브랜드 'SKK다이닝'의 신규 가맹점주를 동문 한정으로...", body: "한식 다이닝 브랜드 'SKK다이닝'의 신규 가맹점주를 동문 한정으로 모집합니다.\n\n- 평균 매출: 월 6,000만 원\n- 가맹비/보증금: 동문 50% 할인\n- 운영 매뉴얼·식자재 공급·마케팅 패키지 일괄 지원\n\n2026년 하반기 5개 점포 오픈 예정 — 강남, 분당, 광교, 송도, 동탄.", author: "강하진", date: "2026.03.25", hasThumbnail: false },
  { id: "b-srv-3", industry: "숙박/음식점/서비스업", title: "지역 중소호텔 위탁 운영·마케팅", preview: "20~80실 규모 비즈니스 호텔의 OTA 채널 마케팅·운영을 위탁받습니다...", body: "20~80실 규모 비즈니스 호텔의 OTA 채널 마케팅·운영을 위탁받습니다.\n\n- 평균 RevPAR 25% 이상 개선 사례 다수\n- 야놀자, 여기어때, 부킹닷컴, 아고다 통합 운영\n- 동문 호텔 첫 3개월 수수료 면제\n\n현재 14개 호텔 위탁 운영 중입니다.", author: "민호석", date: "2026.03.05", hasThumbnail: false },
  { id: "b-srv-4", industry: "숙박/음식점/서비스업", title: "기업 행사 케이터링 협업 제안", preview: "임원 미팅, IR 행사, 기업 워크숍 케이터링을 전문으로 하는 업체...", body: "임원 미팅, IR 행사, 기업 워크숍 케이터링을 전문으로 하는 업체입니다.\n\n동문 기업 행사 시 메뉴 기획부터 현장 운영까지 일괄 지원합니다.\n\n- 인원: 30명~500명\n- 핑거푸드, 코스 디너, 한식·양식 모두 가능\n- 동문 기업 10% 할인", author: "윤서아", date: "2026.02.14", hasThumbnail: true },

  // 금융/보험업
  { id: "b-fin-1", industry: "금융/보험업", title: "동문 스타트업 투자 펀드 LP 모집", preview: "성균관대 동문 창업가가 운영하는 스타트업에 집중 투자하는 200억...", body: "성균관대 동문 창업가가 운영하는 스타트업에 집중 투자하는 200억 원 규모 벤처펀드를 결성합니다.\n\n- 투자 단계: 시드~시리즈 A\n- 결성 목표: 2026년 9월\n- LP 최소 출자: 5억 원\n- 운영사: (주)글로벌투자\n\n현재 3개사 출자 확약 완료, 추가 LP 모집 중입니다.", author: "조창식", date: "2026.04.27", hasThumbnail: true },
  { id: "b-fin-2", industry: "금융/보험업", title: "동문 기업 IPO 자문 패키지 안내", preview: "코스닥 상장 자문 경험 다수. 회계·법무·IR을 통합 패키지로...", body: "코스닥 상장 자문 경험 다수입니다.\n\n회계·법무·IR을 통합 패키지로 제공합니다.\n\n- 평균 상장 소요: 18~24개월\n- 동문 기업 자문료 20% 할인\n- 강태준회계법인·법무법인 정의 협업\n\n초기 진단 무료 상담 가능.", author: "최동우", date: "2026.04.08", hasThumbnail: false },
  { id: "b-fin-3", industry: "금융/보험업", title: "법인 단체보험·퇴직연금 일괄 컨설팅", preview: "법인 단체보험과 퇴직연금(DB/DC/IRP)을 통합 컨설팅합니다...", body: "법인 단체보험과 퇴직연금(DB/DC/IRP)을 통합 컨설팅합니다.\n\n- 평균 보험료 15% 절감 사례\n- 임직원 복리후생 설계 포함\n- 동문 기업 자문료 면제\n\n100인 이상 사업장 위주 진행합니다.", author: "송미래", date: "2026.03.12", hasThumbnail: false },
  { id: "b-fin-4", industry: "금융/보험업", title: "ESG 채권 인수단 참여 제안", preview: "동문 금융기관 컨소시엄으로 1,500억 원 규모 ESG 채권 인수단...", body: "동문 금융기관 컨소시엄으로 1,500억 원 규모 ESG 채권 인수단을 구성합니다.\n\n- 발행사: 친환경 인프라 기업\n- 인수 단위: 200억 원 이상\n- 발행일: 2026년 7월\n\n주관/공동주관/인수단 참여기관 모집 중입니다.", author: "강태준", date: "2026.02.22", hasThumbnail: false },

  // 전기/정보통신
  { id: "b1", industry: "전기/정보통신", title: "IT 시스템 구축 파트너 구합니다", preview: "중소기업 대상 ERP 시스템 구축 프로젝트를 진행 중입니다. 관심 있는 동문...", body: "중소기업 대상 ERP 시스템 구축 프로젝트를 진행 중입니다.\n\n현재 3개 기업과 계약이 완료된 상태이며, 프론트엔드 및 백엔드 개발 역량을 갖춘 파트너사를 찾고 있습니다.\n\n관심 있는 동문 기업은 연락 부탁드립니다.\n\n연락처: yoon@nextsoft.io", author: "윤하린", date: "2026.03.22", hasThumbnail: false },
  { id: "b-ict-2", industry: "전기/정보통신", title: "기업용 AI 챗봇 도입 협력사 모집", preview: "GPT 기반 기업 전용 챗봇 솔루션을 운영 중입니다. 도입 컨설팅...", body: "GPT 기반 기업 전용 챗봇 솔루션을 운영 중입니다.\n\n도입 컨설팅·구축·운영을 담당해줄 SI/컨설팅 파트너를 찾습니다.\n\n- 솔루션: 사내 지식관리·고객 응대·HR 챗봇\n- 도입 고객: 65개사 (2026년 4월 기준)\n- 동문 파트너 첫 3건 라이선스 50% 할인", author: "김영수", date: "2026.04.15", hasThumbnail: false },
  { id: "b-ict-3", industry: "전기/정보통신", title: "AWS 클라우드 마이그레이션 공동 사업", preview: "AWS Premier 파트너로서, 동문 기업의 클라우드 전환을 함께할...", body: "AWS Premier 파트너로서, 동문 기업의 클라우드 전환을 함께할 협력사를 찾습니다.\n\n- 공급 가능 서비스: Lift & Shift, Re-architect, FinOps\n- 동문 협력사 추천 시 매출의 5% 인센티브\n- 자체 마이그레이션 자동화 도구 제공\n\n실적 4년 연속 200%+ 성장.", author: "이세진", date: "2026.03.28", hasThumbnail: true },
  { id: "b-ict-4", industry: "전기/정보통신", title: "B2B SaaS 공동 마케팅 패키지", preview: "동문 SaaS 기업이 모여 공동 박람회 부스, 통합 광고, 크로스셀링...", body: "동문 SaaS 기업이 모여 공동 박람회 부스, 통합 광고, 크로스셀링 캠페인을 진행하고자 합니다.\n\n- 참여 비용: 기업당 분기 500만 원\n- 채널: SaaS 박람회, 네이버 검색광고, B2B 뉴스레터\n- 첫 분기 ROAS 평균 380%\n\n현재 6개사 참여 확정.", author: "황민정", date: "2026.02.18", hasThumbnail: false },

  // 교육/연구개발업
  { id: "b-edu-1", industry: "교육/연구개발업", title: "기업 임직원 직무교육 위탁", preview: "공공·민간 직무교육 100여 개 과정을 운영합니다. 기업 맞춤형...", body: "공공·민간 직무교육 100여 개 과정을 운영합니다.\n\n기업 맞춤형 커리큘럼 설계 및 위탁 운영이 가능합니다.\n\n- 분야: 리더십, AI/DX, 재무·회계, 영어·중국어\n- 평균 만족도: 4.7/5.0\n- 동문 기업 단가 15% 할인\n\nKDC, 고용노동부 환급과정 가능.", author: "오준혁", date: "2026.04.21", hasThumbnail: false },
  { id: "b-edu-2", industry: "교육/연구개발업", title: "산학협력 R&D 과제 공동 수행", preview: "성균관대 공과대학 연구실과 함께 산학 R&D 과제를 발굴·수주...", body: "성균관대 공과대학 연구실과 함께 산학 R&D 과제를 발굴·수주합니다.\n\n- 적용 분야: 반도체, 바이오, 에너지, AI\n- 정부 매칭펀드 활용 (기업부담금 25~30%)\n- IP 공동출원 가능\n\n현재 진행 중인 매칭 후보 8건 보유.", author: "정현우", date: "2026.04.03", hasThumbnail: false },
  { id: "b-edu-3", industry: "교육/연구개발업", title: "해외 유학·교환학생 프로그램 협력", preview: "북미·유럽·동남아 30여 개 대학과 MOU를 체결한 교육 컨설팅사...", body: "북미·유럽·동남아 30여 개 대학과 MOU를 체결한 교육 컨설팅사입니다.\n\n동문 기업 임직원 자녀 유학, 단기 어학연수 패키지를 협력 운영하고자 합니다.\n\n- 패키지: 어학연수·여름캠프·정규유학\n- 동문 가족 5~10% 할인\n- 비자·홈스테이 일괄 지원", author: "신예린", date: "2026.03.10", hasThumbnail: true },
  { id: "b-edu-4", industry: "교육/연구개발업", title: "EduTech 스타트업 합작 투자", preview: "AI 학습 분석 기반 EduTech 스타트업과 공동 사업 또는 투자...", body: "AI 학습 분석 기반 EduTech 스타트업과 공동 사업 또는 투자에 관심 있는 동문 기업을 찾습니다.\n\n- 자체 솔루션: 초·중·고 맞춤형 학습 추천\n- 누적 가입자: 28만 명\n- 시리즈 A 라운드 진행 중 (2026년 6월 마감)\n\nIR 자료 별도 제공.", author: "장재훈", date: "2026.02.25", hasThumbnail: false },

  // 예술/스포츠/보건/의료업
  { id: "b4", industry: "예술/스포츠/보건/의료업", title: "의료기기 유통 사업 파트너십", preview: "의료기기 해외 유통 관련 사업 파트너를 찾고 있습니다...", body: "의료기기 해외 유통 관련 사업 파트너를 찾고 있습니다.\n\n당사는 국내 의료기기 제조사와 해외 바이어를 연결하는 유통 사업을 진행 중입니다.\n\n필요 역량:\n- 해외 영업 네트워크 보유\n- 의료기기 인허가 경험\n- 물류/통관 전문 지식\n\n관심 있는 동문은 연락 바랍니다.\nhan@skkhospital.co.kr", author: "한상철", date: "2026.03.10", hasThumbnail: true },
  { id: "b-med-2", industry: "예술/스포츠/보건/의료업", title: "동문 기업 단체 건강검진 협약", preview: "성균병원 종합검진센터에서 동문 기업 단체 건강검진을 특별 단가...", body: "성균병원 종합검진센터에서 동문 기업 단체 건강검진을 특별 단가로 제공합니다.\n\n- 기본 패키지: 1인 35만 원 → 28만 원\n- 정밀 패키지: 90만 원 → 72만 원\n- 50인 이상 단체 시 추가 5% 할인\n- 검진 후 임직원 건강관리 리포트 제공", author: "한상철", date: "2026.04.12", hasThumbnail: false },
  { id: "b-med-3", industry: "예술/스포츠/보건/의료업", title: "프로 스포츠팀 스폰서십 패키지", preview: "프로농구 구단 메인 스폰서 패키지를 동문 기업 한정으로 제안...", body: "프로농구 구단 메인 스폰서 패키지를 동문 기업 한정으로 제안합니다.\n\n- 유니폼/체육관 광고\n- 시즌권 50매 제공\n- 미디어 노출 (지상파 중계 평균 18회/시즌)\n- 동문 기업 패키지가 시장가 대비 30% 할인\n\n2026~2027 시즌 한정.", author: "이도윤", date: "2026.03.16", hasThumbnail: true },
  { id: "b-med-4", industry: "예술/스포츠/보건/의료업", title: "공연·전시 기업 마케팅 협업", preview: "예술의전당, 세종문화회관에서 공연·전시를 기획하는 기획사...", body: "예술의전당, 세종문화회관에서 공연·전시를 기획하는 기획사입니다.\n\n동문 기업 임직원 대상 공연 단체 관람·기업 후원 패키지를 협업하고자 합니다.\n\n- 기업 단체 30% 할인\n- 후원 기업 로고 노출 (포스터·프로그램북)\n- 임직원 가족 초청 행사 가능", author: "서지유", date: "2026.02.10", hasThumbnail: false },

  // 공무원/회사원/협회/단체
  { id: "b3", industry: "공무원/회사원/협회/단체", title: "마케팅 컨설팅 상호 협력 제안", preview: "마케팅연구회 활동을 기반으로 동문 기업 대상 마케팅 컨설팅...", body: "마케팅연구회 활동을 기반으로 동문 기업 대상 마케팅 컨설팅 서비스를 제공하고자 합니다.\n\n주요 서비스:\n- 브랜드 전략 수립\n- 디지털 마케팅 기획\n- SNS 마케팅 운영 대행\n\n동문 기업 특별 할인 적용됩니다.\n문의: kim@sktech.co.kr", author: "김영수", date: "2026.03.14", hasThumbnail: false },
  { id: "b-pub-2", industry: "공무원/회사원/협회/단체", title: "공공조달 입찰 컨소시엄 참여 제안", preview: "조달청·공공기관 입찰에 동문 기업 컨소시엄으로 참여하실 분을...", body: "조달청·공공기관 입찰에 동문 기업 컨소시엄으로 참여하실 분을 모십니다.\n\n- 분야: SI, 컨설팅, 시설관리, 물품 공급\n- 입찰 가점: 동반성장·여성기업·사회적기업 가점 활용\n- 매월 1회 입찰 정보 공유 미팅 진행\n\n현재 12개사 참여 중입니다.", author: "이정민", date: "2026.04.18", hasThumbnail: false },
  { id: "b-pub-3", industry: "공무원/회사원/협회/단체", title: "협회·단체 회원사 복리후생 제휴", preview: "10만 명 규모 직능단체 회원사 대상 복리후생 제휴사를 모집합니다...", body: "10만 명 규모 직능단체 회원사 대상 복리후생 제휴사를 모집합니다.\n\n- 제휴 분야: 호텔·외식·헬스장·교육·의료\n- 제공 채널: 모바일 앱·뉴스레터·정기 박람회\n- 입점 수수료 무료, 매출 기반 수수료만 부과", author: "정미영", date: "2026.03.31", hasThumbnail: true },
  { id: "b-pub-4", industry: "공무원/회사원/협회/단체", title: "정책연구 용역 공동 수주", preview: "지자체·공공기관 정책연구 용역을 동문 연구자·컨설팅사가 공동...", body: "지자체·공공기관 정책연구 용역을 동문 연구자·컨설팅사가 공동 수주하는 풀(pool)을 운영합니다.\n\n- 평균 용역 규모: 5,000만 원~3억 원\n- 분야: 도시계획, 사회복지, 산업진흥, 평생학습\n- 동문 풀 가입비 없음\n\n2026년 4분기 사업 다수 예고.", author: "정미영", date: "2026.02.28", hasThumbnail: false },
];

type IndustryFilterKey = "generation" | "position" | "department" | "region";
type SubTab = "collab" | "members";

const INDUSTRY_FILTER_LABELS: Record<IndustryFilterKey, string> = {
  generation: "기수",
  position: "직급",
  department: "학과",
  region: "지역",
};

const CollabPostRow = ({
  post,
  onSelect,
}: {
  post: CollabPost;
  onSelect: () => void;
}) => {
  const blocked = useIsAuthorNameBlocked(post.author);
  const authorId = resolveAuthorId(post.author);

  if (blocked) {
    return (
      <div className="bg-muted/30 border border-border rounded-xl p-4 flex items-center gap-2 text-sm text-muted-foreground">
        <EyeOff className="w-4 h-4 shrink-0" />
        차단한 사용자의 게시물입니다
      </div>
    );
  }

  return (
    <div className="relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-primary/30 transition-all">
      <button
        type="button"
        onClick={onSelect}
        className="w-full text-left"
      >
        <div className="flex">
          {post.hasThumbnail && (
            <div className="w-24 h-24 md:w-32 md:h-28 bg-muted flex items-center justify-center shrink-0">
              <Camera className="w-8 h-8 text-muted-foreground/40" />
            </div>
          )}
          <div className="flex-1 p-4 min-w-0 pr-10">
            <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-1">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.preview}</p>
            <p className="text-xs text-muted-foreground/70 mt-2">
              {post.author} · {post.date}
            </p>
          </div>
        </div>
      </button>
      <div className="absolute top-2 right-2">
        {authorId === CURRENT_USER.id ? (
          <OwnerActionMenu
            targetKind="businessPost"
            targetId={post.id}
            triggerSize="sm"
          />
        ) : (
          <ReportMenu
            targetKind="businessPost"
            targetId={post.id}
            targetSnapshot={{ title: post.title, content: post.body, authorName: post.author }}
            reportedAuthorMemberId={authorId}
            triggerSize="sm"
          />
        )}
      </div>
    </div>
  );
};

const BusinessPage = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [subTab, setSubTab] = useState<SubTab>("collab");
  const [collabPosts, setCollabPosts] = useState<CollabPost[]>(INITIAL_COLLAB_POSTS);
  const [selectedPost, setSelectedPost] = useState<CollabPost | null>(null);
  const deleted = useReportStore(selectDeleted);
  const [showWriteDialog, setShowWriteDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // Industry member filters
  const [indSearch, setIndSearch] = useState("");
  const [indSort, setIndSort] = useState<"name" | "year">("name");
  const [indFilters, setIndFilters] = useState<Record<IndustryFilterKey, string[]>>({
    generation: [], position: [], department: [], region: [],
  });

  const hasIndFilters = Object.values(indFilters).some((v) => v.length > 0);

  const toggleIndFilter = (key: IndustryFilterKey, value: string) => {
    setIndFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
    }));
  };

  const removeIndFilter = (key: IndustryFilterKey, value: string) => {
    setIndFilters((prev) => ({ ...prev, [key]: prev[key].filter((v) => v !== value) }));
  };

  const clearIndFilters = () => {
    setIndFilters({ generation: [], position: [], department: [], region: [] });
    setIndSearch("");
  };

  const getIndFilterOptions = (key: IndustryFilterKey): string[] => {
    if (key === "generation") return FILTER_OPTIONS.generationValues;
    return FILTER_OPTIONS[key];
  };

  const getIndFilterLabel = (key: IndustryFilterKey, value: string): string => {
    if (key === "generation") {
      const idx = FILTER_OPTIONS.generationValues.indexOf(value);
      return idx >= 0 ? FILTER_OPTIONS.generation[idx] : value;
    }
    return value;
  };

  const enterIndustry = (name: string) => {
    setSelectedIndustry(name);
    setSubTab("collab");
    clearIndFilters();
  };

  const exitIndustry = () => {
    setSelectedIndustry(null);
    setSelectedPost(null);
    clearIndFilters();
  };

  const industryPosts = useMemo(() => {
    if (!selectedIndustry) return [];
    return collabPosts.filter(
      (p) =>
        p.industry === selectedIndustry &&
        !deleted.some((d) => d.targetKind === "businessPost" && d.targetId === p.id),
    );
  }, [collabPosts, deleted, selectedIndustry]);

  const industryMembers = useMemo(() => {
    if (!selectedIndustry) return [];
    let result = MEMBERS.filter((m) => {
      if (m.industry !== selectedIndustry) return false;
      const q = indSearch.trim().toLowerCase();
      if (q && !m.name.includes(q) && !m.department.toLowerCase().includes(q) && !String(m.admissionYear).includes(q)) return false;
      if (indFilters.generation.length && !indFilters.generation.includes(m.generation)) return false;
      if (indFilters.position.length && !indFilters.position.includes(m.position)) return false;
      if (indFilters.department.length && !indFilters.department.includes(m.department)) return false;
      if (indFilters.region.length && !indFilters.region.includes(m.region)) return false;
      return true;
    });
    result.sort((a, b) => indSort === "name" ? a.name.localeCompare(b.name, "ko") : a.admissionYear - b.admissionYear);
    return result;
  }, [selectedIndustry, indSearch, indFilters, indSort]);

  const handleSubmitPost = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      toast.error("제목과 내용을 모두 입력해주세요");
      return;
    }
    if (!selectedIndustry) return;
    const newPost: CollabPost = {
      id: `new-${Date.now()}`,
      industry: selectedIndustry,
      title: newTitle,
      preview: newContent.slice(0, 50) + "...",
      body: newContent,
      author: "홍길동",
      date: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
      hasThumbnail: false,
    };
    setCollabPosts([newPost, ...collabPosts]);
    setNewTitle("");
    setNewContent("");
    setShowWriteDialog(false);
    toast.success("게시글이 등록되었습니다");
  };

  // Post detail view
  if (selectedPost) {
    const currentIdx = industryPosts.findIndex((p) => p.id === selectedPost.id);
    const prevPost = currentIdx >= 0 && currentIdx < industryPosts.length - 1 ? industryPosts[currentIdx + 1] : null;
    const nextPost = currentIdx > 0 ? industryPosts[currentIdx - 1] : null;
    const detailAuthorId = resolveAuthorId(selectedPost.author);

    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <button
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          협업 제안
        </button>
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">{selectedPost.title}</h1>
            <p className="text-sm text-muted-foreground mt-2">{selectedPost.author} · {selectedPost.date}</p>
          </div>
          {detailAuthorId === CURRENT_USER.id ? (
            <OwnerActionMenu
              targetKind="businessPost"
              targetId={selectedPost.id}
              onDeleted={() => setSelectedPost(null)}
            />
          ) : (
            <ReportMenu
              targetKind="businessPost"
              targetId={selectedPost.id}
              targetSnapshot={{ title: selectedPost.title, content: selectedPost.body, authorName: selectedPost.author }}
              reportedAuthorMemberId={detailAuthorId}
            />
          )}
        </div>
        <hr className="border-border" />
        <div className="text-foreground text-sm md:text-base leading-relaxed whitespace-pre-line">
          {selectedPost.body}
        </div>
        {selectedPost.hasThumbnail && (
          <div className="bg-muted rounded-xl h-48 md:h-64 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm">첨부 이미지</p>
            </div>
          </div>
        )}
        <hr className="border-border" />
        <div className="space-y-2">
          {prevPost && (
            <button onClick={() => setSelectedPost(prevPost)} className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-left">
              <ArrowLeft className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">이전글</p>
                <p className="text-sm text-foreground truncate">{prevPost.title}</p>
              </div>
            </button>
          )}
          {nextPost && (
            <button onClick={() => setSelectedPost(nextPost)} className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-left">
              <ArrowLeft className="w-4 h-4 text-muted-foreground shrink-0 rotate-180" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">다음글</p>
                <p className="text-sm text-foreground truncate">{nextPost.title}</p>
              </div>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Industry list (entry)
  if (!selectedIndustry) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {INDUSTRIES.map(({ name, icon: Icon }) => {
            const memberCount = MEMBERS.filter((m) => m.industry === name).length;
            return (
              <button
                key={name}
                onClick={() => enterIndustry(name)}
                className="bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground leading-tight">{name}</p>
                <p className="text-xs text-muted-foreground mt-1">{memberCount}명</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Industry detail with sub-tabs
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      <button
        onClick={exitIndustry}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        업종 목록
      </button>
      <h2 className="text-lg font-semibold text-foreground">{selectedIndustry}</h2>

      <Tabs value={subTab} onValueChange={(v) => setSubTab(v as SubTab)}>
        <TabsList className="w-full">
          <TabsTrigger value="collab" className="flex-1">협업 제안하기</TabsTrigger>
          <TabsTrigger value="members" className="flex-1">업종별 회원보기</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Collab sub-tab */}
      {subTab === "collab" && (
        <div className="space-y-3 relative">
          {industryPosts.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              아직 등록된 협업 제안이 없습니다
            </p>
          ) : (
            industryPosts.map((post) => (
              <CollabPostRow key={post.id} post={post} onSelect={() => setSelectedPost(post)} />
            ))
          )}

          <button
            onClick={() => setShowWriteDialog(true)}
            className="fixed bottom-24 md:bottom-8 right-4 md:right-8 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors z-20"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Members sub-tab */}
      {subTab === "members" && (
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="이름, 학과, 학번으로 검색"
              value={indSearch}
              onChange={(e) => setIndSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Filters + Sort */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(INDUSTRY_FILTER_LABELS) as IndustryFilterKey[]).map((key) => (
                <DropdownMenu key={key}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        indFilters[key].length > 0
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-muted-foreground border-border hover:border-foreground/30"
                      }`}
                    >
                      {INDUSTRY_FILTER_LABELS[key]}
                      {indFilters[key].length > 0 && (
                        <span className="ml-0.5 bg-primary-foreground/20 rounded-full px-1.5 text-xs">
                          {indFilters[key].length}
                        </span>
                      )}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-60 overflow-y-auto">
                    {getIndFilterOptions(key).map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => toggleIndFilter(key, option)}
                        className={indFilters[key].includes(option) ? "bg-accent font-semibold" : ""}
                      >
                        {getIndFilterLabel(key, option)}
                        {indFilters[key].includes(option) && <span className="ml-auto text-primary">✓</span>}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </div>
            <Select value={indSort} onValueChange={(v) => setIndSort(v as "name" | "year")}>
              <SelectTrigger className="w-28 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">이름순</SelectItem>
                <SelectItem value="year">학번순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active filter tags */}
          {hasIndFilters && (
            <div className="flex flex-wrap items-center gap-1.5">
              {(Object.keys(indFilters) as IndustryFilterKey[]).flatMap((key) =>
                indFilters[key].map((value) => (
                  <Badge key={`${key}-${value}`} variant="secondary" className="gap-1 pr-1">
                    {getIndFilterLabel(key, value)}
                    <button onClick={() => removeIndFilter(key, value)} className="hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))
              )}
              <button onClick={clearIndFilters} className="text-xs text-primary hover:underline ml-1">초기화</button>
            </div>
          )}

          {/* Results */}
          {industryMembers.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              {indSearch || hasIndFilters ? "검색 결과가 없습니다" : "등록된 회원이 없습니다"}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {industryMembers.map((member) => (
                <button
                  key={member.id}
                  onClick={() => navigate(`/main/members/${member.id}`)}
                  className="w-full text-left bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <User className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-foreground">{member.name}</span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">{member.position}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{member.department} · {member.admissionYear}학번</p>
                      <p className="text-sm text-muted-foreground truncate">{member.company} · {member.jobTitle}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Write dialog */}
      <Dialog open={showWriteDialog} onOpenChange={setShowWriteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>협업 제안 글쓰기</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground">
              업종: <span className="text-foreground font-medium">{selectedIndustry}</span>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">제목 *</label>
              <Input placeholder="제목을 입력하세요" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">내용 *</label>
              <Textarea placeholder="내용을 입력하세요" value={newContent} onChange={(e) => setNewContent(e.target.value)} rows={6} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">사진 첨부</label>
              <Button variant="outline" size="sm" onClick={() => toast.info("프로토타입에서는 사진 첨부가 지원되지 않습니다")}>
                <ImageIcon className="w-4 h-4 mr-1" />
                사진 선택
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWriteDialog(false)}>취소</Button>
            <Button onClick={handleSubmitPost}>
              <Send className="w-4 h-4 mr-1" />
              등록
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessPage;
