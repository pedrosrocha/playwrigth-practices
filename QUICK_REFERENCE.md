# Page Objects Quick Reference Guide

## Import Examples

```typescript
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { UsersManagementPage } from './pages/UsersManagementPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TestSpecificationPage } from './pages/TestSpecificationPage';
import { AddUserPage } from './pages/AddUserPage';
import { AddProjectPage } from './pages/AddProjectPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
```

## Usage Examples

### Login Flow
```typescript
const loginPage = new LoginPage(page, 'http://localhost:8080');
await loginPage.login('admin user', 'admin_password');
// Or using credentials type:
await loginPage.LoginAs('Admin User', 'ADMIN');
```

### Navigate Between Pages
```typescript
const mainPage = new MainPage(page, 'http://localhost:8080');
await mainPage.goToUsers();      // Navigate to users page
await mainPage.goToProjects();   // Navigate to projects page
await mainPage.goToTestSpecification(); // Navigate to test spec
```

### Manage Users
```typescript
const usersPage = new UsersManagementPage(page, 'http://localhost:8080');
const users = await usersPage.getProjectNames(); // Get all users
await usersPage.changeUserLevel('admin user', 'Admin');
await usersPage.resetUserPassword('testuser');
await usersPage.deleteUser('olduser');
```

### Manage Projects
```typescript
const projectsPage = new ProjectsPage(page, 'http://localhost:8080');
const projects = await projectsPage.getProjectNames();
await projectsPage.openProject('TO DO list');
await projectsPage.deleteProject('old-project');
const count = await projectsPage.getProjectsCount();
```

### Create New User
```typescript
const addUserPage = new AddUserPage(page, 'http://localhost:8080');
await addUserPage.addNewUser('newuser', 'newuser@example.com', 'password123');
// Or step by step:
await addUserPage.fillUsername('testuser');
await addUserPage.fillEmail('test@example.com');
await addUserPage.fillPassword('testpass');
await addUserPage.clickAdd();
```

### Create New Project
```typescript
const addProjectPage = new AddProjectPage(page, 'http://localhost:8080');
await addProjectPage.addNewProject(
    'New Project',
    '2026-03-01',
    '2026-03-31',
    'Project description'
);
```

### Reset User Password
```typescript
const resetPage = new ResetPasswordPage(page, 'http://localhost:8080', 'admin user');
await resetPage.resetPassword('newPassword123');
```

### Test Specification Navigation
```typescript
const testSpecPage = new TestSpecificationPage(page, 'http://localhost:8080');
await testSpecPage.selectProjectInTree('TO DO list');
const items = await testSpecPage.getTreeItems();
```

## Common Navigation Methods (All Pages)

All pages (except LoginPage and ResetPasswordPage) include:
- `goToHome()` - Navigate to Main Page
- `goToUsers()` - Navigate to Users Management
- `goToProjects()` - Navigate to Projects
- `goToTestSpecification()` - Navigate to Test Specification
- `logout()` - Logout the current user

## Assertion Examples

```typescript
// Verify page elements
await expect(loginPage.loginButton).toBeVisible();
await expect(mainPage.welcomeHeading).toContainText('Welcome');

// Verify user exists
const exists = await usersPage.verifyUserExists('admin user');
expect(exists).toBeTruthy();

// Verify project exists
const projectExists = await projectsPage.verifyProjectExists('TO DO list');
expect(projectExists).toBeTruthy();

// Get data for assertions
const email = await usersPage.getUserEmail('admin user');
const status = await projectsPage.getProjectStatus('TO DO list');
```

## Test Structure Example

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { UsersManagementPage } from './pages/UsersManagementPage';

test('Create and verify new user', async ({ page }) => {
    // Login
    const loginPage = new LoginPage(page, 'http://localhost:8080');
    await loginPage.login('admin user', 'admin_password');

    // Navigate to users
    const mainPage = new MainPage(page, 'http://localhost:8080');
    await mainPage.goToUsers();

    // Verify users page
    const usersPage = new UsersManagementPage(page, 'http://localhost:8080');
    const count = await usersPage.getUsersCount();
    expect(count).toBeGreaterThan(0);
});
```

## Project URL Structure

| Page | URL |
|------|-----|
| Login | `/login` |
| Main | `/MainPage` |
| Users | `/UsersManagement` |
| Projects | `/Projects` |
| Test Specification | `/TestSpecification` |
| Add User | `/AddUserFromManager` |
| Add Project | `/AddProject` |
| Reset Password | `/ResetUserPassword/{username}` |

## Locator Best Practices Used

1. **Semantic Role Locators**: Uses `getByRole()` for accessibility
2. **Placeholder Locators**: Uses `getByPlaceholder()` for form inputs
3. **Text Content**: Uses named locators for readability
4. **CSS Selectors**: Fallback for complex elements

## Notes

- All page objects use TypeScript with strict typing
- Steps are decorated with `@step()` for test reporting
- Locators follow Playwright best practices (getByRole preferred)
- Navigation is consistent across all pages
- Form methods support both individual field filling and bulk operations
