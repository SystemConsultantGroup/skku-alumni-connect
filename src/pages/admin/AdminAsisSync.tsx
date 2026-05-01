import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import {
  ASIS_FIELD_LABEL,
  markAsisSynced,
  selectAsisStore,
  useAsisStore,
  type AsisPendingChange,
} from "@/data/asisSync";
import { allMembers } from "@/data/adminMembers";

const memberById = new Map(allMembers.map((m) => [m.id, m]));

const formatDate = (iso: string) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate(),
  ).padStart(2, "0")}`;
};

const ChangeRow = ({ change }: { change: AsisPendingChange }) => (
  <div className="flex items-start gap-2 text-sm">
    <span className="text-muted-foreground shrink-0 w-12">
      {ASIS_FIELD_LABEL[change.field]}
    </span>
    <span className="font-mono text-muted-foreground line-through">
      {change.oldValue || "-"}
    </span>
    <ArrowRight className="w-3.5 h-3.5 mt-1 text-muted-foreground shrink-0" />
    <span className="font-mono text-foreground font-medium">
      {change.newValue || "-"}
    </span>
  </div>
);

const AdminAsisSync = () => {
  const records = useAsisStore(selectAsisStore);
  const pending = useMemo(
    () =>
      Object.values(records)
        .filter((r) => r.status === "pending")
        .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)),
    [records],
  );

  const handleMarkSynced = (memberId: number, name: string) => {
    markAsisSynced(memberId);
    toast.success(`${name} 회원의 ASIS 상태가 '최신'으로 변경되었습니다`);
  };

  return (
    <div className="space-y-4 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">ASIS 최신화 관리</h1>
        <p className="text-sm text-muted-foreground mt-1">
          회원이 앱에서 변경한 정보를 ASIS에 반영한 뒤 '최신으로 표시'를 눌러 목록에서 제외하세요.
        </p>
      </div>

      <p className="text-sm text-muted-foreground">총 {pending.length}건 미반영</p>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">이름</TableHead>
                <TableHead className="w-[180px]">학과 / 학번</TableHead>
                <TableHead>변경 항목</TableHead>
                <TableHead className="w-[120px]">변경일</TableHead>
                <TableHead className="w-[140px] text-right">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pending.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                    <RefreshCw className="w-6 h-6 mx-auto mb-2 opacity-40" />
                    최신화가 필요한 회원이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                pending.map((record) => {
                  const member = memberById.get(record.memberId);
                  if (!member) return null;
                  return (
                    <TableRow key={record.memberId}>
                      <TableCell className="font-medium align-top">{member.name}</TableCell>
                      <TableCell className="align-top text-sm">
                        <div>{member.department}</div>
                        <div className="text-muted-foreground">{member.year}학번</div>
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="space-y-1">
                          {record.changes.map((c) => (
                            <ChangeRow key={c.field} change={c} />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="align-top text-sm text-muted-foreground">
                        {formatDate(record.updatedAt)}
                      </TableCell>
                      <TableCell className="align-top text-right">
                        <Button
                          size="sm"
                          onClick={() => handleMarkSynced(record.memberId, member.name)}
                        >
                          최신으로 표시
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAsisSync;
