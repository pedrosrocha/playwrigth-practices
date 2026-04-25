import { type Page, type Locator } from '@playwright/test';
import { step } from '../utils/step-decorators';

export class ResetPasswordPage {
    readonly page: Page;
    readonly url: string;
    readonly pageTitle: Locator;
    readonly newPasswordInput: Locator;
    readonly resetButton: Locator;

    constructor(page: Page, baseurl: string, username: string = '') {
        this.url = `${baseurl}/ResetUserPassword/${encodeURIComponent(username)}`;
        this.page = page;

        // Form elements
        this.pageTitle = page.getByRole('heading', { level: 1 });
        this.newPasswordInput = page.getByRole('textbox', { name: 'New password' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });
    }

    @step("Navigate to Reset Password Page for user: {username}")
    async go_to_url(username: string): Promise<void> {
        const url = `${this.page.url().split('/').slice(0, 3).join('/')}/ResetUserPassword/${encodeURIComponent(username)}`;
        await this.page.goto(url);
    }

    @step("Fill new password: {password}")
    async fillNewPassword(password: string): Promise<void> {
        await this.newPasswordInput.fill(password);
    }

    @step("Click Reset button")
    async clickReset(): Promise<void> {
        await this.resetButton.click();
    }

    @step("Reset password to: {password}")
    async resetPassword(password: string): Promise<void> {
        await this.fillNewPassword(password);
        await this.clickReset();
    }

    @step("Get new password input value")
    async getNewPasswordValue(): Promise<string> {
        return await this.newPasswordInput.inputValue();
    }

    @step("Clear password field")
    async clearPasswordField(): Promise<void> {
        await this.newPasswordInput.clear();
    }

    @step("Verify page title contains username: {username}")
    async verifyPageTitleContainsUsername(username: string): Promise<boolean> {
        const titleText = await this.pageTitle.textContent();
        return titleText?.includes(username) || false;
    }

    @step("Verify page title visible")
    async verifyPageTitleVisible(): Promise<boolean> {
        return await this.pageTitle.isVisible();
    }

    @step("Get page title")
    async getPageTitle(): Promise<string | null> {
        return await this.pageTitle.textContent();
    }
}
