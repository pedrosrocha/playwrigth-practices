import { type Page, type Locator, test } from '@playwright/test';
import { step } from '../utils/step-decorators';

export class ProjectsPage {
    readonly page: Page;
    readonly url: string;
    readonly newProjectLink: Locator;
    readonly projectsTable: Locator;
    readonly tableRows: Locator;
    // AddProject form locators
    readonly projectNameInput: Locator;
    readonly startDateInput: Locator;
    readonly endDateInput: Locator;
    readonly descriptionInput: Locator;
    readonly addProjectButton: Locator;

    constructor(page: Page, baseurl: string) {
        this.page = page;
        this.url = `${baseurl}/Projects`;

        this.newProjectLink = page.getByRole('link', { name: 'New Project' });
        this.projectsTable = page.locator('table');
        this.tableRows = this.projectsTable.locator('tr');
        // AddProject form locators (best-effort selectors)
        this.projectNameInput = page.locator('input[name="name"], input#name, input[placeholder*=Name]');
        this.startDateInput = page.locator('input[name="start_date"], input[name="startDate"], input[placeholder*=Start]');
        this.endDateInput = page.locator('input[name="end_date"], input[name="endDate"], input[placeholder*=End]');
        this.descriptionInput = page.locator('textarea[name="description"], input[name="description"], textarea#description');
        this.addProjectButton = page.getByRole('button', { name: /Add Project|Create|Save|Add/i }).first();
    }

    @step('Navigate to Projects page')
    async go_to_url(): Promise<void> {
        await this.page.goto(this.url);
    }

    @step('Click New Project')
    async clickNewProject(): Promise<void> {
        await this.newProjectLink.click();
    }

    @step('Fill Add Project form')
    async fillAddProjectForm(name: string, start?: string, end?: string, description?: string): Promise<void> {
        if (await this.projectNameInput.count() > 0) {
            await this.projectNameInput.fill(name);
        }
        if (start && await this.startDateInput.count() > 0) {
            await this.startDateInput.fill(start);
        }
        if (end && await this.endDateInput.count() > 0) {
            await this.endDateInput.fill(end);
        }
        if (description && await this.descriptionInput.count() > 0) {
            await this.descriptionInput.fill(description);
        }
    }

    @step('Submit Add Project')
    async submitAddProject(): Promise<void> {
        if (await this.addProjectButton.count() > 0) {
            await this.addProjectButton.click();
        }
    }

    @step("Create project '{name}'")
    async createProject(name: string, start?: string, end?: string, description?: string): Promise<void> {
        await this.fillAddProjectForm(name, start, end, description);
        await this.submitAddProject();
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
}

export default ProjectsPage;
