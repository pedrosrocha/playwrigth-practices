import { type Page, type Locator } from '@playwright/test';
import { step } from '../utils/step-decorators';

export class UsersManagementPage {
    readonly page: Page;
    readonly url: string;
    readonly homeLink: Locator;
    readonly logoutLink: Locator;
    readonly usersLink: Locator;
    readonly projectsLink: Locator;
    readonly testSpecificationLink: Locator;
    readonly pageTitle: Locator;
    readonly usersTableHeading: Locator;
    readonly usersTable: Locator;
    readonly newUserLink: Locator;
    readonly usernameHeader: Locator;
    readonly emailHeader: Locator;
    readonly userLevelHeader: Locator;
    readonly actionsHeader: Locator;

    constructor(page: Page, baseurl: string) {
        this.url = `${baseurl}/UsersManagement`;
        this.page = page;

        // Navigation elements
        this.homeLink = page.getByRole('link', { name: ' Home', exact: true });
        this.logoutLink = page.getByRole('link', { name: ' Logout', exact: true }).first();
        this.usersLink = page.getByRole('link', { name: ' Users', exact: true });
        this.projectsLink = page.getByRole('link', { name: ' Projects', exact: true });
        this.testSpecificationLink = page.getByRole('link', { name: ' Test Specification', exact: true });

        // Page elements
        this.pageTitle = page.getByRole('heading', { name: 'User Management System' });
        this.usersTableHeading = page.getByRole('heading', { name: 'Users:', level: 2 });
        this.usersTable = page.getByRole('table');
        this.newUserLink = page.getByRole('link', { name: 'New User' });

        // Table headers
        this.usernameHeader = page.getByRole('columnheader', { name: 'Username' });
        this.emailHeader = page.getByRole('columnheader', { name: 'Email' });
        this.userLevelHeader = page.getByRole('columnheader', { name: 'User Level' });
        this.actionsHeader = page.getByRole('columnheader', { name: 'Actions' });
    }

    @step("Navigate to Users Management Page")
    async go_to_url(): Promise<void> {
        await this.page.goto(this.url);
    }

    @step("Go to Home")
    async goToHome(): Promise<void> {
        await this.homeLink.click();
    }

    @step("Go to Projects")
    async goToProjects(): Promise<void> {
        await this.projectsLink.click();
    }

    @step("Go to Test Specification")
    async goToTestSpecification(): Promise<void> {
        await this.testSpecificationLink.click();
    }

    @step("Logout")
    async logout(): Promise<void> {
        await this.logoutLink.click();
    }

    @step("Click New User button")
    async clickNewUser(): Promise<void> {
        await this.newUserLink.click();
    }

    @step("Delete user: {username}")
    async deleteUser(username: string): Promise<void> {
        const deleteButton = this.page.getByRole('row', { name: new RegExp(username) })
            .locator('button', { hasText: 'Delete' });
        await deleteButton.click();
    }

    @step("Reset password for user: {username}")
    async resetUserPassword(username: string): Promise<void> {
        const resetLink = this.page.getByRole('row', { name: new RegExp(username) })
            .locator('a', { hasText: 'Reset Password' });
        await resetLink.click();
    }

    @step("Change user level for: {username} to {level}")
    async changeUserLevel(username: string, level: string): Promise<void> {
        const userRow = this.page.getByRole('row', { name: new RegExp(username) });
        const levelCombobox = userRow.locator('select, [role="combobox"]').first();
        await levelCombobox.selectOption(level);
    }

    @step("Get user email by username: {username}")
    async getUserEmail(username: string): Promise<string | null> {
        const userRow = this.page.getByRole('row', { name: new RegExp(username) });
        const emailCell = userRow.locator('td').nth(1);
        return await emailCell.textContent();
    }

    @step("Get user level by username: {username}")
    async getUserLevel(username: string): Promise<string | null> {
        const userRow = this.page.getByRole('row', { name: new RegExp(username) });
        const levelCell = userRow.locator('td').nth(2);
        return await levelCell.textContent();
    }

    @step("Verify user exists: {username}")
    async verifyUserExists(username: string): Promise<boolean> {
        const userRow = this.page.getByRole('row', { name: new RegExp(username) });
        return await userRow.isVisible();
    }

    @step("Get all users count")
    async getUsersCount(): Promise<number> {
        const rows = await this.page.getByRole('row').count();
        return rows - 1; // Exclude header row
    }
}
