// spec: specs/ui-test-plan.md
// seed: tests/seed.spec.ts

import { URL, users_types } from '../utils/constants';
import { test, expect } from '../fixtures/baseTest';
import ProjectsPage from '../pages/ProjectsPage';

test.describe('UI Functional Tests', () => {
  test('View Project - Visualize project details', async ({ page, loginPage, projectsPage }) => {
    await page.context().clearCookies();
    await loginPage.LoginAs('admin', users_types.admin);

    await projectsPage.go_to_url();

    const names = await projectsPage.getProjectNames();
    const toView = names.length > 0 ? names[0] : undefined;
    test.skip(!toView, 'No project available to view');

    await projectsPage.openProject(toView!);

    // Verify project title or details are visible
    const heading = page.getByRole('heading', { name: toView!, level: 1 }).first();
    if (await heading.count() > 0) {
      await expect(heading).toBeVisible();
    } else {
      // fallback: expect url contains OpenProject
      await expect(page).toHaveURL(/\/OpenProject\//);
    }
  });
});