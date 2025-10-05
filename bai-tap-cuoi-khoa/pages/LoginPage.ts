import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://automationexercise.com/login');
    }

    async login(email: string, password: string) {
        
        const emailSelectors = ['input[data-qa="login-email"]', 'input[name="email"]', 'input[type="email"]', 'input#email'];
        const passSelectors = ['input[data-qa="login-password"]', 'input[name="password"]', 'input[type="password"]', 'input#password'];
        const buttonSelectors = ['button[data-qa="login-button"]', 'button:has-text("Login")', 'button[type="submit"]', 'input[type="submit"]'];

        let filled = false;
        for (const s of emailSelectors) {
            const loc = this.page.locator(s).first();
            if (await loc.count() > 0) {
                await loc.fill(email);
                filled = true;
                break;
            }
        }
        if (!filled) await this.page.keyboard.type(email);

        filled = false;
        for (const s of passSelectors) {
            const loc = this.page.locator(s).first();
            if (await loc.count() > 0) {
                await loc.fill(password);
                filled = true;
                break;
            }
        }
        if (!filled) await this.page.keyboard.type(password);

        
        for (const b of buttonSelectors) {
            const btn = this.page.locator(b).first();
            if (await btn.count() > 0) {
                await Promise.all([
                    this.page.waitForLoadState('networkidle').catch(() => {}),
                    btn.click().catch(() => {})
                ]);
                return;
            }
        }

        
        await this.page.keyboard.press('Enter');
    }

    async expectLoggedIn() {
        const checks = [
            this.page.getByText('Logged in as'),
            this.page.getByRole('link', { name: /Logout|Log out/i }),
            this.page.getByRole('link', { name: /Account|My Account|Profile/i }),
            this.page.getByText(/Welcome, /i)
        ];

        
        for (const c of checks) {
            try {
                await c.first().waitFor({ timeout: 8000 });
                return;
            } catch {
            }
        }

        
        try {
            const logoutLoc = this.page.locator('text=/logout/i');
            if (await logoutLoc.count() > 0) {
                return;
            }
        } catch {
        }

        
        try {
            const ts = Date.now();
            await this.page.screenshot({ path: `test-results/login-failure-${ts}.png`, fullPage: false }).catch(() => {});
        } catch {
        }

        throw new Error(`Could not detect logged-in state after login. Current URL: ${this.page.url()}`);
    }

    async isLoggedIn(): Promise<boolean> {
        const checks = [
            this.page.getByText('Logged in as'),
            this.page.getByRole('link', { name: /Logout|Log out/i }),
            this.page.getByRole('link', { name: /Account|My Account|Profile/i }),
            this.page.getByText(/Welcome, /i)
        ];

        for (const c of checks) {
            try {
                if (await c.first().count() > 0) return true;
            } catch {
            }
        }

        try {
            const logoutLoc = this.page.locator('text=/logout/i');
            if (await logoutLoc.count() > 0) return true;
        } catch {
        }
        return false;
    }
}
