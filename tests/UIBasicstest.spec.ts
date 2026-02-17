import { URL, get_user_credentials, users_types } from '../utils/constants';
import { test, expect } from '../fixtures/baseTest';

test('Successfull login', async ({ loginPage, dashboardPage, page }) => {
    // Reset storage state to empty to ensure we are logged out
    await page.context().clearCookies();

    await loginPage.go_to_url();
    await loginPage.login(
        get_user_credentials(users_types.admin).username,
        get_user_credentials(users_types.admin).password
    );


    await expect(page).toHaveURL(dashboardPage.url);
    await expect(dashboardPage.getWelcomeMessage(
        get_user_credentials(users_types.admin).username
    )).toBeVisible();
});

test('Go to projects', async ({ loginPage, page, dashboardPage }) => {


    await loginPage.LoginAs("admin", users_types.admin);

    await dashboardPage.go_to_url();

    await expect(dashboardPage.getWelcomeMessage(
        get_user_credentials(users_types.admin).username
    )).toBeVisible();

    await dashboardPage.navigateToProjects();
    await expect(page).toHaveURL(URL + "/Projects");
});


test('Dropdown validation.', async ({ loginPage, page, dashboardPage }) => {

    await loginPage.LoginAs("admin", users_types.admin);

    await dashboardPage.go_to_url();

    const projects: string[] = await dashboardPage.listProjectsDropdown();

    await dashboardPage.selectProjectDroppdown(projects[1]);

    await page.goto(URL + "/TestSpecification");
});
