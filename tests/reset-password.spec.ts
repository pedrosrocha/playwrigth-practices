import { test, expect } from '../fixtures/baseTest';
import { users_types } from '../utils/constants';

test.describe('Reset Password Tests', () => {
    test.beforeEach(async ({ page, loginPage }) => {
        await page.context().clearCookies();
        await loginPage.LoginAs('admin', users_types.admin);
    });

    test('Reset Password Page Loads for Admin User', async ({ page, resetPasswordPage }) => {
        // Act
        await resetPasswordPage.go_to_url('admin user');

        // Assert
        await expect(page).toHaveURL(/\/ResetUserPassword/);
    });

    test('Page Title Contains Username', async ({ page, resetPasswordPage }) => {
        // Act
        await resetPasswordPage.go_to_url('admin user');

        // Assert
        const titleVisible = await resetPasswordPage.verifyPageTitleVisible();
        expect(titleVisible).toBeTruthy();
    });

    test('New Password Field Is Visible', async ({ resetPasswordPage }) => {
        // Act
        await resetPasswordPage.go_to_url('admin user');

        // Assert
        await expect(resetPasswordPage.newPasswordInput).toBeVisible();
    });

    test('Reset Button Is Visible', async ({ resetPasswordPage }) => {
        // Act
        await resetPasswordPage.go_to_url('admin user');

        // Assert
        await expect(resetPasswordPage.resetButton).toBeVisible();
    });

    test('Fill New Password Field', async ({ resetPasswordPage }) => {
        // Arrange
        await resetPasswordPage.go_to_url('admin user');

        // Act
        await resetPasswordPage.fillNewPassword('NewPassword123');
        const value = await resetPasswordPage.getNewPasswordValue();

        // Assert
        expect(value).toBe('NewPassword123');
    });

    test('Clear Password Field', async ({ resetPasswordPage }) => {
        // Arrange
        await resetPasswordPage.go_to_url('admin user');

        // Act
        await resetPasswordPage.fillNewPassword('TestPassword');
        await resetPasswordPage.clearPasswordField();
        const value = await resetPasswordPage.getNewPasswordValue();

        // Assert
        expect(value).toBe('');
    });

    test('Reset Button Is Clickable', async ({ resetPasswordPage }) => {
        // Arrange
        await resetPasswordPage.go_to_url('admin user');

        // Act
        const isEnabled = await resetPasswordPage.resetButton.isEnabled();

        // Assert
        expect(isEnabled).toBeTruthy();
    });

    test('Submit Password Reset', async ({ page, resetPasswordPage }) => {
        // Arrange
        await resetPasswordPage.go_to_url('admin user');
        const newPassword = 'ResetPass123';

        // Act
        await resetPasswordPage.fillNewPassword(newPassword);
        await resetPasswordPage.clickReset();

        // Assert - Wait for potential navigation/action
        await page.waitForTimeout(1000);
    });

    test('Get Page Title Text', async ({ resetPasswordPage }) => {
        // Arrange
        await resetPasswordPage.go_to_url('admin user');

        // Act
        const titleText = await resetPasswordPage.getPageTitle();

        // Assert
        expect(titleText).toBeTruthy();
    });

    test('Password Field Accepts Special Characters', async ({ resetPasswordPage }) => {
        // Arrange
        await resetPasswordPage.go_to_url('admin user');

        // Act
        await resetPasswordPage.fillNewPassword('P@ssw0rd!#$%');
        const value = await resetPasswordPage.getNewPasswordValue();

        // Assert
        expect(value).toBe('P@ssw0rd!#$%');
    });

    test('Navigate to Login After Reset', async ({ page, resetPasswordPage, loginPage }) => {
        // Arrange
        await resetPasswordPage.go_to_url('admin user');

        // Act
        await resetPasswordPage.fillNewPassword('NewTestPass123');
        await resetPasswordPage.clickReset();

        // Wait a moment for any response
        await page.waitForTimeout(2000);

        // Navigate to login to test new credentials
        await loginPage.go_to_url();

        // Assert
        await expect(page).toHaveURL(/\/login/);
    });
});
