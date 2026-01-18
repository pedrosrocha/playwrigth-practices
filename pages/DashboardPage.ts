import { type Page, type Locator, test } from '@playwright/test';
//import { boxedStep } from '../utils/decorators';
import { step } from '../utils/step-decorators';

export class DashboardPage {
    readonly page: Page;
    readonly url: string;
    readonly projectsCard: Locator;
    readonly TestSpecificationCard: Locator;
    readonly LogoutCard: Locator;
    readonly UsersCard: Locator;
    readonly AddUserCard: Locator;
    readonly AddProjectCard: Locator;
    readonly ResetPasswordCard: Locator;
    readonly MainPage: Locator;
    readonly DropdownMenu: Locator;
    readonly Dropdownoptions: Locator;

    constructor(page: Page, baseurl: string) {
        this.url = `${baseurl}/MainPage`;
        this.page = page;

        this.projectsCard = page.locator('a.card[href="/Projects"]');
        this.TestSpecificationCard = page.locator('a.card[href="/TestSpecification"]');
        this.LogoutCard = page.locator('a.card[href="/Logout"]');
        this.UsersCard = page.locator('a.card[href="/UsersManagement"]');
        this.AddUserCard = page.locator('a.card[href="/AddUserFromManager"]');
        this.AddProjectCard = page.locator('a.card[href="/AddProject"]');
        this.ResetPasswordCard = page.locator('a.card[href="/ResetUserPassword/"]');
        this.MainPage = page.locator('a[href="/MainPage"]');

        this.DropdownMenu = page.locator('select');
        this.Dropdownoptions = page.locator('#project-selector-form option');

    }
    @step("Navigate to Dashboard Page")
    async go_to_url(): Promise<void> {
        await this.page.goto(this.url);
    }
    @step("Click Card Button")
    async CardButton(): Promise<void> {
        await this.projectsCard.click();
    }
    @step("Navigate to Projects")
    async navigateToProjects(): Promise<void> {
        await this.projectsCard.click();
    }

    getWelcomeMessage(user: string): Locator {
        return this.page.getByText('Welcome, ' + user + '!', { exact: true });
    }
    @step("Select the project '{project}' from Dropdown")
    async selectProjectDroppdown(project: string): Promise<void> {
        test.step("Selecting the project '" + project + " '", async () => {
            await this.DropdownMenu.selectOption({ label: project });
        })

    }

    @step("List Projects from Dropdown")
    async listProjectsDropdown(): Promise<string[]> {
        let projects: string[] = [];

        await test.step("Listing projects from dropdown", async () => {
            const dropdownData: string[] = (await this.DropdownMenu.allInnerTexts());
            projects = dropdownData[0].split("\n");
            test.step("list of project: " + projects, async () => { });
        });
        return projects;
    }
} 