import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { allMembers, type AdminMember } from "@/data/adminMembers";
import {
  selectAsisStore,
  setAsisStatus,
  useAsisStore,
  type AsisStatus,
} from "@/data/asisSync";

const PAGE_SIZE = 10;

const AdminMembers = () => {
  const [search, setSearch] = useState("");
  const [filterGen, setFilterGen] = useState("all");
  const [filterPos, setFilterPos] = useState("all");
  const [filterPay, setFilterPay] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState<AdminMember | null>(null);
  const [editPosition, setEditPosition] = useState("");
  const [editGeneration, setEditGeneration] = useState("");
  const [editPayment, setEditPayment] = useState("");
  const [editAsis, setEditAsis] = useState<AsisStatus>("synced");

  const asisRecords = useAsisStore(selectAsisStore);

  const filtered = allMembers.filter((m) => {
    if (search && !m.name.includes(search) && !m.department.includes(search) && !String(m.year).includes(search)) return false;
    if (filterGen !== "all" && m.generation !== filterGen) return false;
    if (filterPos !== "all" && m.position !== filterPos) return false;
    if (filterPay !== "all" && m.paymentStatus !== filterPay) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openDetail = (m: AdminMember) => {
    setSelectedMember(m);
    setEditPosition(m.position);
    setEditGeneration(m.generation);
    setEditPayment(m.paymentStatus);
    setEditAsis(asisRecords[m.id]?.status ?? "synced");
  };

  const handleSave = () => {
    if (!selectedMember) return;
    const prevAsis = asisRecords[selectedMember.id]?.status ?? "synced";
    if (prevAsis !== editAsis) {
      setAsisStatus(selectedMember.id, editAsis);
    }
    toast.success("변경사항이 저장되었습니다 (mock)");
    setSelectedMember(null);
  };

  return (
    <div className="space-y-4 max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">회원 관리</h1>
        <Button variant="outline" onClick={() => toast.success("엑셀 파일이 다운로드됩니다 (mock)")}>
          <Download className="w-4 h-4 mr-1" />
          엑셀 다운로드
        </Button>
      </div>

      {/* Search + Filters */}
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="이름, 학과, 학번 검색" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" />
        </div>
        <Select value={filterGen} onValueChange={(v) => { setFilterGen(v); setPage(1); }}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="기수" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 기수</SelectItem>
            <SelectItem value="제40대">제40대</SelectItem>
            <SelectItem value="제41대">제41대</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPos} onValueChange={(v) => { setFilterPos(v); setPage(1); }}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="직급" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 직급</SelectItem>
            {["회장","부회장","감사","자문위원","상임이사","이사","고문"].map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterPay} onValueChange={(v) => { setFilterPay(v); setPage(1); }}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="납부상태" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 상태</SelectItem>
            <SelectItem value="완료">납부 완료</SelectItem>
            <SelectItem value="미납">미납</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">총 {filtered.length}명</p>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>학과</TableHead>
                <TableHead>학번</TableHead>
                <TableHead>직급</TableHead>
                <TableHead>기수</TableHead>
                <TableHead>연락처</TableHead>
                <TableHead>납부 상태</TableHead>
                <TableHead>가입 상태</TableHead>
                <TableHead>ASIS 상태</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((m) => {
                const asisStatus = asisRecords[m.id]?.status ?? "synced";
                return (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell>{m.department}</TableCell>
                    <TableCell>{m.year}</TableCell>
                    <TableCell>{m.position}</TableCell>
                    <TableCell>{m.generation}</TableCell>
                    <TableCell>{m.phone}</TableCell>
                    <TableCell>
                      <Badge className={m.paymentStatus === "완료" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                        {m.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        m.accountStatus === "활성" ? "text-green-600 border-green-300" :
                        m.accountStatus === "비활성" ? "text-red-600 border-red-300" :
                        "text-muted-foreground"
                      }>
                        {m.accountStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={asisStatus === "synced"
                        ? "bg-green-100 text-green-700 border-green-300"
                        : "bg-red-100 text-red-700 border-red-300"
                      }>
                        {asisStatus === "synced" ? "최신" : "미반영"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => openDetail(m)}>관리</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => setPage(page - 1)}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm text-muted-foreground">{page} / {totalPages}</span>
        <Button variant="outline" size="icon" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedMember} onOpenChange={(o) => !o && setSelectedMember(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>회원 상세 관리 - {selectedMember?.name}</DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">이름:</span> {selectedMember.name}</div>
                <div><span className="text-muted-foreground">학과:</span> {selectedMember.department}</div>
                <div><span className="text-muted-foreground">학번:</span> {selectedMember.year}</div>
                <div><span className="text-muted-foreground">연락처:</span> {selectedMember.phone}</div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">직급</label>
                  <Select value={editPosition} onValueChange={setEditPosition}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["회장","부회장","감사","자문위원","상임이사","이사","고문"].map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">기수</label>
                  <Select value={editGeneration} onValueChange={setEditGeneration}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="제40대">제40대</SelectItem>
                      <SelectItem value="제41대">제41대</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">납부 상태</label>
                  <Select value={editPayment} onValueChange={setEditPayment}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="완료">납부 완료</SelectItem>
                      <SelectItem value="미납">미납</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">ASIS 상태</label>
                  <Select value={editAsis} onValueChange={(v) => setEditAsis(v as AsisStatus)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="synced">최신</SelectItem>
                      <SelectItem value="pending">미반영</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex-row justify-between sm:justify-between">
            <Button variant="destructive" size="sm" onClick={() => { toast.success("회원이 비활성화되었습니다 (mock)"); setSelectedMember(null); }}>
              회원 비활성화
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedMember(null)}>취소</Button>
              <Button onClick={handleSave}>저장</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMembers;
