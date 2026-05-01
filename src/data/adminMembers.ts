export interface AdminMember {
  id: number;
  name: string;
  department: string;
  year: number;
  position: string;
  generation: string;
  phone: string;
  address: string;
  email: string;
  paymentStatus: "완료" | "미납";
  accountStatus: "활성" | "비활성" | "미가입";
}

const generateMembers = (): AdminMember[] => {
  const depts = ["경영학과", "법학과", "컴퓨터공학과", "건축학과", "경제학과", "행정학과", "의학과", "IMBA"];
  const positions = ["회장", "부회장", "감사", "자문위원", "상임이사", "이사", "고문"];
  const names = ["김민수", "이영희", "박철수", "최지연", "정대호", "강수진", "한명석", "윤서연", "오태진", "송미라", "조창식", "김영수", "이정민", "박서연", "최동우", "정미영", "한상철", "윤하린", "강태준", "송미래"];
  const regions = ["서울시 강남구 테헤란로", "서울시 종로구 율곡로", "경기도 성남시 분당구 판교로", "부산시 해운대구 우동", "인천시 연수구 송도동", "대전시 유성구 대학로", "광주시 북구 용봉동", "대구시 수성구 동대구로"];
  return names.map((name, i) => ({
    id: i + 1,
    name,
    department: depts[i % depts.length],
    year: 1978 + (i * 2) % 30,
    position: positions[i % positions.length],
    generation: i < 16 ? "제40대" : "제41대",
    phone: `010-${String(1000 + i).slice(-4)}-${String(5000 + i * 3).slice(-4)}`,
    address: `${regions[i % regions.length]} ${100 + i * 7}`,
    email: `${name}${i + 1}@example.com`,
    paymentStatus: i % 3 === 2 ? "미납" : "완료",
    accountStatus: i % 5 === 4 ? "비활성" : i % 7 === 6 ? "미가입" : "활성",
  }));
};

export const allMembers: AdminMember[] = generateMembers();
