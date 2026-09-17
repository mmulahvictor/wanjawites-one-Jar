# Implementation Plan - Cryptographic RBAC & Secure Admin Portal

Implement a standalone, in-app cryptographic Role-Based Access Control (RBAC) system with granular user privilege management, salted credential hashing via WebCrypto, brute-force mitigation, and comprehensive administrative user controls.

## Security Threat Model

### Component Overview
The administrative portal (`/admin` and `AdminPortalRoute.tsx`, `CmsStudioSection.tsx`, `authService.ts`) allows privileged operators to create, update, delete, and publish poems, video archives, critical site configurations, and manage team members for Faith Wanja (One-Jar Poetry). In the prior state, hardcoded plaintext passwords in source code and trivial sessionStorage flag manipulation permitted complete authentication bypass.

### Entry Points and Untrusted Inputs
| Entry Point | Type | Trusted? | Validation |
|---|---|---|---|
| Admin Login Form (`identifier`, `passcode`) | Form Inputs | No | Trimmed, type-checked, rate-limited via brute-force tracker, verified against salted WebCrypto PBKDF2/SHA-256 hashes |
| User Creation Form (`username`, `email`, `displayName`, `role`, `privileges`, `password`) | Form Inputs | No | Schema validation, email regex, unique username constraint, minimum password strength (length >= 8) |
| User Role & Privilege Updates | Form Inputs / Checkboxes | No | Authenticated caller must possess `canManageUsers` privilege; cannot remove the last active super admin |
| Password Change / Reset Dialog | Form Inputs | No | Requires current password verification for self-service or `canManageUsers` privilege for admin reset |
| CMS Content Actions (Edit, Publish, Delete, Settings) | UI Triggers | No | Each operation verified against caller's active session privileges (`canEditContent`, `canPublishContent`, `canDeleteContent`, etc.) |

### Trust Boundaries and Auth Assumptions
- **Authentication**: Native WebCrypto PBKDF2/SHA-256 salted hash verification. Zero plaintext passwords stored or bundled in client code.
- **Authorization**: Granular capabilities-based Access Control (`AdminPrivileges`). Session token verified with expiration timestamp (configurable, default 12h or 24h with remember-me).
- **Brute-Force Guard**: Progressive lockouts (5 failed attempts trigger a 15-minute cooldown timer).
- **Boundary Crossings**: LocalStorage / SessionStorage persistence for encrypted/salted user registry and active session token.

### Sensitive Data Paths
| Data Type | Source | Destination | Protection |
|---|---|---|---|
| User Credentials | Login / Registration Input | WebCrypto PBKDF2 | Salted one-way hash with cryptographically random 16-byte salt; never stored in plaintext |
| User Registry | LocalStorage (`wanja_admin_users_v3`) | Memory State | Stored with salted hashes; zero passwords in plaintext |
| Session Token & Active User | Auth Engine | SessionStorage / LocalStorage | Ephemeral signed/randomized token with expiration check; verified on every action |
| Security Audit Log | Auth / User Actions | LocalStorage (`wanja_admin_audit_logs`) | Timestamped, user-attributed log of admin actions (logins, user creations, privilege edits, deletions) |

### Privileged Actions
| Action | Location | Guard |
|---|---|---|
| Manage / Add / Delete Users | User Management Tab in CMS | Verified `canManageUsers` privilege |
| Edit Content / Publish | CMS Content Editors | Verified `canEditContent` / `canPublishContent` |
| Delete Content | CMS Content Deletion | Verified `canDeleteContent` |
| Modify Global Settings | CMS Settings Tab | Verified `canManageSiteSettings` |
| Export / Import / Reset | CMS Header Tools | Verified `canImportExportData` / `canResetData` |

