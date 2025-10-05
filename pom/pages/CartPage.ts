import { Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('#checkout');
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}
