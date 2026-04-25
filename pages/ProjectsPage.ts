import { type Page, type Locator, test } from '@playwright/test';
import { step } from '../utils/step-decorators';

export class ProjectsPage {
    readonly page: Page;
    readonly url: string;
    // Navigation elements
    readonly homeLink: Locator;
    readonly logoutLink: Locator;
    readonly usersLink: Locator;
    readonly projectsLink: Locator;
    readonly testSpecificationLink: Locator;
    // Page elements
    readonly pageTitle: Locator;
    readonly projectsTableHeading: Locator;
    readonly newProjectLink: Locator;
    readonly projectsTable: Locator;
    readonly tableRows: Locator;
    // Table headers
    readonly nameHeader: Locator;
    readonly statusHeader: Locator;
    readonly ownerHeader: Locator;
    readonly startDateHeader: Locator;
    readonly endDateHeader: Locator;
    readonly createdAtHeader: Locator;
    readonly updatedAtHeader: Locator;
    readonly actionsHeader: Locator;

    constructor(page: Page, baseurl: string) {
        this.page = page;
        this.url = `${baseurl}/Projects`;

        // Navigation elements
        this.homeLink = page.getByRole('link', { name: ' Home', exact: true });
        this.logoutLink = page.getByRole('link', { name: ' Logout', exact: true }).first();
        this.usersLink = page.getByRole('link', { name: ' Users', exact: true });
        this.projectsLink = page.getByRole('link', { name: ' Projects', exact: true });
        this.testSpecificationLink = page.getByRole('link', { name: ' Test Specification', exact: true });

        // Page elements
        this.pageTitle = page.getByRole('heading', { name: 'Project Management System' });
        this.projectsTableHeading = page.getByRole('heading', { name: 'Projects:', level: 2 });
        this.newProjectLink = page.getByRole('link', { name: 'New Project' });
        this.projectsTable = page.locator('table');
        this.tableRows = this.projectsTable.locator('tr');

        // Table headers
        this.nameHeader = page.getByRole('columnheader', { name: 'Name' });
        this.statusHeader = page.getByRole('columnheader', { name: 'Status' });
        this.ownerHeader = page.getByRole('columnheader', { name: 'Owner' });
        this.startDateHeader = page.getByRole('columnheader', { name: 'Start Date' });
        this.endDateHeader = page.getByRole('columnheader', { name: 'End Date' });
        this.createdAtHeader = page.getByRole('columnheader', { name: 'Created At' });
        this.updatedAtHeader = page.getByRole('columnheader', { name: 'Updated At' });
        this.actionsHeader = page.getByRole('columnheader', { name: 'Actions' });
    }

    @step('Navigate to Projects page')
    async go_to_url(): Promise<void> {
        await this.page.goto(this.url);
    }

    @step("Go to Home")
    async goToHome(): Promise<void> {
        await this.homeLink.click();
    }

    @step("Go to Users")
    async goToUsers(): Promise<void> {
        await this.usersLink.click();
    }

    @step("Go to Test Specification")
    async goToTestSpecification(): Promise<void> {
        await this.testSpecificationLink.click();
    }

    @step("Logout")
    async logout(): Promise<void> {
        await this.logoutLink.click();
    }

    @step('Click New Project')
    async clickNewProject(): Promise<void> {
        await this.newProjectLink.click();
    }

    @step("Get project names from table")
    async getProjectNames(): Promise<string[]> {
        const names: string[] = [];
        const rowsCount = await this.tableRows.count();
        for (let index = 1; index < rowsCount; index++) {
            const nameCell = this.tableRows.nth(index).locator('td').first();
            const text = (await nameCell.innerText()).trim();
            names.push(text);
        }
        return names;
    }

    @step("Open project '{name}'")
    async openProject(name: string): Promise<void> {
        const projectLink = this.page.getByRole('link', { name }).first();
        await projectLink.click();
    }

    @step("Delete project '{name}'")
    async deleteProject(name: string): Promise<void> {
        const row = this.page.locator('table tr').filter({ has: this.page.getByRole('link', { name }) }).first();
        const deleteButton = row.getByRole('button', { name: 'Delete' });
        await deleteButton.click();
    }

    @step('Get projects table row count (excluding header)')
    async getProjectsCount(): Promise<number> {
        const rowsCount = await this.tableRows.count();
        return Math.max(0, rowsCount - 1);
    }

    @step("Get project status by name: {name}")
    async getProjectStatus(name: string): Promise<string | null> {
        const projectRow = this.page.getByRole('row').filter({ has: this.page.getByRole('link', { name }) }).first();
        const statusCell = projectRow.locator('td').nth(1);
        return await statusCell.textContent();
    }

    @step("Get project owner by name: {name}")
    async getProjectOwner(name: string): Promise<string | null> {
        const projectRow = this.page.getByRole('row').filter({ has: this.page.getByRole('link', { name }) }).first();
        const ownerCell = projectRow.locator('td').nth(2);
        return await ownerCell.textContent();
    }

    @step("Verify project exists: {name}")
    async verifyProjectExists(name: string): Promise<boolean> {
        const projectLink = this.page.getByRole('link', { name }).first();
        return await projectLink.isVisible();
    }
}

export default ProjectsPage;
