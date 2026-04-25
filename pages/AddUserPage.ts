import { type Page, type Locator } from '@playwright/test';
import { step } from '../utils/step-decorators';

export class AddUserPage {
    readonly page: Page;
    readonly url: string;
    readonly homeLink: Locator;
    readonly logoutLink: Locator;
    readonly usersLink: Locator;
    readonly projectsLink: Locator;
    readonly testSpecificationLink: Locator;
    readonly pageTitle: Locator;
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly addButton: Locator;

    constructor(page: Page, baseurl: string) {
        this.url = `${baseurl}/AddUserFromManager`;
        this.page = page;

        // Navigation elements
        this.homeLink = page.getByRole('link', { name: ' Home', exact: true });
        this.logoutLink = page.getByRole('link', { name: ' Logout', exact: true }).first();
        this.usersLink = page.getByRole('link', { name: ' Users', exact: true });
        this.projectsLink = page.getByRole('link', { name: ' Projects', exact: true });
        this.testSpecificationLink = page.getByRole('link', { name: ' Test Specification', exact: true });

        // Form elements
        this.pageTitle = page.getByRole('heading', { name: 'Add New User' });
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.emailInput = page.locator('input[type="text"]').nth(1); // Email is typically the 2nd textbox input
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.addButton = page.getByRole('button', { name: 'Add' });
    }

    @step("Navigate to Add User Page")
    async go_to_url(): Promise<void> {
        await this.page.goto(this.url);
        await this.page.waitForLoadState('networkidle');
    }

    @step("Go to Home")
    async goToHome(): Promise<void> {
        await this.homeLink.click();
    }

    @step("Go to Users")
    async goToUsers(): Promise<void> {
        await this.usersLink.click();
    }

    @step("Go to Projects")
    async goToProjects(): Promise<void> {
        await this.projectsLink.click();
    }

    @step("Logout")
    async logout(): Promise<void> {
        await this.logoutLink.click();
    }

    @step("Fill username: {username}")
    async fillUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    @step("Fill email: {email}")
    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    @step("Fill password: {password}")
    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    @step("Click Add button")
    async clickAdd(): Promise<void> {
        await this.addButton.click();
    }

    @step("Add new user: {username}, {email}, {password}")
    async addNewUser(username: string, email: string, password: string): Promise<void> {
        await this.fillUsername(username);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickAdd();
    }

    @step("Get username input value")
    async getUsernameValue(): Promise<string> {
        return await this.usernameInput.inputValue();
    }

    @step("Get email input value")
    async getEmailValue(): Promise<string> {
        return await this.emailInput.inputValue();
    }

    @step("Get password input value")
    async getPasswordValue(): Promise<string> {
        return await this.passwordInput.inputValue();
    }

    @step("Clear form")
    async clearForm(): Promise<void> {
        await this.usernameInput.clear();
        await this.emailInput.clear();
        await this.passwordInput.clear();
    }

    @step("Verify page title visible")
    async verifyPageTitleVisible(): Promise<boolean> {
        return await this.pageTitle.isVisible();
    }
}
