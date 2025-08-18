import { test, expect } from "@playwright/test";
test.describe('BTVN', () => {
    test('case 1: confirm that the user can log in succesfully using valid credentials', async ({page}) => {
        await page.goto("http://localhost:3000/signin", {waitUntil:'commit'});

        const  username = page.getByLabel('username');
        const  password = page.getByLabel('password');

        await username.fill('Heath93', {timeout: 30000});
        await password.fill('s3cret', {timeout: 30000});

        await expect(username).toHaveValue('Heath93');
        await expect(password).toHaveValue('s3cret');

        await page.getByRole('button', {name:"Sign In"}).click();
        await expect(page).toHaveURL("http://localhost:3000/");

        page.pause();
    })

    test('case 2: Verify that account has been registed should be logged into the system', async ({page}) => {
        await page.goto("http://localhost:3000/signin", {waitUntil:'commit'});

        const  username = page.getByLabel('username');
        const  password = page.getByLabel('password');

        await username.fill('Heath93', {timeout: 30000});
        await password.fill('s3cret', {timeout: 30000});

        await page.getByRole('button', {name:"Sign In"}).click();

        const actualResult = page.getByTestId("sidenav-username");
        // await expect(actualResult).toHaveText("@Heath93");
        await expect(page.locator('[data-test="sidenav-username"]')).toHaveText("@Heath93");
    })

    test('case 3: Verify that the notification has 8 items list', async ({page}) => {
        await page.goto("http://localhost:3000/signin", {waitUntil:'commit'});

        const  username = page.getByLabel('username');
        const  password = page.getByLabel('password');

        await username.fill('Heath93', {timeout: 30000});
        await password.fill('s3cret', {timeout: 30000});
        
        await page.getByRole('button', {name:"Sign In"}).click();
        await expect(page).toHaveURL("http://localhost:3000/");

        await page.getByText("Notifications").click();
        await expect(page).toHaveURL("http://localhost:3000/notifications");

        const list = page.getByRole('listitem');
        await expect(list).toHaveCount(8);
    })

    test('case 4: Verify that the after dismissing a notification, that displays the remaing notifications', async ({page}) => {
        await page.goto("http://localhost:3000/signin", {waitUntil:'commit'});

        const  username = page.getByLabel('username');
        const  password = page.getByLabel('password');

        await username.fill('Heath93', {timeout: 30000});
        await password.fill('s3cret', {timeout: 30000});
        
        await page.getByRole('button', {name:"Sign In"}).click();
        await expect(page).toHaveURL("http://localhost:3000/");

        await page.getByText("Notifications").click();
        await page.waitForTimeout(3000);
        await expect(page).toHaveURL("http://localhost:3000/notifications");

        await page.locator('[data-test="notification-mark-read--90uuJAZrMPg"]').click();
        await page.waitForTimeout(500* 1000);

        const list = page.getByRole('listitem');
        await expect(list).toHaveCount(7);
    })
})