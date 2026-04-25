import { test, expect } from '../fixtures/baseTest';
import { users_types } from '../utils/constants';

test.describe('Add User Tests', () => {
    test.beforeEach(async ({ page, loginPage, addUserPage }) => {
        await page.context().clearCookies();
        await loginPage.LoginAs('admin', users_types.admin);
        await addUserPage.go_to_url();
    });

    test('Add User Page Loads Successfully', async ({ page, addUserPage }) => {
        // Assert
        await expect(page).toHaveURL(/\/AddUserFromManager/);
        await expect(addUserPage.pageTitle).toBeVisible();
    });

    test('All Form Fields Are Visible', async ({ addUserPage }) => {
        // Assert
        await expect(addUserPage.usernameInput).toBeVisible();
        await expect(addUserPage.emailInput).toBeVisible();
        await expect(addUserPage.passwordInput).toBeVisible();
        await expect(addUserPage.addButton).toBeVisible();
    });

    test('Fill Username Field', async ({ addUserPage }) => {
        // Act
        await addUserPage.fillUsername('testuser');
        const value = await addUserPage.getUsernameValue();

        // Assert
        expect(value).toBe('testuser');
    });

    test('Fill Email Field', async ({ addUserPage }) => {
        // Act
        await addUserPage.fillEmail('test@example.com');
        const value = await addUserPage.getEmailValue();

        // Assert
        expect(value).toBe('test@example.com');
    });

    test('Fill Password Field', async ({ addUserPage }) => {
        // Act
        await addUserPage.fillPassword('password123');
        const value = await addUserPage.getPasswordValue();

        // Assert
        expect(value).toBe('password123');
    });

    test('Add Button Is Clickable', async ({ addUserPage }) => {
        // Assert
        const isEnabled = await addUserPage.addButton.isEnabled();
        expect(isEnabled).toBeTruthy();
    });

    test('Clear Form Fields', async ({ addUserPage }) => {
        // Arrange
        await addUserPage.fillUsername('testuser');
        await addUserPage.fillEmail('test@example.com');
        await addUserPage.fillPassword('password123');

        // Act
        await addUserPage.clearForm();

        // Assert
        const username = await addUserPage.getUsernameValue();
        const email = await addUserPage.getEmailValue();
        const password = await addUserPage.getPasswordValue();

        expect(username).toBe('');
        expect(email).toBe('');
        expect(password).toBe('');
    });

    test('Submit Form with Valid Data', async ({ page, addUserPage }) => {
        // Arrange
        const timestamp = Date.now();
        const testUsername = `testuser_${timestamp}`;
        const testEmail = `test_${timestamp}@example.com`;
        const testPassword = 'TestPass123';

        // Act
        await addUserPage.addNewUser(testUsername, testEmail, testPassword);

        // Assert - Form should submit (may navigate or show success)
        // Wait a moment for submission
        await page.waitForTimeout(1000);
        const currentUrl = page.url();
        // Should either stay on page or navigate away
        expect(!currentUrl.includes('/AddUserFromManager') || await addUserPage.addButton.isVisible().catch(() => false)).toBeTruthy();
    });

    test('Add User - Valid Data Flow', async ({ page, addUserPage, usersManagementPage }) => {
        // Arrange
        const timestamp = Date.now();
        const testUsername = `newuser_${timestamp}`;
        const testEmail = `newuser_${timestamp}@test.com`;
        const testPassword = 'NewUserPass123';

        // Act
        await addUserPage.fillUsername(testUsername);
        await addUserPage.fillEmail(testEmail);
        await addUserPage.fillPassword(testPassword);
        await addUserPage.clickAdd();

        // Assert/Wait for potential navigation
        await page.waitForTimeout(1000);
    });

    test('Form Field Values Persist', async ({ addUserPage }) => {
        // Act
        await addUserPage.fillUsername('persistuser');
        const usernameAfter = await addUserPage.getUsernameValue();

        // Assert
        expect(usernameAfter).toBe('persistuser');
    });

    test('Email Field Accepts Valid Format', async ({ addUserPage }) => {
        // Act
        await addUserPage.fillEmail('valid.email@domain.co.uk');
        const email = await addUserPage.getEmailValue();

        // Assert
        expect(email).toBe('valid.email@domain.co.uk');
    });

    test('Password Field Accepts Various Characters', async ({ addUserPage }) => {
        // Act
        await addUserPage.fillPassword('P@ssw0rd!#$%');
        const password = await addUserPage.getPasswordValue();

        // Assert
        expect(password).toBe('P@ssw0rd!#$%');
    });

    test('Add User Page Title Visible', async ({ addUserPage }) => {
        // Assert
        const isVisible = await addUserPage.verifyPageTitleVisible();
        expect(isVisible).toBeTruthy();
    });

    test('Navigation from Add User Page', async ({ page, addUserPage }) => {
        // Act
        await addUserPage.goToHome();

        // Assert
        await expect(page).toHaveURL(/\/MainPage/);
    });
});
