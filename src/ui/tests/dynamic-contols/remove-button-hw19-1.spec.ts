import { test, expect } from '@playwright/test';

const URL = 'https://the-internet.herokuapp.com/';

test.describe('[UI] [Dynamic Controls] Remove Button', () => {
    test('Check The Remove Button', async ({ page }) => {
        await page.goto(URL);
        await page.getByRole('link', { name: 'Dynamic Controls' }).click();
        await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Dynamic Controls' })).toBeVisible;
        await page.getByRole('checkbox').check();
        await page.getByRole('button', { name: 'Remove' }).click();
        await expect(page.getByRole('checkbox')).toBeHidden();
        await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();
        await expect(page.getByText("It's gone!")).toBeVisible();
        await page.getByRole('button', { name: 'Add' }).click();
        await expect(page.getByRole('checkbox')).toBeVisible();
        await expect(page.getByText("It's back!")).toBeVisible();
    });
});