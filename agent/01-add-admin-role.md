# 01-add-admin-role.md

I need to add admin role system to this '성균관대 총동창회 임원수첩 앱', or SKKU Alumni App.
Refer to [AGENT.md](../AGENT.md) for general project structure and guidelines.

## Background

This section shows how this app is ALREADY implemented. Do NOT implement this section.

- **Admin section**: There are several pages in admin section: '대시보드', '회원 관리', 'ASIS 최신화
  관리', '엑셀 업로드', '신규 신청 관리', '기여금 관리', '공지/뉴스 관리', '커뮤니티 관리', '신고
  관리'. '회원 관리' page and 'ASIS 최신화 관리' page both shows table of users, but 'ASIS 최신화
  관리' is focused for ASIS synchronization described below.

- **ASIS 최신화 관리** page: When user edits personal information like email or phone number, it is not
  reflected to ASIS, which is user management system, external from school itself. We decided to
  not integrate directly with ASIS API as it seemed legacy system and may have other issues. So
  admin should manually update personal information in ASIS.

  As there are several admins and using external systems like Excel seemed inefficient and not
  updated by latest user information, we added '최신으로 표시' (mark as latest) button for each row
  inside 'ASIS 최신화 관리' page.

  When admin enters 'ASIS 최신화 관리' page, it shows 'dirty' users, which means they changed their
  own personal information but that is not reflected to ASIS.
  The admin reflects one user's information into ASIS, then click '최신으로 표시' button for that
  user. Then this user will not be shown on list as 'not latest' inside 'ASIS 최신화 관리' page.

---

## Requirement

### Original Conversation with Persident

Original conversation from president was following:

```
안상인 사무총장은 엑셀을 출력해서 알바생에게 주는 방식보다, 특정 알바생에게 관리자 권한을 부여해 직접 ASIS 최신화 관리 화면을 확인하게 하는 방식도 가능하겠다고 제안했다.

장재원 회장은 관리자 권한을 부여하는 방식은 가능하다고 답했다.
다만 단일 관리자 계정을 여러 사람이 공유하는 방식보다는, 각 직원 또는 알바생에게 개별 관리자 계정을 부여하고, 퇴사하거나 업무가 종료되면 해당 계정을 삭제하는 방식이 적절하다고 설명했다.
장재원 회장은 확장 가능한 구조로 다음을 제안했다: 마스터 관리자, 일반 관리자, 기능별 제한 관리자. (예: ASIS 최신화 관리만 접근 가능한 관리자)

안상인 사무총장은 사무처 직원 5명 정도는 모두 관리자가 되어야 하며, 본인이 마스터 관리자로서 관리자들을 관리하면 되겠다고 말했다.
이에 따라 **관리자 관리 기능**, 즉 마스터 관리자가 하위 관리자 계정을 생성·삭제·관리하는 구조가 필요하다는 논의가 이루어졌다.

장재원 회장은 향후 구조를 확장한다면 관리자에도 여러 등급을 둘 수 있다고 설명했다.
예를 들어 어떤 관리자는 전체 회원 관리에 접근할 수 있고, 어떤 관리자는 ASIS 최신화 관리 화면만 접근할 수 있도록 기능별 권한을 나누는 방식이다.

안상인 사무총장은 알바생이 다른 기능까지 들어가서 수정할 가능성은 낮지만, 그래도 ASIS 최신화 관리만 보게 하면 충분할 것 같다고 말했다.

장재원 회장은 기능별 권한 관리는 가능하지만 구현 복잡도가 올라가므로 시도는 해볼 수 있다고 답했다.
```

So, some basic permission system for moderators is required, as there would be part time workers for managing users. We cannot grant them full roles, nor share 'master' account.

### Moderator Hierarchy

The motivation to introduce some kind of moderator hierarchy was 'ASIS 최신화 관리', but this system is
not solely limited to that feature. These role system should provide access control to every
management menu.

These distinctions below are just ways to separate some workers; they do not have to systematically
present or implemented as below. We will use Role-Based Access Control (RBAC) to make these
hierarchies available.

We call following people as moderators.

- **Owner**: Has full access to every features and administration. The president will have this role.
- **Admin**: Can manage other managers.
- **Manager**: Workers; can access to some portion of management page.

## Implementation Plan

We only need to focus on implementing frontend page design, not connecting to API or implementing backend api. This requirement is also mentioned inside `AGENT.md`.

These moderator role system would be implemented through Role-Based Access Control (RBAC).

### Resource Scopes and ACL

Basically we categorize resources like 'read users information', 'write users information', 'access to ASIS 최신화 관리 menu' etc. These resource scopes are represented like `read:users`, `write:users`, `page:asis-sync` etc.

