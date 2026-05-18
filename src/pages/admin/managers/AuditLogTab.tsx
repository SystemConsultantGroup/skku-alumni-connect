import { useState } from "react";
import { useAuditLogs } from "@/data/managers";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AuditLogTab() {
  const auditLogs = useAuditLogs();
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.actorName.includes(searchTerm) ||
      log.actorId.includes(searchTerm) ||
      log.targetResource.includes(searchTerm);
    const matchesAction = actionFilter === "all" || log.actionType.includes(actionFilter);
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="이름, 아이디, 리소스 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="액션 필터" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 액션</SelectItem>
              <SelectItem value="Moderator">운영자 관련</SelectItem>
              <SelectItem value="Role">역할 관련</SelectItem>
            </SelectContent>
          </Select>

          {/* Note: Date Range Picker mocked with a simple input or just visually for now */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground border rounded-md px-3 py-2 bg-background">
            <span>날짜:</span>
            <span className="font-medium text-foreground">최근 7일</span>
          </div>
        </div>

        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          CSV 다운로드
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">일시</TableHead>
              <TableHead className="w-[120px]">아이디</TableHead>
              <TableHead className="w-[120px]">이름</TableHead>
              <TableHead className="w-[150px]">수행 작업</TableHead>
              <TableHead>대상 리소스</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString("ko-KR")}
                  </TableCell>
                  <TableCell>{log.actorId}</TableCell>
                  <TableCell>{log.actorName}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-muted rounded-md text-xs font-medium">
                      {log.actionType}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{log.targetResource}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mock Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          총 {filteredLogs.length}개의 로그
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>이전</Button>
          <Button variant="outline" size="sm" disabled>다음</Button>
        </div>
      </div>
    </div>
  );
}
