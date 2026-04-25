import { type Page, type Locator } from '@playwright/test';
import { step } from '../utils/step-decorators';

export class TestSpecificationPage {
    readonly page: Page;
    readonly url: string;
    readonly homeLink: Locator;
    readonly logoutLink: Locator;
    readonly usersLink: Locator;
    readonly projectsLink: Locator;
    readonly testSpecificationLink: Locator;
    readonly pageTitle: Locator;
    readonly projectDetailsHeading: Locator;
    readonly selectPromptText: Locator;
    readonly projectTree: Locator;

    constructor(page: Page, baseurl: string) {
        this.url = `${baseurl}/TestSpecification`;
        this.page = page;

        // Navigation elements
        this.homeLink = page.getByRole('link', { name: ' Home', exact: true });
        this.logoutLink = page.getByRole('link', { name: ' Logout', exact: true }).first();
        this.usersLink = page.getByRole('link', { name: ' Users', exact: true });
        this.projectsLink = page.getByRole('link', { name: ' Projects', exact: true });
        this.testSpecificationLink = page.getByRole('link', { name: ' Test Specification', exact: true });

        // Page elements
        this.pageTitle = page.locator('banner');
        this.projectDetailsHeading = page.getByRole('heading', { name: 'Project Details' });
        this.selectPromptText = page.locator('text=Select a test suite or test case from the tree to see its details');
        this.projectTree = page.getByRole('tree');
    }

    @step("Navigate to Test Specification Page")
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

    @step("Select project in tree: {projectName}")
    async selectProjectInTree(projectName: string): Promise<void> {
        const treeItem = this.page.getByRole('treeitem', { name: projectName, exact: true });
        await treeItem.click();
    }

    @step("Expand project in tree: {projectName}")
    async expandProject(projectName: string): Promise<void> {
        const treeItem = this.page.getByRole('treeitem', { name: projectName, exact: true });
        const expandButton = treeItem.locator('button').first();
        await expandButton.click();
    }

    @step("Get visible tree items")
    async getTreeItems(): Promise<string[]> {
        const items = await this.page.getByRole('treeitem').all();
        const names = [];
        for (const item of items) {
            names.push(await item.getAttribute('aria-label') || '');
        }
        return names;
    }

    @step("Verify project details section visible")
    async verifyProjectDetailsVisible(): Promise<boolean> {
        return await this.projectDetailsHeading.isVisible();
    }

    @step("Verify tree is present")
    async verifyTreePresent(): Promise<boolean> {
        return await this.projectTree.isVisible();
    }
}
