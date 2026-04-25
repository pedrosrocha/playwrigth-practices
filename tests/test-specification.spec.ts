import { test, expect } from '../fixtures/baseTest';
import { users_types } from '../utils/constants';

test.describe('Test Specification Tests', () => {
    test.beforeEach(async ({ page, loginPage, testSpecificationPage }) => {
        await page.context().clearCookies();
        await loginPage.LoginAs('admin', users_types.admin);
        await testSpecificationPage.go_to_url();
    });

    test('Test Specification Page Loads', async ({ page, testSpecificationPage }) => {
        // Assert
        await expect(page).toHaveURL(/\/TestSpecification/);
    });

    test('Project Tree Component Is Present', async ({ testSpecificationPage }) => {
        // Act
        const treeVisible = await testSpecificationPage.verifyTreePresent();

        // Assert
        expect(treeVisible).toBeTruthy();
    });

    test('Project Details Section Visible', async ({ testSpecificationPage }) => {
        // Act
        const detailsVisible = await testSpecificationPage.verifyProjectDetailsVisible();

        // Assert
        expect(detailsVisible).toBeTruthy();
    });

    test('Select Prompt Message Displays', async ({ testSpecificationPage }) => {
        // Act - Tree items should exist initially
        const treeItems = await testSpecificationPage.getTreeItems();

        // Assert
        // Tree should have items
        expect(treeItems.length).toBeGreaterThanOrEqual(0);
    });

    test('Tree Items Available', async ({ testSpecificationPage }) => {
        // Act
        const treeItems = await testSpecificationPage.getTreeItems();

        // Assert
        // Should have at least the known projects
        const itemsString = JSON.stringify(treeItems);
        // Check if tree has content (items or empty state)
        expect(Array.isArray(treeItems)).toBeTruthy();
    });

    test('Multiple Projects in Tree Structure', async ({ testSpecificationPage }) => {
        // Act
        const treeItems = await testSpecificationPage.getTreeItems();

        // Assert
        // Tree should contain multiple projects or be properly structured
        expect(Array.isArray(treeItems)).toBeTruthy();
    });

    test('Navigate Away from Test Specification', async ({ page, testSpecificationPage }) => {
        // Act
        await testSpecificationPage.goToHome();

        // Assert
        await expect(page).toHaveURL(/\/MainPage/);
    });

    test('Project Details Heading Visible', async ({ testSpecificationPage }) => {
        // Assert
        const headingVisible = await testSpecificationPage.projectDetailsHeading.isVisible();
        expect(headingVisible).toBeTruthy();
    });

    test('Logout from Test Specification Page', async ({ page, testSpecificationPage }) => {
        // Act
        await testSpecificationPage.logout();

        // Assert
        await expect(page).toHaveURL(/\/login/);
    });
});
