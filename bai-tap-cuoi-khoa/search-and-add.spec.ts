import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';

test('Search and add product to cart', async ({ page }) => {
    const home = new HomePage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.goToProducts();
    await products.search('Dress');
    await products.addFirstResultToCart();
    await cart.goto();
    const names = await cart.getProductNames();
    expect(names.length).toBeGreaterThan(0);
});
