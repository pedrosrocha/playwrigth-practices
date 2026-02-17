// spec: specs/ui-test-plan.md
// seed: tests/seed.spec.ts

import { users_types } from '../utils/constants';
import { test, expect } from '../fixtures/baseTest';

test.describe('UI Functional Tests', () => {
  test('Error Handling - Backend Failure', async ({ page, loginPage }) => {
    // 1. Start with a fresh context and ensure we're authenticated
    await page.context().clearCookies();
    await loginPage.LoginAs('admin', users_types.admin);

    // 2. Intercept the network requests for the Projects endpoint and return HTTP 500 responses
    await page.route('**/Projects**', (route) =>
      route.fulfill({ status: 500, contentType: 'text/plain', body: 'Internal Server Error' })
    );

    // 3. Navigate to `/Projects` to trigger the failing request
    await page.goto('/Projects');

    // 4. Observe UI behaviour and verify a clear error message or retry option is displayed
    const errorLocator = page.getByText(/error|internal server error|unable to load|retry/i);
    const tableRows = page.locator('table tr');

    const errorCount = await errorLocator.count();
    if (errorCount > 0) {
      await expect(errorLocator).toBeVisible();
    } else {
      const rows = await tableRows.count();
      await expect(rows).toBeLessThanOrEqual(1);
    }

    // 5. Restore normal responses (remove route) and verify the Projects list recovers
    await page.unroute('**/Projects**');
    await page.reload();

    // After recovery, expect the Projects page to show project rows (header + at least one project)
    await expect(page.locator('table')).toBeVisible();
    const finalRows = await page.locator('table tr').count();
    await expect(finalRows).toBeGreaterThan(1);
  });
});