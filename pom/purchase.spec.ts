import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';

test('POM: complete purchase flow for Sauce Labs Backpack', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const confirm = new ConfirmationPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await login.expectLoggedIn();

    await inventory.addProductByName('Sauce Labs Backpack');
    await inventory.goToCart();

    await cart.proceedToCheckout();
    await checkout.fillInformation('Nguyen', 'Tester', '70000');
    await page.locator('#finish').click();

    await confirm.expectSuccessMessage();
});
