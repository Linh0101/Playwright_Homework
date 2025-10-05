import { test } from '@playwright/test';
import { SignupPage } from './pages/SignupPage';

test('Register a new user', async ({ page }) => {
    const signup = new SignupPage(page);
    await signup.goto();
    const name = `User${Date.now()}`;
    const email = `user${Date.now()}@example.com`;
    await signup.register(name, email);
    await signup.expectSuccess();
});