Each workers may be granted for some resource scopes like `read:users` or granted to specific pages by `page:asis-sync`, `page:applications`, `page:payments`, `page:news`, `page:community` or `page:reports`. These pages also require access to some portion of user information, but some information required for these pages are automatically included for these `page:` scope.
This does not mean `page:payments` implies `write:users` or `read:users`; for `/admin/payments`, the page includes 이름, 직급, 기수, 납부 방법, ... on table. Only these fields are granted via specific scope.

Note that resource scope syntax like `read:users` is only for clarification; these won't exist as
string, but rather as database entry or integer id.

ACL is simply list of resource scope.
For example, Owner, Admin, Manager may have ACLs as below:

- Owner: hardcoded role plus admin ACL
- Admin: `write:admins`, `page:*`
- Manager: `page:asis-sync`, ...

Owners and admins are mostly equivalent, but admins cannot modify owners (roles, ...). The UI should enforce this by preventing privilege escalation (e.g., disabling edit/delete actions on owner accounts for non-owner admins).

As we are trying to only build mock design, you do not have to be very specific about the system.
Only care about what's shown on UI. Raw scopes like `read:users` or `page:asis-sync` should not be
shown directly to users. Instead, a structured, human-readable permission UI like `[v] 회원 정보: 조회
/ 수정`, `[v] ASIS 최신화 관리 페이지` is highly preferable and user-friendly.

### Roles

Roles contain ACL, and they can be granted to users. 
Roles exist as database entry, not hardcoded roles. There would be some page that can define/modify/delete roles.

## Added Section on Admin Page: '매니저 관리'

'매니저 관리' (meaning managers management, at `/admin/managers`) section should be added on the left sidebar on admin page.
This section cannot be seen without `write:admins` ACL, so only owners and admins can see this.

This page will serve as the central hub for managing the RBAC system and moderator accounts. It is divided into three main subsections, which can be implemented as client-side tabs (using `@/components/ui/tabs`) for a seamless UX without page reloads, all residing under the `/admin/managers` route.

#### 1. 운영자 목록 (Moderator List)
- **Purpose**: Manage individual moderator accounts and assign them roles.
- **UI Components**:
  - **Data Table**: Displays a list of moderators.
    - **Columns**: 아이디, 상태(활성화/비활성화, as icon/indicator), 이름, 직책/소속, 역할, 최근 로그인 일시.
    - **Row Actions**: when clicking 'three dots icon' right to each row. 정보 수정, 역할 수정,
      비밀번호 초기화, 활성화/비활성화, 삭제.
    - **Security UI Constraint**: Actions on 'owner' must be visually disabled (grayed out) or hidden.
    - **Basic table features**: pagination, filter, sorting.
  - **'운영자 추가' (Add Moderator) Button & Modal**:
    - Opens a dialog or sheet to create a new moderator.
    - **Input Fields**: 아이디, 이름, 직책, 임시 비밀번호 설정. specific info requirements for moderators
      are not known yet.
    - **Role Selection**: A visual multi-select dropdown, badge-list, or checkbox list to assign one or multiple predefined roles to the new user.

#### 2. 역할 관리 (Role Management)
- **Purpose**: Define and configure custom roles and their associated permissions (ACLs).
- **UI Components**:
  - **Role List**: A grid of cards or a table displaying all created roles.
    - **Details**: Role Name (e.g., "ASIS 동기화 담당"), Description, and the number of users currently assigned to this role.
    - **Row Actions**: Edit Role, Delete Role, See assigned moderators. Edit/delete should be
      prevented or show a strong warning if active moderators hold the role.
  - **'역할 만들기' (Create Role) Button & Modal/Drawer**:
    - **Input Fields**: Role Name, Description.
    - **Permissions Selector (Core RBAC UI)**: A user-friendly matrix or grouped checkbox list, *grouped by domain*.
      - **Actions (기능 권한)**: `[ ] 회원 정보 [조회/수정]` `[ ] 매니저 관리` ...
      - **Pages (페이지 접근 권한)**: `[ ] 대시보드` `[ ] ASIS 최신화 관리` `[ ] 결제 관리` `[ ] 공지사항` ...
    - **Assign to moderators**: Show a list of moderators who will be assigned this role as soon as
      the role is created.

#### 3. 감사 로그 (Audit Log)
- **Purpose**: Track all moderator actions for security, compliance, and troubleshooting.
- **UI Components**:
  - **Data Table**: Read-only list of system events.
    - **Columns**: Timestamp, ID, Name, Action Type (e.g., "Updated User", "Created Role"), Target Resource (e.g., User ID "12345").
    - **Basic table features**: pagination, filter (including name, action type, target resource,
      date range etc).
