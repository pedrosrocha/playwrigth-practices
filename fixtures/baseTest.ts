import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

type MyFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page, baseURL }, use) => {
        await use(new LoginPage(page, baseURL || ''));
    },
    dashboardPage: async ({ page, baseURL }, use) => {
        await use(new DashboardPage(page, baseURL || ''));
    },
});

export { expect } from '@playwright/test';


