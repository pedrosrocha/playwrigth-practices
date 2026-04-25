# Test Automation Page Objects Summary

## Project: Testlink Clone Application
**Base URL:** http://localhost:8080
**Credentials Used:**
- Username: `admin user`
- Password: `admin_password`

## Generated Page Objects

### 1. LoginPage.ts
**URL:** `/login`
**Locators:**
- `usernameInput` - Textbox for username entry
- `passwordInput` - Textbox for password entry
- `loginButton` - Login button
- `loginHeading` - Login page heading
- `createNewUserLink` - Link to create new user

**Methods:**
- `go_to_url()` - Navigate to login page
- `fill_username(username)` - Fill username field
- `fill_password(password)` - Fill password field
- `login_button_click()` - Click login button
- `login(username, password)` - Complete login flow
- `LoginAs(user_description, user)` - Login with user type
- `clickCreateNewUser()` - Navigate to create new user
- `verifyLoginPageDisplayed()` - Verify login page is visible

---

### 2. MainPage.ts
**URL:** `/MainPage`
**Navigation Locators:**
- `homeLink` - Home navigation link
- `logoutLink` - Logout navigation link
- `usersLink` - Users navigation link
- `projectsLink` - Projects navigation link
- `testSpecificationLink` - Test Specification navigation link
- `projectSelector` - Project dropdown selector

**Page Content Locators:**
- `welcomeHeading` - Welcome heading
- `selectOptionText` - Selection instruction text
- `testSpecificationCard` - Test Specification card
- `projectsCard` - Projects card
- `usersCard` - Users card
- `logoutCard` - Logout card
- `addUserCard` - Add user card
- `addProjectCard` - Add project card
- `resetPasswordCard` - Reset password card

**Methods:**
- `go_to_url()` - Navigate to main page
- `goToHome()` - Click home link
- `goToUsers()` - Navigate to users page
- `goToProjects()` - Navigate to projects page
- `goToTestSpecification()` - Navigate to test specification
- `selectProject(projectName)` - Select project from dropdown
- `clickTestSpecificationCard()` - Click test specification card
- `clickProjectsCard()` - Click projects card
- `clickUsersCard()` - Click users card
- `clickLogoutCard()` - Click logout card
- `clickAddUserCard()` - Click add user card
- `clickAddProjectCard()` - Click add project card
- `clickResetPasswordCard()` - Click reset password card
- `logout()` - Logout user
- `verifyWelcomeMessage()` - Verify welcome message visible
- `getWelcomeText()` - Get welcome text content

---

### 3. UsersManagementPage.ts
**URL:** `/UsersManagement`
**Navigation Locators:**
- `homeLink` - Home navigation link
- `logoutLink` - Logout navigation link
- `usersLink` - Users navigation link
- `projectsLink` - Projects navigation link
- `testSpecificationLink` - Test Specification navigation link

**Page Content Locators:**
- `pageTitle` - "User Management System" heading
- `usersTableHeading` - "Users:" heading
- `usersTable` - Users data table
- `newUserLink` - New User link
- `usernameHeader` - Username column header
- `emailHeader` - Email column header
- `userLevelHeader` - User Level column header
- `actionsHeader` - Actions column header

**Methods:**
- `go_to_url()` - Navigate to users management page
- `goToHome()` - Click home link
- `goToProjects()` - Navigate to projects
- `goToTestSpecification()` - Navigate to test specification
- `logout()` - Logout user
- `clickNewUser()` - Click new user button
- `deleteUser(username)` - Delete user by username
- `resetUserPassword(username)` - Reset password for user
- `changeUserLevel(username, level)` - Change user permission level
- `getUserEmail(username)` - Get user email from table
- `getUserLevel(username)` - Get user level from table
- `verifyUserExists(username)` - Verify user exists in table
- `getUsersCount()` - Get total users count

---

### 4. ProjectsPage.ts
**URL:** `/Projects`
**Navigation Locators:**
- `homeLink` - Home navigation link
- `logoutLink` - Logout navigation link
- `usersLink` - Users navigation link
- `projectsLink` - Projects navigation link
- `testSpecificationLink` - Test Specification navigation link

**Page Content Locators:**
- `pageTitle` - "Project Management System" heading
- `projectsTableHeading` - "Projects:" heading
- `newProjectLink` - New Project link
- `projectsTable` - Projects data table
- `tableRows` - Table rows

**Table Header Locators:**
- `nameHeader` - Name column
- `statusHeader` - Status column
- `ownerHeader` - Owner column
- `startDateHeader` - Start Date column
- `endDateHeader` - End Date column
- `createdAtHeader` - Created At column
- `updatedAtHeader` - Updated At column
- `actionsHeader` - Actions column

**Methods:**
- `go_to_url()` - Navigate to projects page
- `goToHome()` - Click home link
- `goToUsers()` - Navigate to users page
- `goToTestSpecification()` - Navigate to test specification
- `logout()` - Logout user
- `clickNewProject()` - Click new project button
- `getProjectNames()` - Get all project names from table
- `openProject(name)` - Open project by name
- `deleteProject(name)` - Delete project by name
- `getProjectsCount()` - Get total projects count
- `getProjectStatus(name)` - Get project status by name
- `getProjectOwner(name)` - Get project owner by name
- `verifyProjectExists(name)` - Verify project exists

