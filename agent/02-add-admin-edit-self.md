# 02-add-admin-edit-self.md

All actions should follow `../AGENT.md`.

## Requirements

Add page for editing profile information, such as name, department, password, etc. for admins.

Any link/button/... to editing admin profile should be accessible at all routes inside `/admin`.
Modify '로그아웃' button at bottom left of `AdminLayout` to have option of showing admin
name/profile image, and edit profile. Refer to existing user dropdown in `HomeLayout`.

## Implementation Plan

1. **Create Admin Profile Edit Page (`src/pages/admin/AdminProfilePage.tsx`)**
   - Create a page with a form to edit profile information (name, department, password).
   - Use `react-hook-form` and `zod` for form handling and validation, as specified in `AGENT.md`.
   - Implement mock save functionality using a simple mock state or store.
   - Show a success toast on save using `sonner`.

2. **Add Route in `src/App.tsx`**
   - Import `AdminProfilePage`.
   - Add a route `<Route path="profile" element={<AdminProfilePage />} />` under the `/admin` route group, inside `AdminLayout`.

3. **Modify `AdminLayout.tsx` (`src/components/AdminLayout.tsx`)**
   - Import `DropdownMenu` components from `@/components/ui/dropdown-menu` and `User` icon from `lucide-react`.
   - Locate the bottom left "로그아웃" button section (`<div className="p-2 border-t border-border">`).
   - Replace it with a `DropdownMenu` similar to the one in `MainLayout.tsx`.
   - The `DropdownMenuTrigger` should display the admin's name (e.g., "관리자") and profile image/icon.
   - The `DropdownMenuContent` should contain:
     - "내정보 조회·수정" (navigates to `/admin/profile`)
     - `DropdownMenuSeparator`
     - "로그아웃" (navigates to `/admin/login`)
