import { test, expect } from '@playwright/test';

const URL = 'https://anatoly-karpovich.github.io/aqa-course-project/#/';
const USERNAME = 'test@gmail.com';
const PASSWORD = '12345678';
const USERNAME_AFTER_LOGIN = 'Anatoly';

test.describe('[UI] [Sales Portal] [Login] HW19-2', () => {
    test('Should Login as Anatoly', async ({ page }) => {
        await page.goto(URL);
        await page.locator('#emailinput').fill(USERNAME);
        await page.locator('#passwordinput').fill(PASSWORD);
        await page.getByRole('button', { name: 'Login' }).click();
        await page.waitForLoadState('networkidle');
        //await page.waitForSelector(`a#dropdownUser1 strong`);
        await expect(page.locator(`a#dropdownUser1 strong`)).toHaveText(USERNAME_AFTER_LOGIN);
        await expect(page.getByRole('heading', { name: 'Welcome to Sales Management Portal' })).toBeVisible();
        await expect(page.locator('#sidebar')).toHaveScreenshot('sidebar-on-the-Login-page.png');
    });
});
