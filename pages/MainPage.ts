import { type Page, type Locator } from '@playwright/test';
import { step } from '../utils/step-decorators';

export class MainPage {
    readonly page: Page;
    readonly url: string;
    readonly homeLink: Locator;
    readonly logoutLink: Locator;
    readonly usersLink: Locator;
    readonly projectsLink: Locator;
    readonly testSpecificationLink: Locator;
    readonly projectSelector: Locator;
    readonly welcomeHeading: Locator;
    readonly selectOptionText: Locator;
    readonly testSpecificationCard: Locator;
    readonly projectsCard: Locator;
    readonly usersCard: Locator;
    readonly logoutCard: Locator;
    readonly addUserCard: Locator;
    readonly addProjectCard: Locator;
    readonly resetPasswordCard: Locator;

    constructor(page: Page, baseurl: string) {
        this.url = `${baseurl}/MainPage`;
        this.page = page;

        // Navigation elements
        this.homeLink = page.getByRole('link', { name: ' Home', exact: true });
        this.logoutLink = page.getByRole('link', { name: ' Logout', exact: true }).first();
        this.usersLink = page.getByRole('link', { name: ' Users', exact: true });
        this.projectsLink = page.getByRole('link', { name: ' Projects', exact: true });
        this.testSpecificationLink = page.getByRole('link', { name: ' Test Specification', exact: true });

        // Project selector dropdown
        this.projectSelector = page.locator('select[aria-label="Project Selector"], combobox');

        // Header elements
        this.welcomeHeading = page.getByRole('heading', { name: /Welcome/ });
        this.selectOptionText = page.getByText('Select an option below to get started.', { exact: true })


        // Card links
        this.testSpecificationCard = page.getByRole('link', { name: /Test Specification Create and manage/ });
        this.projectsCard = page.getByRole('link', { name: /Projects Organize and track/ });
        this.usersCard = page.getByRole('link', { name: /Users Manage user accounts/ });
        this.logoutCard = page.getByRole('link', { name: /Logout Sign out of your account/ });
        this.addUserCard = page.getByRole('link', { name: /Add user Create a new user/ });
        this.addProjectCard = page.getByRole('link', { name: /Add project Create a new project/ });
        this.resetPasswordCard = page.getByRole('link', { name: /Reset Password Creates a new password/ });
    }

    @step("Navigate to Main Page")
    async go_to_url(): Promise<void> {
        await this.page.goto(this.url);
    }

    @step("Go to Home")
    async goToHome(): Promise<void> {
        await this.homeLink.click();
    }

    @step("Go to Users Management")
    async goToUsers(): Promise<void> {
        await this.usersLink.click();
    }

    @step("Go to Projects")
    async goToProjects(): Promise<void> {
        await this.projectsLink.click();
    }

    @step("Go to Test Specification")
    async goToTestSpecification(): Promise<void> {
        await this.testSpecificationLink.click();
    }

    @step("Select project: {projectName}")
    async selectProject(projectName: string): Promise<void> {
        await this.projectSelector.selectOption(projectName);
    }

    @step("Click on Test Specification Card")
    async clickTestSpecificationCard(): Promise<void> {
        await this.testSpecificationCard.click();
    }

    @step("Click on Projects Card")
    async clickProjectsCard(): Promise<void> {
        await this.projectsCard.click();
    }

    @step("Click on Users Card")
    async clickUsersCard(): Promise<void> {
        await this.usersCard.click();
    }

    @step("Click on Logout Card")
    async clickLogoutCard(): Promise<void> {
        await this.logoutCard.click();
    }

    @step("Click on Add User Card")
    async clickAddUserCard(): Promise<void> {
        await this.addUserCard.click();
    }

    @step("Click on Add Project Card")
    async clickAddProjectCard(): Promise<void> {
        await this.addProjectCard.click();
    }

    @step("Click on Reset Password Card")
    async clickResetPasswordCard(): Promise<void> {
        await this.resetPasswordCard.click();
    }

    @step("Logout")
    async logout(): Promise<void> {
        await this.logoutLink.click();
    }

    @step("Verify welcome message")
    async verifyWelcomeMessage(): Promise<boolean> {
        return await this.welcomeHeading.isVisible();
    }

    @step("Get welcome text")
    async getWelcomeText(): Promise<string | null> {
        return await this.welcomeHeading.textContent();
    }
}
