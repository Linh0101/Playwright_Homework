import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

test('Login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    
    let email = process.env.TEST_EMAIL || '';
    let password = process.env.TEST_PASSWORD || '';
    if (!email || !password) {
        const signup = new SignupPage(page);
        const name = `User${Date.now()}`;
        password = `P@ssw0rd!${Date.now()}`;
        email = `user${Date.now()}@example.com`;
        await signup.goto();
        await signup.register(name, email, password);
        
        await signup.expectSuccess();
        return;
    }

    await login.login(email, password);
    await login.expectLoggedIn();
});
