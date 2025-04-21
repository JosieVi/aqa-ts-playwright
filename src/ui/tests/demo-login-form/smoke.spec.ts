import { test, expect, Page } from '@playwright/test';
// import { url } from 'inspector';
const URL = 'https://anatoly-karpovich.github.io/demo-login-form/';

test.describe('[UI] [demo] REGISTER on demo-login-form', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        await page.locator('#registerOnLogin').click();

    });

    function getRandomUserName(): string {
        const firstNames = ['Aino', 'Eero', 'Lumi', 'Oskari', 'Veera'];
        const lastNames = ['Korhonen', 'Virtanen', 'Mäkinen', 'Nieminen', 'Heikkinen'];
        return `${firstNames[Math.floor(Math.random() * 5)]} ${lastNames[Math.floor(Math.random() * 5)]}`;
    }

    async function verifyLoginFormVisible(page: Page) {
        await expect(page.url()).toBe(URL);
        await expect(page.locator('#userName')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.locator('//input[@id="submit"]/following-sibling::span')).toContainText('OR');
        await expect(page.locator('#submit')).toBeVisible();
        await expect(page.locator('#registerOnLogin')).toBeVisible();
    }

    test('Register Form Is Visible', async ({ page }) => {
        await expect(page.locator('#registerForm')).toContainText('Registration');
        await expect(page.locator('//input[@id="userNameOnRegister"]/following-sibling::label')).toContainText('Username');
        await expect(page.locator('//input[@id="passwordOnRegister"]/following-sibling::label')).toContainText('Password');

        await expect(page.locator('#userNameOnRegister')).toBeVisible();
        await expect(page.locator('#passwordOnRegister')).toBeVisible();
        await expect(page.locator('#register')).toBeVisible();
        await expect(page.locator('#backOnRegister')).toBeVisible();
    });

    test('Register With Valid Credentials', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill(getRandomUserName());
        await page.locator('#passwordOnRegister').fill('testPassword');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText('Successfully registered! Please, click Back to return on login page');
        await page.locator('#backOnRegister').click();
        await verifyLoginFormVisible(page);
    });

    test('Register With Long Username', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill('TestUsername_ThisIs40CharactersExactly12');
        await page.locator('#passwordOnRegister').fill('testPassword');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText('Successfully registered! Please, click Back to return on login page');
        await page.locator('#backOnRegister').click();
        await verifyLoginFormVisible(page);
    });

    test('Register With Long Password', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill(getRandomUserName());
        await page.locator('#passwordOnRegister').fill('testPasswordThisIs20CharactersExactly');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText('Successfully registered! Please, click Back to return on login page');
        await page.locator('#backOnRegister').click();
        await verifyLoginFormVisible(page);
    });

    test('Should Not Allow Registration With Existing Username', async ({ page }) => {
        const repeatedUserName = getRandomUserName();
        await page.locator('#userNameOnRegister').fill(repeatedUserName);
        await page.locator('#passwordOnRegister').fill('testPassword');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText('Successfully registered! Please, click Back to return on login page');
        await page.locator('#userNameOnRegister').fill(repeatedUserName);
        await page.locator('#passwordOnRegister').fill('testPassword');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText('Username is in use');
    });

    test('Register With Empty Username', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill('');
        await page.locator('#passwordOnRegister').fill('testPassword');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText('Username is required');
    });

    test('Register With Empty Password', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill(getRandomUserName());
        await page.locator('#passwordOnRegister').fill('');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText('Password is required');
    });

    test('Register With Spaces Only Username', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill('   ');
        await page.locator('#passwordOnRegister').fill('testPassword');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText('Prefix and postfix spaces are not allowed is username');

    });

    test('Register With Spaces Only Password', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill(getRandomUserName());
        await page.locator('#passwordOnRegister').fill('   ');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText('Password is required');
    });

    test('Register With Short Username', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill(getRandomUserName().substring(0, 2));
        await page.locator('#passwordOnRegister').fill('testPassword');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText('Username should contain at least 3 characters');
    });

    test('Register With Short Password', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill(getRandomUserName());
        await page.locator('#passwordOnRegister').fill('test');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText('Password should contain at least 8 characters');
    });

    test('Register Username With Trimmed Spaces', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill(`   getRandomUserName()   `);
        await page.locator('#passwordOnRegister').fill('testPassword');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText('Prefix and postfix spaces are not allowed is username');
    });

    test('Register Password Without Lowercase', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill(getRandomUserName());
        await page.locator('#passwordOnRegister').fill('TESTPASSWORD');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText('Password should contain at least one character in lower case');
    });
});