---

### 5. TestSpecificationPage.ts
**URL:** `/TestSpecification`
**Navigation Locators:**
- `homeLink` - Home navigation link
- `logoutLink` - Logout navigation link
- `usersLink` - Users navigation link
- `projectsLink` - Projects navigation link
- `testSpecificationLink` - Test Specification navigation link

**Page Content Locators:**
- `pageTitle` - Page title banner
- `projectDetailsHeading` - "Project Details" heading
- `selectPromptText` - Selection instruction text
- `projectTree` - Project tree component

**Methods:**
- `go_to_url()` - Navigate to test specification page
- `goToHome()` - Click home link
- `goToUsers()` - Navigate to users page
- `goToProjects()` - Navigate to projects
- `logout()` - Logout user
- `selectProjectInTree(projectName)` - Select project in tree view
- `expandProject(projectName)` - Expand project in tree
- `getTreeItems()` - Get all visible tree items
- `verifyProjectDetailsVisible()` - Verify project details section
- `verifyTreePresent()` - Verify tree component present

---

### 6. AddUserPage.ts
**URL:** `/AddUserFromManager`
**Navigation Locators:**
- `homeLink` - Home navigation link
- `logoutLink` - Logout navigation link
- `usersLink` - Users navigation link
- `projectsLink` - Projects navigation link
- `testSpecificationLink` - Test Specification navigation link

**Form Locators:**
- `pageTitle` - "Add New User" heading
- `usernameInput` - Username text input
- `emailInput` - Email text input
- `passwordInput` - Password text input
- `addButton` - Add button

**Methods:**
- `go_to_url()` - Navigate to add user page
- `goToHome()` - Click home link
- `goToUsers()` - Navigate to users page
- `goToProjects()` - Navigate to projects
- `logout()` - Logout user
- `fillUsername(username)` - Fill username field
- `fillEmail(email)` - Fill email field
- `fillPassword(password)` - Fill password field
- `clickAdd()` - Click add button
- `addNewUser(username, email, password)` - Complete add user flow
- `getUsernameValue()` - Get username input value
- `getEmailValue()` - Get email input value
- `getPasswordValue()` - Get password input value
- `clearForm()` - Clear all form fields
- `verifyPageTitleVisible()` - Verify page title visible

---

### 7. AddProjectPage.ts
**URL:** `/AddProject`
**Navigation Locators:**
- `homeLink` - Home navigation link
- `logoutLink` - Logout navigation link
- `usersLink` - Users navigation link
- `projectsLink` - Projects navigation link
- `testSpecificationLink` - Test Specification navigation link

**Form Locators:**
- `pageTitle` - "Add New Project" heading
- `projectNameInput` - Project name text input
- `startDateInput` - Start date input
- `endDateInput` - End date input
- `descriptionInput` - Description textarea
- `addProjectButton` - Add Project button

**Methods:**
- `go_to_url()` - Navigate to add project page
- `goToHome()` - Click home link
- `goToUsers()` - Navigate to users page
- `goToProjects()` - Navigate to projects
- `logout()` - Logout user
- `fillProjectName(name)` - Fill project name
- `fillStartDate(date)` - Fill start date
- `fillEndDate(date)` - Fill end date
- `fillDescription(description)` - Fill description
- `clickAddProject()` - Click add project button
- `addNewProject(name, startDate, endDate, description)` - Complete add project flow
- `getProjectNameValue()` - Get project name input value
- `getStartDateValue()` - Get start date input value
- `getEndDateValue()` - Get end date input value
- `getDescriptionValue()` - Get description input value
- `clearForm()` - Clear all form fields
- `verifyPageTitleVisible()` - Verify page title visible

---

### 8. ResetPasswordPage.ts
**URL:** `/ResetUserPassword/{username}`
**Form Locators:**
- `pageTitle` - Page title heading
- `newPasswordInput` - New password text input
- `resetButton` - Reset button

**Methods:**
- `go_to_url(username)` - Navigate to reset password page
- `fillNewPassword(password)` - Fill new password field
- `clickReset()` - Click reset button
- `resetPassword(password)` - Complete reset password flow
- `getNewPasswordValue()` - Get password input value
- `clearPasswordField()` - Clear password field
- `verifyPageTitleContainsUsername(username)` - Verify page title contains username
- `verifyPageTitleVisible()` - Verify page title visible
- `getPageTitle()` - Get page title text

---

## Page Object Structure

All page objects follow a consistent pattern:
1. **Locators** - Declared as readonly properties using Playwright's getByRole, getByPlaceholder, locator methods
2. **Constructor** - Initializes all locators with proper selectors
3. **Methods** - Decorated with `@step` decorator for test reporting
4. **Step Pattern** - Methods group related actions (e.g., `login()` method handles multiple steps)
5. **Reusability** - Navigation methods are consistent across all pages for cross-page navigation

## Navigation Flow

```
Login Page → Main Page → {Users | Projects | Test Specification}
           → Add User / Add Project / Reset Password
```

## Locator Strategy

- **Primary:** `getByRole()` - Accessible element identification
- **Secondary:** `getByPlaceholder()` - Input field identification
- **Tertiary:** `locator()` - CSS/XPath selectors for complex elements

All locators are designed with accessibility in mind and follow Playwright best practices.
