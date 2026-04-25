import { test, expect } from '../fixtures/baseTest';
import { users_types } from '../utils/constants';

test.describe('Cross-Page Navigation Tests', () => {
    test('Navigation Flow: Login → Main Page', async ({ page, loginPage, mainPage }) => {
        // Arrange
        await page.context().clearCookies();

        // Act
        await loginPage.LoginAs('admin', users_types.admin);

        // Assert
        await expect(page).toHaveURL(/\/MainPage/);
        await expect(mainPage.welcomeHeading).toBeVisible();
    });

    test('Navigation Flow: Main → Users → Home', async ({ page, loginPage, mainPage, usersManagementPage }) => {
        // Arrange
        await page.context().clearCookies();
        await loginPage.LoginAs('admin', users_types.admin);

        // Act - Navigate to Users
        await mainPage.goToUsers();

        // Assert
        await expect(page).toHaveURL(/\/UsersManagement/);
        await expect(usersManagementPage.pageTitle).toBeVisible();

        // Act - Navigate back home
        await usersManagementPage.goToHome();

        // Assert
        await expect(page).toHaveURL(/\/MainPage/);
    });

    test('Navigation Flow: Main → Projects → Home', async ({ page, loginPage, mainPage, projectsPage }) => {
        // Arrange
        await page.context().clearCookies();
        await loginPage.LoginAs('admin', users_types.admin);

        // Act - Navigate to Projects
        await mainPage.goToProjects();

        // Assert
        await expect(page).toHaveURL(/\/Projects/);
        await expect(projectsPage.pageTitle).toBeVisible();

        // Act - Navigate back home
        await projectsPage.goToHome();

        // Assert
        await expect(page).toHaveURL(/\/MainPage/);
    });

    test('Navigation Flow: Main → Test Specification → Home', async ({ page, loginPage, mainPage, testSpecificationPage }) => {
        // Arrange
        await page.context().clearCookies();
        await loginPage.LoginAs('admin', users_types.admin);

        // Act - Navigate to Test Specification
        await mainPage.goToTestSpecification();

        // Assert
        await expect(page).toHaveURL(/\/TestSpecification/);

        // Act - Navigate back home
        await testSpecificationPage.goToHome();

        // Assert
        await expect(page).toHaveURL(/\/MainPage/);
    });

    test('Logout from Any Page - Users Management', async ({ page, loginPage, mainPage, usersManagementPage }) => {
        // Arrange
        await page.context().clearCookies();
        await loginPage.LoginAs('admin', users_types.admin);
        await mainPage.goToUsers();

        // Act
        await usersManagementPage.logout();

        // Assert
        await expect(page).toHaveURL(/\/login/);
    });

    test('Home Link Returns to Main Page from Any Page', async ({ page, loginPage, mainPage }) => {
        // Arrange
        await page.context().clearCookies();
        await loginPage.LoginAs('admin', users_types.admin);

        // Navigate to Users
        await mainPage.goToUsers();
        await expect(page).toHaveURL(/\/UsersManagement/);

        // Act - Click Home
        await mainPage.goToHome();

        // Assert
        await expect(page).toHaveURL(/\/MainPage/);
    });

    test('Complex Navigation Sequence: Users → Projects → Add User → Home', async ({ page, loginPage, mainPage, usersManagementPage, projectsPage, addUserPage }) => {
        // Arrange
        await page.context().clearCookies();
        await loginPage.LoginAs('admin', users_types.admin);

        // Act - Navigate to Users
        await mainPage.goToUsers();
        await expect(page).toHaveURL(/\/UsersManagement/);

        // Act - Navigate to Projects
        await usersManagementPage.goToProjects();
        await expect(page).toHaveURL(/\/Projects/);

        // Act - Navigate to Add User
        await mainPage.goToHome();
        await mainPage.clickAddUserCard();
        await expect(page).toHaveURL(/\/AddUserFromManager/);

        // Act - Navigate back home
        await addUserPage.goToHome();

        // Assert
        await expect(page).toHaveURL(/\/MainPage/);
    });
});
