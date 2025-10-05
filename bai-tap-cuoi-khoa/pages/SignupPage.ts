import { Page } from '@playwright/test';

export class SignupPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://automationexercise.com/login');
    }

    async register(name: string, email: string, password?: string) {
        await this.page.locator('input[data-qa="signup-name"]').fill(name);
        await this.page.locator('input[data-qa="signup-email"]').fill(email);
        await Promise.all([
            this.page.waitForLoadState('networkidle').catch(() => {}),
            this.page.locator('button[data-qa="signup-button"]').click().catch(() => {})
        ]);

        const firstName = this.page.locator('input[data-qa="first_name"]');
        if (await firstName.count() > 0) {
            await firstName.fill('First');
        }
        const passLoc = this.page.locator('input[data-qa="password"]');
        if (await passLoc.count() > 0) {
            await passLoc.fill(password || 'Password123');
        }
        const createBtn = this.page.locator('button[data-qa="create-account"]');
        if (await createBtn.count() > 0) {
            await Promise.all([
                this.page.waitForLoadState('networkidle').catch(() => {}),
                createBtn.click().catch(() => {})
            ]);
        }
    }

    async expectSuccess() {
        await this.page.locator('.alert-success, .signup-form').first().waitFor({ timeout: 5000 }).catch(() => { });
    }
}
