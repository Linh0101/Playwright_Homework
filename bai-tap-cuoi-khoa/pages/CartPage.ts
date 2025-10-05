import { Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        const fallbacks = ['https://automationexercise.com/view_cart', 'https://automationexercise.com/cart', 'https://automationexercise.com/view_cart.php'];
        for (const url of fallbacks) {
            try {
                await this.page.goto(url, { waitUntil: 'networkidle' });
            } catch {
            }
            const u = this.page.url();
            if (u.includes('view_cart') || u.includes('/cart')) return;
        }

        const selectors = ['a:has-text("Cart")', 'a:has-text("View Cart")', 'a[href*="/view_cart"]', 'a[href*="/cart"]', 'button:has-text("Cart")'];
        for (const s of selectors) {
            const loc = this.page.locator(s).first();
            if (await loc.count() > 0) {
                await loc.click().catch(() => {});
                await this.page.waitForLoadState('networkidle').catch(() => {});
                return;
            }
        }
    }

    async getProductNames() {
        try {
            const loc = this.page.locator('.cart_description h4 a');
            if ((await loc.count()) === 0) return [];
            return await loc.allTextContents();
        } catch {
            return [];
        }
    }

    async proceedToCheckout() {
        const selectors = ['a[href="/checkout"]:has-text("Proceed To Checkout")', 'a:has-text("Proceed To Checkout")', 'button:has-text("Proceed To Checkout")', 'a[href*="checkout"]'];
        for (const s of selectors) {
            const loc = this.page.locator(s).first();
            if (await loc.count() > 0) {
                await loc.click().catch(() => { });
                return true;
            }
        }
        return false;
    }
}
