import { expect, Page } from '@playwright/test';

export class ConfirmationPage {
    readonly page: Page;
    readonly finishHeader;

    constructor(page: Page) {
        this.page = page;
        this.finishHeader = page.locator('.complete-header');
    }

    async expectSuccessMessage() {
        await expect(this.finishHeader).toHaveText(/thank you for your order!?/i);
    }
}
