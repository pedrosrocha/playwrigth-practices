import { test, expect } from '../fixtures/baseTest';
import { users_types } from '../utils/constants';

test.describe('Login Tests', () => {
    test('Valid Login - Admin User', async ({ page, loginPage, mainPage }) => {
        // Arrange
        await page.context().clearCookies();

        // Act
        await loginPage.go_to_url();
        await loginPage.LoginAs('admin', users_types.admin);

        // Assert
        await expect(page).toHaveURL(/\/MainPage/);
        await expect(mainPage.welcomeHeading).toBeVisible();
    });

    test('Login Page Elements Display', async ({ page, loginPage }) => {
        // Arrange
        await page.context().clearCookies();

        // Act
        await loginPage.go_to_url();

        // Assert
        await expect(loginPage.loginHeading).toBeVisible();
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.createNewUserLink).toBeVisible();
    });

    test('Create New User Link Navigation', async ({ page, loginPage }) => {
        // Arrange
        await page.context().clearCookies();

        // Act
        await loginPage.go_to_url();
        await loginPage.clickCreateNewUser();

        // Assert
        await expect(page).toHaveURL(/\/AddUser/);
    });

    test('Invalid Username - Login Fails', async ({ page, loginPage }) => {
        // Arrange
        await page.context().clearCookies();

        // Act
        await loginPage.go_to_url();
        await loginPage.fill_username('invalid_user');
        await loginPage.fill_password('admin_password');
        await loginPage.login_button_click();

        // Assert - Should fail and remain on login page or show error
        const currentUrl = page.url();
        const isLoginPage = currentUrl.includes('/login');
        const isMainPage = currentUrl.includes('/MainPage');
        const isError = await page.locator('text=/error|failed|invalid/i').isVisible().catch(() => false);

        expect(isLoginPage || isError || !isMainPage).toBeTruthy();
    });

    test('Invalid Password - Login Fails', async ({ page, loginPage }) => {
        // Arrange
        await page.context().clearCookies();

        // Act
        await loginPage.go_to_url();
        await loginPage.fill_username('admin user');
        await loginPage.fill_password('wrong_password');
        await loginPage.login_button_click();

        // Assert
        const currentUrl = page.url();
        const isLoginPage = currentUrl.includes('/login');
        const isMainPage = currentUrl.includes('/MainPage');
        const isError = await page.locator('text=/error|failed|invalid/i').isVisible().catch(() => false);

        expect(isLoginPage || isError || !isMainPage).toBeTruthy();
    });

    test('Empty Username - Login Prevention', async ({ page, loginPage }) => {
        // Arrange
        await page.context().clearCookies();

        // Act
        await loginPage.go_to_url();
        await loginPage.fill_password('admin_password');
        const usernameBefore = await loginPage.usernameInput.inputValue();
        await loginPage.login_button_click();

        // Assert
        // Should fail or show validation error
        const currentUrl = page.url();
        expect(currentUrl.includes('/login')).toBeTruthy();
    });

    test('Empty Password - Login Prevention', async ({ page, loginPage }) => {
        // Arrange
        await page.context().clearCookies();

        // Act
        await loginPage.go_to_url();
        await loginPage.fill_username('admin user');
        await loginPage.login_button_click();

        // Assert
        const currentUrl = page.url();
        expect(currentUrl.includes('/login')).toBeTruthy();
    });

    test('Login Persistence - Session Maintained', async ({ page, loginPage, mainPage }) => {
        // Arrange
        await page.context().clearCookies();

        // Act
        await loginPage.LoginAs('admin', users_types.admin);
        await expect(page).toHaveURL(/\/MainPage/);

        // Navigate away to Users and back
        await mainPage.goToUsers();
        await page.waitForURL(/\/UsersManagement/);

        // Assert - Still logged in
        const userManagementUrl = page.url();
        expect(userManagementUrl.includes('/UsersManagement')).toBeTruthy();

        // Navigate home
        await mainPage.goToHome();
        await expect(page).toHaveURL(/\/MainPage/);
    });
});
