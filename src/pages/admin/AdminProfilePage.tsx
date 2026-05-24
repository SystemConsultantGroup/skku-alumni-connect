import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { User, Building2, Lock, Save, IdCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const profileFormSchema = z.object({
  userId: z.string(),
  name: z.string().min(2, {
    message: "이름은 2글자 이상이어야 합니다.",
  }),
  department: z.string().min(2, {
    message: "소속/부서는 2글자 이상이어야 합니다.",
  }),
  password: z.string().optional().refine((val) => !val || val.length >= 8, {
    message: "비밀번호는 8글자 이상이어야 합니다.",
  }),
  passwordConfirm: z.string().optional(),
}).refine((data) => {
  if (data.password && data.password !== data.passwordConfirm) {
    return false;
  }
  return true;
}, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordConfirm"],
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Mock default values
const defaultValues: Partial<ProfileFormValues> = {
  userId: "admin_user",
  name: "관리자",
  department: "사무처",
  password: "",
  passwordConfirm: "",
};

export default function AdminProfilePage() {
  const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const watchPassword = form.watch("password");

  function onSubmit(data: ProfileFormValues) {
    // This is where you would typically make an API call to save the data
    console.log("Saving profile data:", data);

    toast.success("프로필이 성공적으로 저장되었습니다.", {
      description: "변경된 정보가 시스템에 반영되었습니다.",
    });

    // If password was changed, clear the password fields
    if (data.password) {
      form.setValue("password", "");
      form.setValue("passwordConfirm", "");
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">관리자 내정보 수정</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>프로필 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>아이디</FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            readOnly
                            autoComplete="username"
                            className="pl-10 bg-muted text-muted-foreground cursor-not-allowed focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <IdCard className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <FormControl>
                          <Input placeholder="이름을 입력하세요" className="pl-10" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>소속/부서</FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <FormControl>
                          <Input placeholder="소속 또는 부서를 입력하세요" className="pl-10" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 border-t border-border mt-4">
                  <h3 className="text-sm font-medium mb-4">비밀번호 변경</h3>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>새 비밀번호</FormLabel>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <FormControl>
                              <Input
                                type="password"
                                autoComplete="new-password"
                                placeholder="변경할 비밀번호를 입력하세요 (8자 이상)"
                                className="pl-10"
                                {...field}
                                onFocus={() => setIsPasswordRevealed(true)}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {(isPasswordRevealed || (watchPassword && watchPassword.length > 0)) && (
                      <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>새 비밀번호 확인</FormLabel>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <FormControl>
                                <Input
                                  type="password"
                                  autoComplete="new-password"
                                  placeholder="비밀번호를 다시 한 번 입력하세요"
                                  className="pl-10"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" className="gap-2">
                  <Save className="w-4 h-4" />
                  저장하기
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
