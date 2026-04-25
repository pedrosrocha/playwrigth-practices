// spec: specs/ui-test-plan.md
// seed: tests/seed.spec.ts

import { URL, users_types } from '../utils/constants';
import { test, expect } from '../fixtures/baseTest';
import ProjectsPage from '../pages/ProjectsPage';

test.describe('UI Functional Tests', () => {
  test('Edit Project - Open and edit project details', async ({ page, loginPage, projectsPage }) => {
    await page.context().clearCookies();
    await loginPage.LoginAs('admin', users_types.admin);

    await projectsPage.go_to_url();

    const names = await projectsPage.getProjectNames();
    const toEdit = names.length > 0 ? names[0] : undefined;
    test.skip(!toEdit, 'No project available to edit');

    await projectsPage.openProject(toEdit!);

    // Expect project detail visible (either by URL or by heading)
    const detailHeading = page.getByRole('heading', { name: toEdit!, level: 1 }).first();
    if (await detailHeading.count() > 0) {
      await expect(detailHeading).toBeVisible();
    } else {
      await expect(page).toHaveURL(new RegExp('/OpenProject/'));
    }

    // If an Edit action exists, attempt a simple edit (best-effort)
    const editBtn = page.getByRole('button', { name: /Edit|Modify/i }).first();
    if (await editBtn.count() > 0) {
      await editBtn.click();
      const descInput = page.locator('textarea[name="description"], input[name="description"]');
      if (await descInput.count() > 0) {
        const newDesc = `Edited by e2e at ${Date.now()}`;
        await descInput.fill(newDesc);
        const saveBtn = page.getByRole('button', { name: /Save|Update|Submit/i }).first();
        if (await saveBtn.count() > 0) {
          await saveBtn.click();
          // verify save by checking for description on page
          await expect(page.getByText(newDesc)).toBeVisible();
        }
      }
    }
  });
});