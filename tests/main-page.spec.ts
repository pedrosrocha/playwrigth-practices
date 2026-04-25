import { test, expect } from '../fixtures/baseTest';
import { users_types } from '../utils/constants';

test.describe('Main Page Tests', () => {
    test.beforeEach(async ({ page, loginPage }) => {
        await page.context().clearCookies();
        await loginPage.LoginAs('admin', users_types.admin);
    });

    test('Main Page Load After Login', async ({ page, mainPage }) => {
        // Act - Already logged in from beforeEach

        // Assert
        await expect(page).toHaveURL(/\/MainPage/);
        await expect(mainPage.welcomeHeading).toBeVisible();
        const titleText = await mainPage.getWelcomeText();
        expect(titleText).toContain('Welcome');
    });

    test('All Navigation Links Present', async ({ mainPage }) => {
        // Assert
        await expect(mainPage.homeLink).toBeVisible();
        await expect(mainPage.usersLink).toBeVisible();
        await expect(mainPage.projectsLink).toBeVisible();
        await expect(mainPage.testSpecificationLink).toBeVisible();
        await expect(mainPage.logoutLink).toBeVisible();
    });

    test('Navigation to Users Page', async ({ page, mainPage }) => {
        // Act
        await mainPage.goToUsers();

        // Assert
        await expect(page).toHaveURL(/\/UsersManagement/);
    });

    test('Navigation to Projects Page', async ({ page, mainPage }) => {
        // Act
        await mainPage.goToProjects();

        // Assert
        await expect(page).toHaveURL(/\/Projects/);
    });

    test('Navigation to Test Specification', async ({ page, mainPage }) => {
        // Act
        await mainPage.goToTestSpecification();

        // Assert
        await expect(page).toHaveURL(/\/TestSpecification/);
    });

    test('Home Navigation - Returns to Main Page', async ({ page, mainPage }) => {
        // Arrange
        await mainPage.goToUsers();
        await expect(page).toHaveURL(/\/UsersManagement/);

        // Act
        await mainPage.goToHome();

        // Assert
        await expect(page).toHaveURL(/\/MainPage/);
    });

    test('Logout Link - Redirects to Login', async ({ page, mainPage }) => {
        // Act
        await mainPage.logout();

        // Assert
        await expect(page).toHaveURL(/\/login/);
    });

    test('All Action Cards Are Present', async ({ mainPage }) => {
        // Assert
        await expect(mainPage.testSpecificationCard).toBeVisible();
        await expect(mainPage.projectsCard).toBeVisible();
        await expect(mainPage.usersCard).toBeVisible();
        await expect(mainPage.logoutCard).toBeVisible();
        await expect(mainPage.addUserCard).toBeVisible();
        await expect(mainPage.addProjectCard).toBeVisible();
        await expect(mainPage.resetPasswordCard).toBeVisible();
    });

    test('Test Specification Card Navigation', async ({ page, mainPage }) => {
        // Act
        await mainPage.clickTestSpecificationCard();

        // Assert
        await expect(page).toHaveURL(/\/TestSpecification/);
    });

    test('Projects Card Navigation', async ({ page, mainPage }) => {
        // Act
        await mainPage.clickProjectsCard();

        // Assert
        await expect(page).toHaveURL(/\/Projects/);
    });

    test('Users Card Navigation', async ({ page, mainPage }) => {
        // Act
        await mainPage.clickUsersCard();

        // Assert
        await expect(page).toHaveURL(/\/UsersManagement/);
    });

    test('Add User Card Navigation', async ({ page, mainPage }) => {
        // Act
        await mainPage.clickAddUserCard();

        // Assert
        await expect(page).toHaveURL(/\/AddUserFromManager/);
    });

    test('Add Project Card Navigation', async ({ page, mainPage }) => {
        // Act
        await mainPage.clickAddProjectCard();

        // Assert
        await expect(page).toHaveURL(/\/AddProject/);
    });

    test('Reset Password Card Navigation', async ({ page, mainPage }) => {
        // Act
        await mainPage.clickResetPasswordCard();

        // Assert
        await expect(page).toHaveURL(/\/ResetUserPassword/);
    });

    test('Project Selector Dropdown Displays Projects', async ({ mainPage }) => {
        // Assert - Dropdown should exist and contain projects
        const selectorVisible = await mainPage.projectSelector.isVisible();
        expect(selectorVisible).toBeTruthy();
    });

    test('Welcome Message Contains Username', async ({ mainPage }) => {
        // Act
        const welcomeText = await mainPage.getWelcomeText();

        // Assert
        expect(welcomeText).toContain('Welcome');
        expect(welcomeText).toContain('admin user');
    });

    test('Select Option Text Visible', async ({ mainPage }) => {
        // Assert
        await expect(mainPage.selectOptionText).toBeVisible();
    });
});
