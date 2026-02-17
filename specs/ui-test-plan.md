# UI Test Plan

## Application Overview

Application: Testlink clone (Main dashboard, Projects, Users, Test Specification). This plan covers UI functional flows, validations, role-based access, navigation, and error handling. Assumptions: tests start from a fresh browser state (clear cookies/context), app baseURL is http://localhost:8080, fixtures expose `loginPage` and `dashboardPage`. Success criteria are explicit for each scenario; tests are independent and can run in any order.

## Test Scenarios

### 1. UI Functional Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login - Happy Path

**File:** `tests/login-success.spec.ts`

**Steps:**
  1. Assumption: fresh browser context (clear cookies).
  2. 1. Navigate to the app base URL.
  3. 2. Open the Login page if not on it.
  4. 3. Enter valid admin credentials (use test user from constants).
  5. 4. Click the `Login` button.
  6. 5. Wait for navigation to the Dashboard/MainPage and for the `Welcome, {username}` heading to appear.

**Expected Results:**
  - User is authenticated and redirected to the Dashboard (`/MainPage`).
  - Heading `Welcome, {username}` is visible and nav shows `Logout`, `Projects`, `Users`, `Test Specification`.
  - No error messages shown.

#### 1.2. Login - Invalid Credentials

**File:** `tests/login-invalid.spec.ts`

**Steps:**
  1. Assumption: fresh browser context.
  2. 1. Navigate to the Login page.
  3. 2. Enter an invalid username and/or password.
  4. 3. Click `Login`.
  5. 4. Observe inline validation and toast/error area.

**Expected Results:**
  - Login is rejected and a clear error message is displayed (e.g., "Invalid credentials").
  - User remains on Login page.
  - No authenticated-only elements are visible.

#### 1.3. Login - Required Fields Validation

**File:** `tests/login-validation.spec.ts`

**Steps:**
  1. 1. Navigate to Login page with fresh context.
  2. 2. Attempt to submit the login form with empty username and/or password.
  3. 3. Verify client-side validation messages and that submit is prevented.

**Expected Results:**
  - Each empty required field shows an inline validation message.
  - Form is not submitted and no network request for authentication is sent.

#### 1.4. Password Reset Flow

**File:** `tests/password-reset.spec.ts`

**Steps:**
  1. Assumption: starting from Dashboard or MainPage for an authenticated admin (or use `Reset Password` card link directly for known user).
  2. 1. From Dashboard click the `Reset Password` card/link for `admin user`.
  3. 2. Confirm any confirmation prompt if present.
  4. 3. Observe success notification or redirected status that password reset was triggered.

**Expected Results:**
  - Reset action completes successfully and UI shows a confirmation message (or redirects to a success page).
  - No error state shown.

#### 1.5. Logout

**File:** `tests/logout.spec.ts`

**Steps:**
  1. 1. Log in as a valid user (or start from seed where user is logged in).
  2. 2. Click the `Logout` nav link or `Logout` card.
  3. 3. Wait for redirection to the Login page or unauthenticated landing.
  4. 4. Attempt to access a protected URL (e.g., `/Projects`) after logout.

**Expected Results:**
  - User is redirected to Login and authenticated-only nav items are no longer visible.
  - Accessing protected URL redirects back to Login (or shows unauthorized).

#### 1.6. Navigation - Projects Card

**File:** `tests/navigation-projects.spec.ts`

**Steps:**
  1. 1. From a fresh authenticated Dashboard, click the `Projects` card or nav link.
  2. 2. Verify navigation to `/Projects` and that the projects list or an empty-state appears.
  3. 3. Check for `Add project` CTA presence if user has permission.

**Expected Results:**
  - Projects page loads with a visible list or an empty-state and relevant filters/search.
  - `Add project` link is visible for admin users.

#### 1.7. Add Project - Create New Project

**File:** `tests/add-project.spec.ts`

**Steps:**
  1. Assumption: admin user logged in and on `/AddProject` or use `Add project` CTA.
  2. 1. Click `Add project` and fill required fields (name, identifier, description minimal set).
  3. 2. Submit the form.
  4. 3. Wait for success notification and then navigate to `/Projects` to confirm the new entry appears in the list.

**Expected Results:**
  - New project is created and visible in the Projects list with correct details.
  - Form validation prevents submission on missing required fields.

#### 1.8. Users Management - Add User

**File:** `tests/add-user.spec.ts`

**Steps:**
  1. Assumption: admin user logged in and on `/AddUserFromManager` or via `Users` page CTA.
  2. 1. Navigate to `Users` > `Add user`.
  3. 2. Fill new user details (username, email, role), set role to `standard` or `manager`.
  4. 3. Submit and verify success notification and that the new user appears in the users list.

**Expected Results:**
  - User creation succeeds and new entry appears in `Users` listing.
  - Role assignment matches selection.

#### 1.9. Role-Based Access - Standard User Restrictions

**File:** `tests/role-restrictions.spec.ts`

**Steps:**
  1. 1. Create or use a `standard` user account (via API or Admin UI).
  2. 2. Log in as the `standard` user in a fresh context.
  3. 3. Verify Dashboard layout for this role and check for absence of admin-only CTAs like `Add project` and `Add user`.
  4. 4. Attempt to open an admin route (e.g., `/AddProject`) directly via URL.

**Expected Results:**
  - Standard user does not see `Add project`/`Add user` CTAs.
  - Direct access to admin routes is blocked (unauthorized or redirected).

#### 1.10. Dashboard UI Elements Presence

**File:** `tests/dashboard-elements.spec.ts`

**Steps:**
  1. Assumption: authenticated Dashboard view.
  2. 1. Verify primary nav contains links: `Home`, `Projects`, `Users`, `Test Specification`, `Logout`.
  3. 2. Verify presence of feature cards: `Test Specification`, `Projects`, `Users`, `Logout`, `Add user`, `Add project`, `Reset Password`.
  4. 3. Validate that each card's heading and short description text match expectations and link targets resolve to the correct URLs.

**Expected Results:**
  - All expected nav items and cards are present and link to correct routes.
  - Headings and descriptions are readable and accessible (aria and semantic headings).

#### 1.11. Session Persistence

**File:** `tests/session-persistence.spec.ts`

**Steps:**
  1. 1. Log in as a valid user in a browser context.
  2. 2. Close the page/tab within the same browser context and reopen the app URL.
  3. 3. Alternatively, create a new page using the same browser context and navigate to baseURL.
  4. 4. Verify whether the user remains authenticated (depends on app auth design).

**Expected Results:**
  - If session persistence is intended: user remains logged in and Dashboard is shown.
  - If session cookies/session storage cleared: user must reauthenticate. Test asserts whichever behaviour is expected in product spec.

#### 1.12. Error Handling - Backend Failure

**File:** `tests/error-handling.spec.ts`

**Steps:**
  1. 1. Start with a fresh context and navigate to Dashboard or Projects.
  2. 2. Intercept the network requests for critical endpoints (e.g., projects list) and return a 500 response.
  3. 3. Observe UI behaviour and messages for the failed request.
  4. 4. Restore normal responses and verify recovery (refresh or retry).

**Expected Results:**
  - App shows a clear, user-friendly error message or empty-state with retry option.
  - App does not crash; subsequent retries or restored responses recover the UI.
