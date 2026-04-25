import { test, expect } from '../fixtures/baseTest';

test.describe('Debug Login', () => {
    test('Debug - Manual Login Flow with Enter Key', async ({ page }) => {
        // Go to login page
        await page.goto('http://localhost:8080/login');
        await page.waitForURL(/\/login/, { timeout: 5000 });

        // Check form elements
        const usernameInput = page.locator('input[name="username"]');
        const passwordInput = page.locator('input[name="password"]');

        await expect(usernameInput).toBeVisible();
        await expect(passwordInput).toBeVisible();

        // Fill form
        await usernameInput.fill('admin user');
        await passwordInput.fill('admin_password');

        console.log('About to press Enter');

        // Press Enter to submit
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {
                console.log('Navigation timeout');
            }),
            passwordInput.press('Enter'),
        ]);

        // Wait a moment and see where we are
        await page.waitForTimeout(2000);
        console.log('Current URL after login:', page.url());
        const content = await page.content();
        console.log('Page contains MainPage:', content.includes('MainPage'));
        console.log('Page contains Welcome:', content.includes('Welcome'));
        console.log('Page contains error:', content.includes('error') || content.includes('Error') || content.includes('failed'));
    });
});
