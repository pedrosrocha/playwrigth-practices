import { test, expect } from '../fixtures/baseTest';
import { users_types } from '../utils/constants';

test.describe('Users Management Tests', () => {
    test.beforeEach(async ({ page, loginPage, usersManagementPage }) => {
        await page.context().clearCookies();
        await loginPage.LoginAs('admin', users_types.admin);
        await usersManagementPage.go_to_url();
    });

    test('Users Page Loads Successfully', async ({ page, usersManagementPage }) => {
        // Assert
        await expect(page).toHaveURL(/\/UsersManagement/);
        await expect(usersManagementPage.pageTitle).toBeVisible();
    });

    test('Users Table Headers Display', async ({ usersManagementPage }) => {
        // Assert
        await expect(usersManagementPage.usernameHeader).toBeVisible();
        await expect(usersManagementPage.emailHeader).toBeVisible();
        await expect(usersManagementPage.userLevelHeader).toBeVisible();
        await expect(usersManagementPage.actionsHeader).toBeVisible();
    });

    test('Users List Displays in Table', async ({ usersManagementPage }) => {
        // Act
        const users = await usersManagementPage.verifyUserExists('admin user');

        // Assert
        expect(users).toBeTruthy();
    });

    test('Get Users Count', async ({ usersManagementPage }) => {
        // Act
        const userCount = await usersManagementPage.getUsersCount();

        // Assert
        expect(userCount).toBeGreaterThan(0);
    });

    test('Get User Email from Table', async ({ usersManagementPage }) => {
        // Act
        const email = await usersManagementPage.getUserEmail('admin user');

        // Assert
        expect(email).toBeTruthy();
        expect(email).toContain('@');
    });

    test('Get User Level from Table', async ({ usersManagementPage }) => {
        // Act
        const level = await usersManagementPage.getUserLevel('admin user');

        // Assert
        expect(level).toBeTruthy();
        // Should be one of the expected levels
        const validLevels = ['Admin', 'Editor', 'Viewer'];
        const levelText = level?.trim() || '';
        expect(validLevels.some(l => levelText.includes(l))).toBeTruthy();
    });

    test('New User Link Navigation', async ({ page, usersManagementPage }) => {
        // Act
        await usersManagementPage.clickNewUser();

        // Assert
        await expect(page).toHaveURL(/\/AddUserFromManager/);
    });

    test('Verify Admin User Exists', async ({ usersManagementPage }) => {
        // Act
        const exists = await usersManagementPage.verifyUserExists('admin user');

        // Assert
        expect(exists).toBeTruthy();
    });

    test('User Details Consistency', async ({ usersManagementPage }) => {
        // Act
        const email = await usersManagementPage.getUserEmail('admin user');
        const level = await usersManagementPage.getUserLevel('admin user');
        const exists = await usersManagementPage.verifyUserExists('admin user');

        // Assert
        expect(exists).toBeTruthy();
        expect(email).toBeTruthy();
        expect(level).toBeTruthy();
    });

    test('Users Page Navigation Links', async ({ page, usersManagementPage }) => {
        // Act
        await usersManagementPage.goToHome();

        // Assert
        await expect(page).toHaveURL(/\/MainPage/);
    });

    test('Logout from Users Page', async ({ page, usersManagementPage }) => {
        // Act
        await usersManagementPage.logout();

        // Assert
        await expect(page).toHaveURL(/\/login/);
    });

    test('Users Page Title Display', async ({ usersManagementPage }) => {
        // Assert
        await expect(usersManagementPage.pageTitle).toBeVisible();
        const titleText = await usersManagementPage.pageTitle.textContent();
        expect(titleText).toContain('User Management');
    });
});
