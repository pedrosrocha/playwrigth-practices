import { URL, get_user_credentials, users_types } from '../utils/constants';
import { test, expect } from '../fixtures/baseTest';
import { stringify } from 'node:querystring';

test.describe('Test group', () => {
  test.skip('seed', async ({ page, loginPage, projectsPage }) => {
    await loginPage.LoginAs("admin", users_types.admin);
    await projectsPage.go_to_url();
    await projectsPage.clickNewProject();

  });
});
