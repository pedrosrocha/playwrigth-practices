import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { MainPage } from '../pages/MainPage';
import { UsersManagementPage } from '../pages/UsersManagementPage';
import { AddUserPage } from '../pages/AddUserPage';
import { TestSpecificationPage } from '../pages/TestSpecificationPage';
import { AddProjectPage } from '../pages/AddProjectPage';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';


type MyFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    projectsPage: ProjectsPage;
    mainPage: MainPage;
    usersManagementPage: UsersManagementPage;
    addUserPage: AddUserPage;
    testSpecificationPage: TestSpecificationPage;
    addProjectPage: AddProjectPage;
    resetPasswordPage: ResetPasswordPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page, baseURL }, use) => {
        await use(new LoginPage(page, baseURL || ''));
    },
    dashboardPage: async ({ page, baseURL }, use) => {
        await use(new DashboardPage(page, baseURL || ''));
    },
    projectsPage: async ({ page, baseURL }, use) => {
        await use(new ProjectsPage(page, baseURL || ''));
    },
    mainPage: async ({ page, baseURL }, use) => {
        await use(new MainPage(page, baseURL || ''));
    },
    usersManagementPage: async ({ page, baseURL }, use) => {
        await use(new UsersManagementPage(page, baseURL || ''));
    },
    addUserPage: async ({ page, baseURL }, use) => {
        await use(new AddUserPage(page, baseURL || ''));
    },
    testSpecificationPage: async ({ page, baseURL }, use) => {
        await use(new TestSpecificationPage(page, baseURL || ''));
    },
    addProjectPage: async ({ page, baseURL }, use) => {
        await use(new AddProjectPage(page, baseURL || ''));
    },
    resetPasswordPage: async ({ page, baseURL }, use) => {
        await use(new ResetPasswordPage(page, baseURL || ''));
    },
});

export { expect } from '@playwright/test';


