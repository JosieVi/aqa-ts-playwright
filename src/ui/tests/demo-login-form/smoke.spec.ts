import { test, expect, Page } from '@playwright/test';

const URL = 'https://anatoly-karpovich.github.io/demo-login-form/';
enum ValidTestData {
    shortPassword = 'shortPas',
    typicalPassword = 'testPassword',
    longPassword = 'testPasswordThisIs20CharactersExactly',
    shortUsername = 'Usr',
    longUsername = 'TestUsername_ThisIs40CharactersExactly12',
    success = 'Successfully registered! Please, click Back to return on login page',
}

test.describe('[UI] [demo-login-form] [Registration] Smoke Test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        await page.locator('#registerOnLogin').click();
    });

    test('Register Form Is Visible', async ({ page }) => {
        await expect(page.locator('#registerForm')).toContainText('Registration');
        await expect(page.locator('//input[@id="userNameOnRegister"]/following-sibling::label')).toContainText('Username');
        await expect(page.locator('//input[@id="passwordOnRegister"]/following-sibling::label')).toContainText('Password');

        await expect(page.locator('#userNameOnRegister')).toBeVisible();
        await expect(page.locator('#passwordOnRegister')).toBeVisible();
        await expect(page.locator('#register')).toBeVisible();
        await expect(page.locator('#backOnRegister')).toBeVisible();
    });

    test('Should Register With Valid Credentials', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill(getRandomUserName());
        await page.locator('#passwordOnRegister').fill('testPassword');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText(ValidTestData.success);
        await page.locator('#backOnRegister').click();
        await verifyLoginFormVisible(page);
    });

    test('Should Register With Short Username', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill(ValidTestData.shortUsername);
        await page.locator('#passwordOnRegister').fill(ValidTestData.typicalPassword);
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText(ValidTestData.success);
        await page.locator('#backOnRegister').click();
        await verifyLoginFormVisible(page);
    });

    test('Should Register With Long Username', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill(ValidTestData.longUsername);
        await page.locator('#passwordOnRegister').fill('testPassword');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText(ValidTestData.success);
        await page.locator('#backOnRegister').click();
        await verifyLoginFormVisible(page);
    });

    test('Should Register With Short Password ', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill(getRandomUserName());
        await page.locator('#passwordOnRegister').fill(ValidTestData.shortPassword);
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText(ValidTestData.success);
        await page.locator('#backOnRegister').click();
        await verifyLoginFormVisible(page);
    });

    test('Should Register With Long Password', async ({ page }) => {
        await page.locator('#userNameOnRegister').fill(getRandomUserName());
        await page.locator('#passwordOnRegister').fill(ValidTestData.longPassword);
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText(ValidTestData.success);
        await page.locator('#backOnRegister').click();
        await verifyLoginFormVisible(page);
    });
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