import { type Page, type Locator } from '@playwright/test';
import { step } from '../utils/step-decorators';
//import { boxedStep } from '../utils/decorators';
import { users_types, get_user_credentials } from '../utils/constants';


export class LoginPage {
    readonly page: Page;
    readonly url: string;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page, baseurl: string) {
        this.url = `${baseurl}/login`;
        this.page = page;

        //define the page interfaces
        this.usernameInput = page.getByPlaceholder("Enter username");
        this.passwordInput = page.getByPlaceholder("Enter password");
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    @step("Navigate to Login Page")
    async go_to_url(): Promise<void> {
        await this.page.goto(this.url);
    }

    @step("Input the username: {username}")
    async fill_username(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }
    @step("Inout the Password")
    async fill_password(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    @step("Click Login Button")
    async login_button_click(): Promise<void> {
        await this.loginButton.click();
    }

    @step("Login user: {username}")
    async login(username: string, password: string): Promise<void> {

        await this.go_to_url();
        await this.fill_username(username);
        await this.fill_password(password);
        await this.login_button_click();
    }

    @step("Login user: {user_description}")
    async LoginAs(user_description: string, user: users_types): Promise<void> {
        const user_data: { username: string, password: string; } = get_user_credentials(user);

        await this.login(
            user_data.username,
            user_data.password,
        );
    }
}