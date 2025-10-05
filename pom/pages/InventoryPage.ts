import { Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly productList;

    constructor(page: Page) {
        this.page = page;
        this.productList = page.locator('.inventory_list');
    }

    productAddButtonByName(name: string) {
        return this.page.locator(`.inventory_item:has-text("${name}") button`);
    }

    async addProductByName(name: string) {
        const btn = this.productAddButtonByName(name);
        await btn.click();
    }

    async goToCart() {
        await this.page.locator('.shopping_cart_link').click();
    }
}
