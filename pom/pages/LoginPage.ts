import { expect, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly url = 'https://www.saucedemo.com/';
    readonly username;
    readonly password;
    readonly loginButton;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async expectLoggedIn() {
        await expect(this.page.locator('.inventory_list')).toBeVisible();
    }
}
