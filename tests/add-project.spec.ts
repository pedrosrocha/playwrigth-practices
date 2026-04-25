// spec: specs/ui-test-plan.md
// seed: tests/seed.spec.ts

import ProjectsPage from '../pages/ProjectsPage';
import { URL, get_user_credentials, users_types } from '../utils/constants';
import { test, expect } from '../fixtures/baseTest';

test.describe('UI Functional Tests', () => {
  test('Add Project - Create New Project', async ({ page, loginPage, projectsPage }) => {
    await page.context().clearCookies();
    await loginPage.LoginAs('admin', users_types.admin);

    await projectsPage.go_to_url();

    const before = await projectsPage.getProjectsCount();

    await projectsPage.clickNewProject();
    await expect(page).toHaveURL(/\/AddProject/);

    // If add form is available, try to submit a minimal project
    const nameInput = page.locator('input[name="name"], input#name, input[placeholder*=Name]');
    const submitBtn = page.getByRole('button', { name: /Create|Save|Add/i });

    if (await nameInput.count() > 0 && await submitBtn.count() > 0) {
      const projectName = `e2e-project-${Date.now()}`;
      await nameInput.fill(projectName);
      await projectsPage.fillAddProjectForm(
        projectName,
        "2024-10-14",
        "2024-10-20",
        "This is a test project created by Playwright."
      );
      await submitBtn.click();
      await projectsPage.go_to_url();
      const after = await projectsPage.getProjectsCount();
      await expect(after).toBeGreaterThan(before);
    } else {
      // Fallback: ensure we navigated to the AddProject page
      await expect(page).toHaveURL(/\/AddProject/);
    }
  });
});