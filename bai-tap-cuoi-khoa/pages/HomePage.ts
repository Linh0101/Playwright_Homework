import { Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://automationexercise.com');
    }

    async goToSignup() {
        await this.page.getByRole('link', { name: /Signup/i }).click().catch(() => { });
        await this.page.locator('a[href="/login"]:has-text("Signup")').first().click({ timeout: 2000 }).catch(() => { });
    }

    async goToLogin() {
        await this.page.getByRole('link', { name: /Login/i }).click().catch(() => { });
    }

    async goToProducts() {
        await this.page.getByRole('link', { name: /Products/i }).click();
    }
}
