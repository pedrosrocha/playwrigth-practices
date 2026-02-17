// spec: specs/ui-test-plan.md
// seed: tests/seed.spec.ts

import { URL, users_types } from '../utils/constants';
import { test, expect } from '../fixtures/baseTest';
import ProjectsPage from '../pages/ProjectsPage';

test.describe('UI Functional Tests', () => {
  test.skip('Delete Project - Remove existing project', async ({ page, loginPage, projectsPage }) => {
    await page.context().clearCookies();
    await loginPage.LoginAs('admin', users_types.admin);

    await projectsPage.go_to_url();

    const beforeNames = await projectsPage.getProjectNames();
    const beforeCount = await projectsPage.getProjectsCount();

    // Choose an existing project to delete if present
    const toDelete = beforeNames.length > 0 ? beforeNames[0] : undefined;
    test.skip(!toDelete, 'No project available to delete');

    // Handle confirmation dialogs if any
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await projectsPage.deleteProject(toDelete!);

    // Reload and verify deletion
    await projectsPage.go_to_url();
    const afterNames = await projectsPage.getProjectNames();
    const afterCount = await projectsPage.getProjectsCount();

    await expect(afterCount).toBeLessThanOrEqual(beforeCount);
    if (toDelete) {
      await expect(afterNames).not.toContain(toDelete);
    }
  });
});