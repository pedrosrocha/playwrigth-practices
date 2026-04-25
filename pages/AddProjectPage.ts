import { type Page, type Locator } from '@playwright/test';
import { step } from '../utils/step-decorators';

export class AddProjectPage {
    readonly page: Page;
    readonly url: string;
    readonly homeLink: Locator;
    readonly logoutLink: Locator;
    readonly usersLink: Locator;
    readonly projectsLink: Locator;
    readonly testSpecificationLink: Locator;
    readonly pageTitle: Locator;
    readonly projectNameInput: Locator;
    readonly startDateInput: Locator;
    readonly endDateInput: Locator;
    readonly descriptionInput: Locator;
    readonly addProjectButton: Locator;

    constructor(page: Page, baseurl: string) {
        this.url = `${baseurl}/AddProject`;
        this.page = page;

        // Navigation elements
        this.homeLink = page.getByRole('link', { name: ' Home', exact: true });
        this.logoutLink = page.getByRole('link', { name: ' Logout', exact: true }).first();
        this.usersLink = page.getByRole('link', { name: ' Users', exact: true });
        this.projectsLink = page.getByRole('link', { name: ' Projects', exact: true });
        this.testSpecificationLink = page.getByRole('link', { name: ' Test Specification', exact: true });

        // Form elements
        this.pageTitle = page.getByRole('heading', { name: 'Add New Project' });
        this.projectNameInput = page.getByRole('textbox', { name: 'Project Name' });
        this.startDateInput = page.getByRole('textbox', { name: 'Start Date' });
        this.endDateInput = page.getByRole('textbox', { name: 'End Date' });
        this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
        this.addProjectButton = page.getByRole('button', { name: 'Add Project' });
    }

    @step("Navigate to Add Project Page")
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

    @step("Go to Projects")
    async goToProjects(): Promise<void> {
        await this.projectsLink.click();
    }

    @step("Logout")
    async logout(): Promise<void> {
        await this.logoutLink.click();
    }

    @step("Fill project name: {name}")
    async fillProjectName(name: string): Promise<void> {
        await this.projectNameInput.fill(name);
    }

    @step("Fill start date: {date}")
    async fillStartDate(date: string): Promise<void> {
        await this.startDateInput.fill(date);
    }

    @step("Fill end date: {date}")
    async fillEndDate(date: string): Promise<void> {
        await this.endDateInput.fill(date);
    }

    @step("Fill description: {description}")
    async fillDescription(description: string): Promise<void> {
        await this.descriptionInput.fill(description);
    }

    @step("Click Add Project button")
    async clickAddProject(): Promise<void> {
        await this.addProjectButton.click();
    }

    @step("Add new project: {name}, {startDate}, {endDate}, {description}")
    async addNewProject(name: string, startDate: string, endDate: string, description: string): Promise<void> {
        await this.fillProjectName(name);
        await this.fillStartDate(startDate);
        await this.fillEndDate(endDate);
        await this.fillDescription(description);
        await this.clickAddProject();
    }

    @step("Get project name input value")
    async getProjectNameValue(): Promise<string> {
        return await this.projectNameInput.inputValue();
    }

    @step("Get start date input value")
    async getStartDateValue(): Promise<string> {
        return await this.startDateInput.inputValue();
    }

    @step("Get end date input value")
    async getEndDateValue(): Promise<string> {
        return await this.endDateInput.inputValue();
    }

    @step("Get description input value")
    async getDescriptionValue(): Promise<string> {
        return await this.descriptionInput.inputValue();
    }

    @step("Clear form")
    async clearForm(): Promise<void> {
        await this.projectNameInput.clear();
        await this.startDateInput.clear();
        await this.endDateInput.clear();
        await this.descriptionInput.clear();
    }

    @step("Verify page title visible")
    async verifyPageTitleVisible(): Promise<boolean> {
        return await this.pageTitle.isVisible();
    }
}