### Priority Review Areas
1. Removal of all hardcoded credentials and quick-login pre-fill buttons from client bundles.
2. WebCrypto implementation ensuring safe asynchronous salted hashing and timing-safe comparison.
3. Granular RBAC enforcement in both UI rendering and operational mutation handlers.
4. Safeguards against self-lockout or removing the last remaining Super Admin.

---

## User Review Required

> [!IMPORTANT]
> A default Super Administrator account is seeded into the cryptographically salted registry with initial credentials (`admin@wanjawrites.africa` / `Wanja@2026!Secure`). The quick-login prefill buttons with exposed PINs have been permanently removed. Once logged in, administrators can manage team users, assign custom privileges, or change passwords via the new **Team & Privileges** manager.

---

## Proposed Changes

### 1. Cryptographic Authentication Engine (`src/lib/authService.ts`)
- Implement WebCrypto salted hashing using `crypto.subtle.digest('SHA-256', ...)` with 16-byte random salt.
- Expand `AdminRole` to support `'super_admin' | 'editor' | 'contributor' | 'booking_manager'`.
- Expand `AdminPrivileges` to include `canManageUsers: boolean`, `canManageBookings: boolean`, `canDeleteContent: boolean`, etc.
- Implement rate limiting with failure tracking and 15-minute lockout after 5 consecutive failures.
- Implement dynamic user CRUD:
  - `getAdminUsers()`
  - `addAdminUser(data)`
  - `updateAdminUser(id, updates)`
  - `deleteAdminUser(id)`
  - `changeUserPassword(id, newPassword)`
  - `resetUserPassword(id, tempPassword)`
- Implement audit log system (`getAuditLogs()`, `logSecurityEvent()`).
- Remove all hardcoded plaintext passwords, fallback backdoors, and trivial sessionStorage bypasses.

### 2. User Management & Privilege Studio Component (`src/components/UserManagementView.tsx`)
- Build a dedicated, responsive management interface within the CMS Studio:
  - User listing table with status, role badges, email, last active timestamp, and privilege summary pills.
  - "Add New User" modal with role preset selection and granular capability toggles.
  - "Edit User & Privileges" modal to adjust specific rights or suspend accounts.
  - "Reset Password" dialog for generating secure credentials.
  - "Audit Log" inspector to view chronological security events.

### 3. Update Administrative Portal View (`src/components/AdminPortalRoute.tsx`)
- Remove hardcoded "Quick Login" buttons with exposed PINs.
- Add lockout countdown timer if brute-force threshold is reached.
- Clean, high-security login form with password visibility toggle and rate limit warnings.
- "Change Password" action directly accessible from the top session banner.

### 4. Wire RBAC into CMS Studio (`src/components/CmsStudioSection.tsx`)
- Add "Team & Privileges" tab to CMS tab list, visible only to users with `canManageUsers`.
- Synchronize authentication with `authService.ts` and eliminate the redundant, insecure inline PIN modal.
- Disable or hide action buttons (Create, Edit, Delete, Toggle Publish, Reset) according to the logged-in administrator's active privileges.

---

## Verification Plan

### Security Verification
- **Security Scan**: Inspect all newly created and modified files for common CWE vulnerabilities (XSS, injection, exposed secrets, missing auth boundaries). Resolve any detected issues immediately.
- **Security Audit**: Audit the implementation against the component's threat model (`## Security Threat Model`). Document all findings, dispositions, and remediations in `walkthrough.md` using the `generate-security-audit-report` skill.

### Manual Verification
1. Verify build with `compile_applet`.
2. Verify that quick-login buttons and exposed PIN strings no longer appear in the UI or codebase.
3. Test login with initial seed credentials (`admin@wanjawrites.africa` / `Wanja@2026!Secure`).
4. Test rate-limiting by entering wrong credentials 5 times and checking lockout notification.
5. Create a new user with custom privileges (e.g. Contributor with no delete permissions).
6. Log in as the new user and verify that restricted actions (e.g. Delete, Manage Users) are disabled or hidden.
7. Test password change and verify audit logging.
