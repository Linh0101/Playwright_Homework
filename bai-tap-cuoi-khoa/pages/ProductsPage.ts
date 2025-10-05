import { Page } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async search(productName: string) {
        const inputSelectors = ['#search_product', 'input[name="search"]', 'input[placeholder*="Search"]', 'input[type="search"]'];
        let filled = false;
        for (const sel of inputSelectors) {
            const loc = this.page.locator(sel).first();
            if (await loc.count() > 0) {
                await loc.fill(productName);
                filled = true;
                break;
            }
        }
        if (!filled) {
            await this.page.keyboard.type(productName);
        }

        const buttonSelectors = ['#submit_search', 'button:has-text("Search")', 'button[type="submit"]', 'button.btn'];
        let clicked = false;
        for (const b of buttonSelectors) {
            const btn = this.page.locator(b).first();
            if (await btn.count() > 0) {
                try {
                    await btn.click({ timeout: 3000 });
                    clicked = true;
                    break;
                } catch (e) {
                }
            }
        }
        if (!clicked) {
            await this.page.keyboard.press('Enter');
        }
    }

    async addFirstResultToCart() {
        const list = this.page.locator('.features_items, .product-list, .products, .product-grid');
        await list.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

        const addSelectors = ['.features_items a:has-text("Add to cart")', '.product-overlay .add-to-cart', '.add-to-cart', 'button:has-text("Add to cart")'];
        for (const s of addSelectors) {
            const loc = this.page.locator(s).first();
            if (await loc.count() > 0) {
                await loc.click({ force: true }).catch(() => {});
                break;
            }
        }
        const continueButtons = ['button:has-text("Continue")', 'button:has-text("Continue Shopping")', 'a:has-text("View Cart")'];
        for (const c of continueButtons) {
            const loc = this.page.locator(c).first();
            if (await loc.count() > 0) {
                await loc.click().catch(() => {});
                break;
            }
        }
    }

    async goToProductDetailsByName(name: string) {
        await this.page.locator(`.product-info:has-text("${name}") a`).first().click();
    }
}
