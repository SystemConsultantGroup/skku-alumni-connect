import { useState } from "react";
import { useModerators, useRoles, managersStore, Moderator } from "@/data/managers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Plus, Search, ShieldAlert, Circle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ManagerListTab() {
  const moderators = useModerators();
  const roles = useRoles();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Moderator Form State
  const [newMod, setNewMod] = useState({ id: "", name: "", email: "", position: "", tempPassword: "" });
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);

  // Edit Info Modal State
  const [isEditInfoModalOpen, setIsEditInfoModalOpen] = useState(false);
  const [editingMod, setEditingMod] = useState<Moderator | null>(null);
  const [editModData, setEditModData] = useState({ name: "", email: "", position: "" });

  // Edit Role Modal State
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [editRoleIds, setEditRoleIds] = useState<string[]>([]);

  // Status Toggle Confirm State
  const [statusTargetMod, setStatusTargetMod] = useState<Moderator | null>(null);

  const filteredModerators = moderators.filter(
    (mod) =>
      mod.name.includes(searchTerm) ||
      mod.id.includes(searchTerm) ||
      mod.position.includes(searchTerm) ||
      mod.email.includes(searchTerm)
  );

  const handleAddModerator = () => {
    if (!newMod.id || !newMod.name) {
      toast.error("아이디와 이름을 입력해주세요.");
      return;
    }
    managersStore.addModerator({
      status: "active",
      name: newMod.name,
      email: newMod.email,
      position: newMod.position,
      roleIds: selectedRoleIds,
    });
    toast.success("운영자가 추가되었습니다.");
    setIsAddModalOpen(false);
    setNewMod({ id: "", name: "", email: "", position: "", tempPassword: "" });
    setSelectedRoleIds([]);
  };

  const openEditInfoModal = (mod: Moderator) => {
    setEditingMod(mod);
    setEditModData({ name: mod.name, email: mod.email, position: mod.position });
    setIsEditInfoModalOpen(true);
  };

  const handleEditInfo = () => {
    if (!editingMod) return;
    if (!editModData.name) {
      toast.error("이름을 입력해주세요.");
      return;
    }
    managersStore.updateModerator(editingMod.id, {
      name: editModData.name,
      email: editModData.email,
      position: editModData.position,
    });
    toast.success("운영자 정보가 수정되었습니다.");
    setIsEditInfoModalOpen(false);
  };

  const openEditRoleModal = (mod: Moderator) => {
    setEditingMod(mod);
    setEditRoleIds([...mod.roleIds]);
    setIsEditRoleModalOpen(true);
  };

  const handleEditRole = () => {
    if (!editingMod) return;
    managersStore.updateModerator(editingMod.id, {
      roleIds: editRoleIds,
    });
    toast.success("운영자 역할이 수정되었습니다.");
    setIsEditRoleModalOpen(false);
  };

  const isOwner = (mod: Moderator) => mod.roleIds.includes("role_owner");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="이름, 아이디, 직책 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              운영자 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>새 운영자 추가</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="id">아이디</Label>
                <Input
                  id="id"
                  value={newMod.id}
                  onChange={(e) => setNewMod({ ...newMod, id: e.target.value })}
                  placeholder="user123"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  value={newMod.name}
                  onChange={(e) => setNewMod({ ...newMod, name: e.target.value })}
                  placeholder="홍길동"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMod.email}
                  onChange={(e) => setNewMod({ ...newMod, email: e.target.value })}
                  placeholder="example@skku.edu"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position">직책/소속</Label>
                <Input
                  id="position"
                  value={newMod.position}
                  onChange={(e) => setNewMod({ ...newMod, position: e.target.value })}
                  placeholder="사무처"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">임시 비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={newMod.tempPassword}
                  onChange={(e) => setNewMod({ ...newMod, tempPassword: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
              <div className="grid gap-2">
                <Label>역할 부여</Label>
                <div className="flex flex-col gap-2 border rounded-md p-3 max-h-40 overflow-y-auto">
                  {roles.map((role) => (
                    <div key={role.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`role-${role.id}`}
                        checked={selectedRoleIds.includes(role.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRoleIds([...selectedRoleIds, role.id]);
                          } else {
                            setSelectedRoleIds(selectedRoleIds.filter((id) => id !== role.id));
                          }
                        }}
                      />
                      <Label htmlFor={`role-${role.id}`} className="font-normal cursor-pointer">
                        {role.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>취소</Button>
              <Button onClick={handleAddModerator}>추가</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">아이디</TableHead>
              <TableHead className="w-[80px]">상태</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>직책/소속</TableHead>
              <TableHead>역할</TableHead>
              <TableHead>최근 로그인 일시</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredModerators.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                  운영자가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              filteredModerators.map((mod) => {
                const owner = isOwner(mod);
                return (
                  <TableRow key={mod.id} className={owner ? "bg-muted/30" : ""}>
                    <TableCell className="font-medium">{mod.id}</TableCell>
                    <TableCell>
                      {mod.status === "active" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {mod.name}
                        {owner && <ShieldAlert className="w-3.5 h-3.5 text-blue-500" />}
                      </div>
                    </TableCell>
                    <TableCell>{mod.email}</TableCell>
                    <TableCell>{mod.position}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {mod.roleIds.map(rid => {
                          const r = roles.find(ro => ro.id === rid);
                          return r ? (
                            <Badge key={rid} variant={owner ? "default" : "secondary"} className="text-xs font-normal">
                              {r.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {mod.lastLoginAt === "-" ? "로그인 이력 없음" : new Date(mod.lastLoginAt).toLocaleString("ko-KR")}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" disabled={owner}>
                            <MoreHorizontal className="w-4 h-4" />
                            <span className="sr-only">메뉴 열기</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditInfoModal(mod)}>
                            정보 수정
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditRoleModal(mod)}>
                            역할 수정
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            if (confirm("임시 비밀번호가 포함된 메일을 전송하시겠습니까?")) {
                              toast.success("비밀번호 초기화 링크가 전송되었습니다.");
                            }
                          }}>
                            비밀번호 초기화
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setStatusTargetMod(mod)}
                          >
                            {mod.status === "active" ? "비활성화" : "활성화"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              if (confirm("정말 삭제하시겠습니까?")) {
                                managersStore.deleteModerator(mod.id);
                                toast.success("삭제되었습니다.");
                              }
                            }}
                          >
                            삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Info Modal */}
      <Dialog open={isEditInfoModalOpen} onOpenChange={setIsEditInfoModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>운영자 정보 수정</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-id">아이디</Label>
              <Input
                id="edit-id"
                value={editingMod?.id || ""}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-name">이름</Label>
              <Input
                id="edit-name"
                value={editModData.name}
                onChange={(e) => setEditModData({ ...editModData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">이메일</Label>
              <Input
                id="edit-email"
                type="email"
                value={editModData.email}
                onChange={(e) => setEditModData({ ...editModData, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-position">직책/소속</Label>
              <Input
                id="edit-position"
                value={editModData.position}
                onChange={(e) => setEditModData({ ...editModData, position: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditInfoModalOpen(false)}>취소</Button>
            <Button onClick={handleEditInfo}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Modal */}
      <Dialog open={isEditRoleModalOpen} onOpenChange={setIsEditRoleModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>운영자 역할 수정</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label>역할 부여</Label>
            <div className="flex flex-col gap-2 border rounded-md p-3 max-h-40 overflow-y-auto">
              {roles.map((role) => (
                <div key={role.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`edit-role-${role.id}`}
                    checked={editRoleIds.includes(role.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setEditRoleIds([...editRoleIds, role.id]);
                      } else {
                        setEditRoleIds(editRoleIds.filter((id) => id !== role.id));
                      }
                    }}
                  />
                  <Label htmlFor={`edit-role-${role.id}`} className="font-normal cursor-pointer">
                    {role.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleModalOpen(false)}>취소</Button>
            <Button onClick={handleEditRole}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
