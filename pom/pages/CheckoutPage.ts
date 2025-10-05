import { Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstName;
    readonly lastName;
    readonly postalCode;
    readonly continueButton;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
    }

    async fillInformation(first: string, last: string, postal: string) {
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(postal);
        await this.continueButton.click();
    }
}
