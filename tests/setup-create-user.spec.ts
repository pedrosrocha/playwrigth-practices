import { test, expect } from '../fixtures/baseTest';

test.describe('Setup - Create Test User', () => {
    test('Create test user for testing', async ({ page }) => {
        // Navigate to Add User page
        await page.goto('http://localhost:8080/AddUser');
        await page.waitForLoadState('networkidle');

        // Fill in the form
        const usernameInput = page.locator('input[name="username"], input[placeholder*="username" i]').first();
        const emailInput = page.locator('input[type="email"], input[placeholder*="email" i]').first();
        const passwordInput = page.locator('input[name="password"], input[placeholder*="password" i]').first();
        const addButton = page.getByRole('button', { name: /Add|Submit/i }).first();

        // Check if fields are visible
        await expect(usernameInput).toBeVisible();

        // Create a test user
        await usernameInput.fill('testadmin');
        if (await emailInput.isVisible().catch(() => false)) {
            await emailInput.fill('testadmin@test.com');
        }
        if (await passwordInput.isVisible().catch(() => false)) {
            await passwordInput.fill('testadmin123');
        }

        // Try to submit
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => { }),
            addButton.click(),
        ]);

        console.log('User creation attempted, Current URL:', page.url());
        await page.waitForTimeout(2000);
    });
});
