export interface Member {
  id: string;
  name: string;
  department: string;
  admissionYear: number;
  position: string;
  generation: string;
  company: string;
  jobTitle: string;
  industry: string;
  region: string;
  phone: string;
  email: string;
  address: string;
  hobby: string;
  website: string;
  prText: string;
  profileImage?: string;
}

export const MEMBERS: Member[] = [
  { id: "1", name: "조창식", department: "IMBA", admissionYear: 2007, position: "부회장", generation: "제40대", company: "(주)글로벌투자", jobTitle: "대표이사", industry: "금융/보험업", region: "서울", phone: "010-1234-5678", email: "cho@globalinvest.co.kr", address: "서울시 강남구 테헤란로 123", hobby: "골프, 독서", website: "https://globalinvest.co.kr", prText: "글로벌 투자 전문기업으로 해외 부동산 및 금융상품 투자를 선도합니다." },
  { id: "2", name: "김영수", department: "경영학과", admissionYear: 1986, position: "상임이사", generation: "제40대", company: "성균테크", jobTitle: "대표이사", industry: "전기/정보통신", region: "서울", phone: "010-2345-6789", email: "kim@sktech.co.kr", address: "서울시 종로구 율곡로 25", hobby: "등산, 바둑", website: "", prText: "IT 솔루션 및 컨설팅 전문 기업입니다." },
  { id: "3", name: "이정민", department: "법학과", admissionYear: 1982, position: "부회장", generation: "제40대", company: "법무법인 정의", jobTitle: "대표변호사", industry: "공무원/회사원/협회/단체", region: "서울", phone: "010-3456-7890", email: "lee@justice-law.co.kr", address: "서울시 서초구 서초대로 200", hobby: "와인, 클래식음악", website: "https://justice-law.co.kr", prText: "30년 전통의 종합 법률서비스를 제공합니다." },
  { id: "4", name: "박서연", department: "건축학과", admissionYear: 1990, position: "이사", generation: "제40대", company: "한빛건설", jobTitle: "전무이사", industry: "건설/건축/부동산업", region: "경기", phone: "010-4567-8901", email: "park@hanbit.co.kr", address: "경기도 성남시 분당구 판교로 50", hobby: "사진촬영, 여행", website: "", prText: "친환경 건축 설계 및 시공 전문기업입니다." },
  { id: "5", name: "최동우", department: "경제학과", admissionYear: 1988, position: "상임이사", generation: "제40대", company: "우리은행", jobTitle: "부행장", industry: "금융/보험업", region: "서울", phone: "010-5678-9012", email: "choi@wooribank.com", address: "서울시 중구 소공로 51", hobby: "마라톤, 독서", website: "", prText: "" },
  { id: "6", name: "정미영", department: "행정학과", admissionYear: 1985, position: "자문위원", generation: "제40대", company: "서울시청", jobTitle: "국장", industry: "공무원/회사원/협회/단체", region: "서울", phone: "010-6789-0123", email: "jung@seoul.go.kr", address: "서울시 중구 세종대로 110", hobby: "요가, 서예", website: "", prText: "서울시 도시계획 분야에서 30년간 근무하고 있습니다." },
  { id: "7", name: "한상철", department: "의학과", admissionYear: 1980, position: "고문", generation: "제40대", company: "성균병원", jobTitle: "원장", industry: "예술/스포츠/보건/의료업", region: "대구", phone: "010-7890-1234", email: "han@skkhospital.co.kr", address: "대구시 수성구 달구벌대로 1234", hobby: "낚시, 골프", website: "https://skkhospital.co.kr", prText: "지역사회 건강증진에 힘쓰는 종합병원입니다." },
  { id: "8", name: "윤하린", department: "컴퓨터공학과", admissionYear: 1992, position: "이사", generation: "제40대", company: "넥스트소프트", jobTitle: "CTO", industry: "전기/정보통신", region: "경기", phone: "010-8901-2345", email: "yoon@nextsoft.io", address: "경기도 성남시 분당구 판교역로 166", hobby: "코딩, 게임", website: "https://nextsoft.io", prText: "AI 기반 소프트웨어 솔루션을 개발합니다." },
  { id: "9", name: "강태준", department: "경영학과", admissionYear: 1978, position: "감사", generation: "제40대", company: "강태준회계법인", jobTitle: "대표", industry: "금융/보험업", region: "서울", phone: "010-9012-3456", email: "kang@ktjcpa.co.kr", address: "서울시 영등포구 여의대로 108", hobby: "등산", website: "", prText: "40년 경력의 회계·세무 전문 법인입니다." },
  { id: "10", name: "송미래", department: "경제학과", admissionYear: 1995, position: "이사", generation: "제40대", company: "미래에셋", jobTitle: "팀장", industry: "금융/보험업", region: "서울", phone: "010-0123-4567", email: "song@miraeasset.com", address: "서울시 중구 을지로 76", hobby: "요리, 와인", website: "", prText: "" },
  { id: "11", name: "오준혁", department: "행정학과", admissionYear: 1983, position: "상임이사", generation: "제40대", company: "교육부", jobTitle: "과장", industry: "교육/연구개발업", region: "세종", phone: "010-1111-2222", email: "oh@moe.go.kr", address: "세종시 도움6로 11", hobby: "독서, 테니스", website: "", prText: "교육 정책 수립 및 연구를 담당하고 있습니다." },
  { id: "12", name: "임소정", department: "IMBA", admissionYear: 2010, position: "이사", generation: "제41대", company: "삼성전자", jobTitle: "부장", industry: "제조업", region: "경기", phone: "010-3333-4444", email: "lim@samsung.com", address: "경기도 수원시 영통구 삼성로 129", hobby: "필라테스, 독서", website: "", prText: "반도체 사업부 전략기획을 담당하고 있습니다." },

  // 농업/광업/수산업/목축업
  { id: "13", name: "노현석", department: "경영학과", admissionYear: 1996, position: "이사", generation: "제40대", company: "그린팜영농조합", jobTitle: "대표", industry: "농업/광업/수산업/목축업", region: "충남", phone: "010-1300-1301", email: "noh@greenfarm.co.kr", address: "충남 논산시 강경읍 옥녀봉로 12", hobby: "사이클, 텃밭", website: "https://greenfarm.co.kr", prText: "스마트팜 기반 토마토·딸기 수경재배 농장을 운영합니다." },
  { id: "14", name: "임지원", department: "경제학과", admissionYear: 2001, position: "이사", generation: "제40대", company: "평창유기농협동조합", jobTitle: "이사장", industry: "농업/광업/수산업/목축업", region: "강원", phone: "010-1400-1401", email: "lim@pcorganic.kr", address: "강원 평창군 진부면 진부중앙로 88", hobby: "트레킹, 요리", website: "", prText: "친환경 유기농 채소를 수도권에 새벽 직배송합니다." },
  { id: "15", name: "박해성", department: "경영학과", admissionYear: 1993, position: "이사", generation: "제40대", company: "기장수산식품", jobTitle: "대표이사", industry: "농업/광업/수산업/목축업", region: "부산", phone: "010-1500-1501", email: "park@gjseafood.co.kr", address: "부산 기장군 기장읍 차성동로 22", hobby: "낚시, 서핑", website: "https://gjseafood.co.kr", prText: "수산물 가공·HMR 전문 제조 유통 기업입니다." },
  { id: "16", name: "윤도윤", department: "행정학과", admissionYear: 1989, position: "자문위원", generation: "제40대", company: "해남청정수산", jobTitle: "대표", industry: "농업/광업/수산업/목축업", region: "전남", phone: "010-1600-1601", email: "yoon@hncs.co.kr", address: "전남 해남군 송지면 산정길 7", hobby: "골프, 바둑", website: "", prText: "전남 지역 김·미역 양식 및 가공 사업을 영위합니다." },
  { id: "17", name: "박미경", department: "IMBA", admissionYear: 2009, position: "이사", generation: "제41대", company: "제주감귤영농조합", jobTitle: "이사장", industry: "농업/광업/수산업/목축업", region: "제주", phone: "010-1700-1701", email: "park@jejucitrus.kr", address: "제주 서귀포시 남원읍 태위로 200", hobby: "승마, 요가", website: "https://jejucitrus.kr", prText: "프리미엄 감귤 D2C 브랜드 'J-CITRUS'를 운영합니다." },

  // 제조업
  { id: "18", name: "조성호", department: "전자공학과", admissionYear: 1991, position: "상임이사", generation: "제40대", company: "(주)현우정밀", jobTitle: "대표이사", industry: "제조업", region: "경기", phone: "010-1800-1801", email: "cho@hyunwoo.co.kr", address: "경기 화성시 동탄산단2길 30", hobby: "골프, 사진", website: "https://hyunwoo.co.kr", prText: "현대·기아 1차 협력사로 모빌리티 정밀부품을 공급합니다." },
  { id: "19", name: "강수민", department: "화학공학과", admissionYear: 1998, position: "이사", generation: "제40대", company: "창원자동화시스템", jobTitle: "대표이사", industry: "제조업", region: "경남", phone: "010-1900-1901", email: "kang@cwauto.co.kr", address: "경남 창원시 성산구 공단로 145", hobby: "등산, 독서", website: "", prText: "스마트팩토리 MES 및 협동로봇 통합 솔루션 전문기업입니다." },
  { id: "20", name: "김재석", department: "전자공학과", admissionYear: 1985, position: "고문", generation: "제40대", company: "포항금속", jobTitle: "사장", industry: "제조업", region: "경북", phone: "010-2000-2001", email: "kim@pohangmetal.co.kr", address: "경북 포항시 남구 철강로 50", hobby: "낚시, 등산", website: "", prText: "특수강·이형강 제조 40년 노하우를 보유하고 있습니다." },
  { id: "21", name: "이수한", department: "화학공학과", admissionYear: 1994, position: "이사", generation: "제40대", company: "인천기계", jobTitle: "부사장", industry: "제조업", region: "인천", phone: "010-2100-2101", email: "lee@inchonmech.co.kr", address: "인천 남동구 남동대로 215", hobby: "테니스, 와인", website: "", prText: "산업용 펌프·밸브 양산 및 수출 전문 기업입니다." },
  { id: "22", name: "권나래", department: "경영학과", admissionYear: 2008, position: "이사", generation: "제41대", company: "천안에너지솔루션", jobTitle: "이사", industry: "제조업", region: "충남", phone: "010-2200-2201", email: "kwon@cnenergy.co.kr", address: "충남 천안시 서북구 직산읍 직산로 80", hobby: "필라테스, 여행", website: "https://cnenergy.co.kr", prText: "ESS·BMS 등 친환경 에너지 부품을 양산합니다." },

  // 유통/물류/도소매업
  { id: "23", name: "정태훈", department: "경영학과", admissionYear: 1997, position: "이사", generation: "제40대", company: "패스트딜리버리", jobTitle: "대표이사", industry: "유통/물류/도소매업", region: "서울", phone: "010-2300-2301", email: "jung@fastdeliv.co.kr", address: "서울 강서구 마곡중앙로 45", hobby: "러닝, 보드게임", website: "https://fastdeliv.co.kr", prText: "수도권 라스트마일 새벽·당일 배송 네트워크를 운영합니다." },
  { id: "24", name: "장유진", department: "IMBA", admissionYear: 2006, position: "이사", generation: "제40대", company: "글로벌로지스", jobTitle: "대표", industry: "유통/물류/도소매업", region: "경기", phone: "010-2400-2401", email: "jang@globallogis.com", address: "경기 평택시 포승읍 평택항만길 33", hobby: "여행, 요가", website: "https://globallogis.com", prText: "동남아 통관·창고·내륙운송 원스톱 서비스를 제공합니다." },
  { id: "25", name: "한지수", department: "경영학과", admissionYear: 2002, position: "이사", generation: "제40대", company: "프리미엄푸드유통", jobTitle: "본부장", industry: "유통/물류/도소매업", region: "서울", phone: "010-2500-2501", email: "han@pfdist.co.kr", address: "서울 송파구 올림픽로 240", hobby: "와인, 요리", website: "", prText: "백화점·호텔·고급 외식 채널 입점 컨설팅을 진행합니다." },
  { id: "26", name: "백승호", department: "경제학과", admissionYear: 1990, position: "상임이사", generation: "제40대", company: "부산항만물류", jobTitle: "이사", industry: "유통/물류/도소매업", region: "부산", phone: "010-2600-2601", email: "baek@bphlogis.co.kr", address: "부산 강서구 신항만로 99", hobby: "골프, 바둑", website: "", prText: "부산항 컨테이너 환적·내륙운송 인프라를 보유하고 있습니다." },
  { id: "27", name: "한가영", department: "경영학과", admissionYear: 2004, position: "이사", generation: "제40대", company: "콜드체인코리아", jobTitle: "이사", industry: "유통/물류/도소매업", region: "경기", phone: "010-2700-2701", email: "han@coldchain.kr", address: "경기 이천시 마장면 서이천로 66", hobby: "캠핑, 베이킹", website: "https://coldchain.kr", prText: "신선식품·바이오 콜드체인 풀필먼트 전문기업입니다." },

  // 건설/건축/부동산업
  { id: "28", name: "김도현", department: "건축학과", admissionYear: 1995, position: "이사", generation: "제40대", company: "도현건축사사무소", jobTitle: "대표", industry: "건설/건축/부동산업", region: "서울", phone: "010-2800-2801", email: "kim@dohyun-arch.com", address: "서울 마포구 양화로 156", hobby: "사진, 미술관", website: "https://dohyun-arch.com", prText: "노후 상가 리모델링 및 도시재생 설계 전문입니다." },
  { id: "29", name: "송재훈", department: "건축학과", admissionYear: 1988, position: "상임이사", generation: "제40대", company: "그린빌딩머티리얼", jobTitle: "이사", industry: "건설/건축/부동산업", region: "경기", phone: "010-2900-2901", email: "song@gbmat.co.kr", address: "경기 안양시 동안구 시민대로 230", hobby: "등산, 사진", website: "", prText: "저탄소 콘크리트·PF 단열재 등 친환경 자재를 유통합니다." },
  { id: "30", name: "신동민", department: "건축학과", admissionYear: 1999, position: "이사", generation: "제40대", company: "송도부동산개발", jobTitle: "본부장", industry: "건설/건축/부동산업", region: "인천", phone: "010-3000-3001", email: "shin@songdore.co.kr", address: "인천 연수구 컨벤시아대로 100", hobby: "골프, 와인", website: "", prText: "송도·청라 일대 상업·주거시설 개발 사업을 수행합니다." },
  { id: "31", name: "황태경", department: "건축학과", admissionYear: 1986, position: "자문위원", generation: "제40대", company: "대전종합건설", jobTitle: "상무", industry: "건설/건축/부동산업", region: "대전", phone: "010-3100-3101", email: "hwang@djgc.co.kr", address: "대전 유성구 대학로 99", hobby: "골프, 등산", website: "", prText: "충청권 공공·민간 건설 시공 35년 경력입니다." },
  { id: "32", name: "류지연", department: "건축학과", admissionYear: 2007, position: "이사", generation: "제40대", company: "서울리모델링", jobTitle: "이사", industry: "건설/건축/부동산업", region: "서울", phone: "010-3200-3201", email: "ryu@seoulremodel.co.kr", address: "서울 성동구 왕십리로 222", hobby: "요가, 인테리어", website: "https://seoulremodel.co.kr", prText: "주거·상업 인테리어 및 리모델링 시공 전문기업입니다." },

  // 숙박/음식점/서비스업
  { id: "33", name: "최보경", department: "IMBA", admissionYear: 2003, position: "이사", generation: "제40대", company: "평창리조트", jobTitle: "대표", industry: "숙박/음식점/서비스업", region: "강원", phone: "010-3300-3301", email: "choi@pcresort.co.kr", address: "강원 평창군 대관령면 올림픽로 715", hobby: "스키, 골프", website: "https://pcresort.co.kr", prText: "기업 워크숍·휴양 객실 패키지를 운영합니다." },
  { id: "34", name: "강하진", department: "경영학과", admissionYear: 2005, position: "이사", generation: "제40대", company: "SKK다이닝", jobTitle: "대표", industry: "숙박/음식점/서비스업", region: "서울", phone: "010-3400-3401", email: "kang@skkdining.com", address: "서울 강남구 봉은사로 524", hobby: "와인, 여행", website: "https://skkdining.com", prText: "한식 다이닝 프랜차이즈 'SKK다이닝'을 운영합니다." },
  { id: "35", name: "민호석", department: "IMBA", admissionYear: 2000, position: "이사", generation: "제40대", company: "호텔매니지먼트코리아", jobTitle: "이사", industry: "숙박/음식점/서비스업", region: "서울", phone: "010-3500-3501", email: "min@hmkorea.co.kr", address: "서울 중구 을지로 100", hobby: "사진, 마라톤", website: "", prText: "중소호텔 OTA 채널 위탁 운영 14개사 보유 중입니다." },
  { id: "36", name: "윤서아", department: "경영학과", admissionYear: 2008, position: "이사", generation: "제41대", company: "라보네케이터링", jobTitle: "대표", industry: "숙박/음식점/서비스업", region: "서울", phone: "010-3600-3601", email: "yoon@labonne.co.kr", address: "서울 용산구 한강대로 405", hobby: "베이킹, 여행", website: "https://labonne.co.kr", prText: "기업 행사·IR 케이터링 전문 업체입니다." },
  { id: "37", name: "차예슬", department: "IMBA", admissionYear: 2011, position: "이사", generation: "제41대", company: "제주풀빌라리조트", jobTitle: "이사", industry: "숙박/음식점/서비스업", region: "제주", phone: "010-3700-3701", email: "cha@jejupool.com", address: "제주 서귀포시 안덕면 산방로 380", hobby: "서핑, 사진", website: "", prText: "제주 남부권 프리미엄 풀빌라 리조트를 운영합니다." },

  // 금융/보험업
  { id: "38", name: "안수빈", department: "경제학과", admissionYear: 2004, position: "이사", generation: "제40대", company: "한국투자증권", jobTitle: "부장", industry: "금융/보험업", region: "서울", phone: "010-3800-3801", email: "ahn@truefriend.com", address: "서울 영등포구 의사당대로 88", hobby: "테니스, 독서", website: "", prText: "기업금융 본부 IPO·M&A 자문을 담당합니다." },
  { id: "39", name: "임재현", department: "경영학과", admissionYear: 1996, position: "상임이사", generation: "제40대", company: "신한라이프", jobTitle: "본부장", industry: "금융/보험업", region: "경기", phone: "010-3900-3901", email: "lim@shinhanlife.com", address: "경기 성남시 분당구 판교로 310", hobby: "골프, 등산", website: "", prText: "법인 단체보험·퇴직연금 컨설팅을 총괄합니다." },

  // 전기/정보통신
  { id: "40", name: "이세진", department: "컴퓨터공학과", admissionYear: 2002, position: "이사", generation: "제40대", company: "클라우드웍스", jobTitle: "대표", industry: "전기/정보통신", region: "서울", phone: "010-4000-4001", email: "lee@cloudworks.io", address: "서울 강남구 테헤란로 415", hobby: "코딩, 보드게임", website: "https://cloudworks.io", prText: "AWS Premier 파트너로 클라우드 마이그레이션 전문입니다." },
  { id: "41", name: "황민정", department: "컴퓨터공학과", admissionYear: 2009, position: "이사", generation: "제41대", company: "SaaS얼라이언스", jobTitle: "이사", industry: "전기/정보통신", region: "서울", phone: "010-4100-4101", email: "hwang@saas-alliance.kr", address: "서울 서초구 강남대로 311", hobby: "요가, 등산", website: "", prText: "동문 SaaS 기업 공동 마케팅 컨소시엄을 운영합니다." },
  { id: "42", name: "윤지환", department: "컴퓨터공학과", admissionYear: 1997, position: "상임이사", generation: "제40대", company: "시큐리티랩스", jobTitle: "본부장", industry: "전기/정보통신", region: "경기", phone: "010-4200-4201", email: "yoon@seclabs.co.kr", address: "경기 성남시 분당구 판교역로 235", hobby: "사이클, 게임", website: "", prText: "엔드포인트 보안·EDR 솔루션을 공급합니다." },
  { id: "43", name: "강민호", department: "전자공학과", admissionYear: 1992, position: "이사", generation: "제40대", company: "데이터플렉스", jobTitle: "대표", industry: "전기/정보통신", region: "대구", phone: "010-4300-4301", email: "kang@dataplex.co.kr", address: "대구 달서구 성서로 143", hobby: "골프, 영화감상", website: "https://dataplex.co.kr", prText: "지방거점 데이터센터·MSP 사업을 영위합니다." },

  // 교육/연구개발업
  { id: "44", name: "정현우", department: "화학공학과", admissionYear: 1990, position: "상임이사", generation: "제40대", company: "성균산학협력원", jobTitle: "책임연구원", industry: "교육/연구개발업", region: "서울", phone: "010-4400-4401", email: "jung@skk-ric.ac.kr", address: "서울 종로구 성균관로 25-2", hobby: "독서, 등산", website: "", prText: "산학 R&D 과제 발굴·매칭을 담당합니다." },
  { id: "45", name: "신예린", department: "IMBA", admissionYear: 2007, position: "이사", generation: "제40대", company: "글로벌에듀파트너스", jobTitle: "대표", industry: "교육/연구개발업", region: "서울", phone: "010-4500-4501", email: "shin@geduprtnr.com", address: "서울 종로구 종로 1", hobby: "요가, 여행", website: "https://geduprtnr.com", prText: "북미·유럽·동남아 30여 개 대학과 MOU를 보유합니다." },
  { id: "46", name: "장재훈", department: "컴퓨터공학과", admissionYear: 2010, position: "이사", generation: "제41대", company: "러닝랩스", jobTitle: "대표", industry: "교육/연구개발업", region: "경기", phone: "010-4600-4601", email: "jang@learninglabs.kr", address: "경기 성남시 분당구 정자일로 95", hobby: "코딩, 음악감상", website: "https://learninglabs.kr", prText: "AI 학습 분석 기반 EduTech 스타트업을 운영합니다." },
  { id: "47", name: "한아름", department: "경영학과", admissionYear: 1993, position: "이사", generation: "제40대", company: "직무교육원", jobTitle: "원장", industry: "교육/연구개발업", region: "서울", phone: "010-4700-4701", email: "han@jobedu.kr", address: "서울 중구 명동길 30", hobby: "독서, 클래식음악", website: "", prText: "기업 임직원 직무교육 100여 개 과정을 운영합니다." },
  { id: "48", name: "박정아", department: "화학공학과", admissionYear: 1996, position: "이사", generation: "제40대", company: "청주연구개발센터", jobTitle: "책임연구원", industry: "교육/연구개발업", region: "충북", phone: "010-4800-4801", email: "park@cjrnd.re.kr", address: "충북 청주시 흥덕구 오송읍 오송생명1로 173", hobby: "테니스, 여행", website: "", prText: "바이오 신소재 R&D 과제를 다수 수행하고 있습니다." },

  // 예술/스포츠/보건/의료업
  { id: "49", name: "이도윤", department: "경영학과", admissionYear: 2005, position: "이사", generation: "제40대", company: "KBL구단 운영사", jobTitle: "마케팅이사", industry: "예술/스포츠/보건/의료업", region: "서울", phone: "010-4900-4901", email: "lee@kblclub.com", address: "서울 송파구 올림픽로 25", hobby: "농구, 사진", website: "", prText: "프로농구 구단 스폰서십·마케팅을 총괄합니다." },
  { id: "50", name: "서지유", department: "경영학과", admissionYear: 2001, position: "이사", generation: "제40대", company: "아트인사이트", jobTitle: "대표", industry: "예술/스포츠/보건/의료업", region: "서울", phone: "010-5000-5001", email: "seo@artinsight.co.kr", address: "서울 서초구 남부순환로 2406", hobby: "공연 관람, 사진", website: "https://artinsight.co.kr", prText: "예술의전당·세종문화회관 공연 기획·후원 마케팅 전문." },
  { id: "51", name: "백승현", department: "의학과", admissionYear: 1985, position: "고문", generation: "제40대", company: "라이프메디컬", jobTitle: "이사", industry: "예술/스포츠/보건/의료업", region: "서울", phone: "010-5100-5101", email: "baek@lifemedical.co.kr", address: "서울 강남구 도산대로 405", hobby: "골프, 와인", website: "", prText: "재활·통증의학 전문 네트워크 병원을 운영합니다." },
  { id: "52", name: "송지원", department: "의학과", admissionYear: 1998, position: "상임이사", generation: "제40대", company: "광주바이오연구소", jobTitle: "본부장", industry: "예술/스포츠/보건/의료업", region: "광주", phone: "010-5200-5201", email: "song@gjbio.re.kr", address: "광주 북구 첨단과기로 123", hobby: "독서, 마라톤", website: "", prText: "면역항암 신약 후보물질 비임상 연구를 수행합니다." },
  { id: "53", name: "김서윤", department: "경영학과", admissionYear: 2009, position: "이사", generation: "제41대", company: "클래식기획", jobTitle: "대표", industry: "예술/스포츠/보건/의료업", region: "서울", phone: "010-5300-5301", email: "kim@classicplan.co.kr", address: "서울 종로구 세종대로 175", hobby: "피아노, 여행", website: "https://classicplan.co.kr", prText: "클래식 공연 기획 및 기업 후원 매칭을 담당합니다." },

  // 공무원/회사원/협회/단체
  { id: "54", name: "이형준", department: "행정학과", admissionYear: 1991, position: "상임이사", generation: "제40대", company: "산업통상자원부", jobTitle: "과장", industry: "공무원/회사원/협회/단체", region: "세종", phone: "010-5400-5401", email: "lee@motie.go.kr", address: "세종 한누리대로 402", hobby: "테니스, 독서", website: "", prText: "산업정책 분야에서 25년간 근무하고 있습니다." },
  { id: "55", name: "권혜진", department: "경영학과", admissionYear: 1999, position: "이사", generation: "제40대", company: "한국무역협회", jobTitle: "이사", industry: "공무원/회사원/협회/단체", region: "서울", phone: "010-5500-5501", email: "kwon@kita.net", address: "서울 강남구 영동대로 511", hobby: "요가, 와인", website: "", prText: "수출 중소기업 해외진출 지원 프로그램을 총괄합니다." },
  { id: "56", name: "조대성", department: "법학과", admissionYear: 1986, position: "자문위원", generation: "제40대", company: "부산상공회의소", jobTitle: "본부장", industry: "공무원/회사원/협회/단체", region: "부산", phone: "010-5600-5601", email: "cho@busancci.org", address: "부산 부산진구 새싹로 26", hobby: "등산, 골프", website: "", prText: "부산권 회원사 정책·복리후생 제휴 사업을 담당합니다." },
  { id: "57", name: "박혜원", department: "행정학과", admissionYear: 2003, position: "이사", generation: "제40대", company: "경기도청", jobTitle: "과장", industry: "공무원/회사원/협회/단체", region: "경기", phone: "010-5700-5701", email: "park@gg.go.kr", address: "경기 수원시 영통구 도청로 30", hobby: "독서, 캠핑", website: "", prText: "지자체 정책연구 용역 발주·관리를 담당합니다." },
];

export const FILTER_OPTIONS = {
  generation: ["제40대(2026~2027년)", "제41대(2028~2029년)"],
  generationValues: ["제40대", "제41대"],
  position: ["고문", "회장", "총괄부회장", "감사", "사무총장", "운영위원회", "자문위원", "부회장", "상임이사", "이사"],
  department: ["경영학과", "법학과", "컴퓨터공학과", "건축학과", "경제학과", "행정학과", "의학과", "전자공학과", "화학공학과", "IMBA"],
  industry: ["농업/광업/수산업/목축업", "제조업", "유통/물류/도소매업", "건설/건축/부동산업", "숙박/음식점/서비스업", "금융/보험업", "전기/정보통신", "교육/연구개발업", "예술/스포츠/보건/의료업", "공무원/회사원/협회/단체"],
  region: ["서울", "경기", "인천", "부산", "대구", "대전", "광주", "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "해외"],
};
