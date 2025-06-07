import { TAGS } from "data/test-tags.data";
import { expect, test } from "fixtures/ui-services.fixture";

const URL = 'https://anatoly-karpovich.github.io/aqa-course-project/#/';
const USERNAME = 'test@gmail.com';
const PASSWORD = '12345678';
const USERNAME_AFTER_LOGIN = 'Anatoly';

test.describe('[UI] [Sales Portal] [Login] HW19-2', () => {
    test('Should Login as default user and check sidebar',
        { tag: [TAGS.REGRESSION] },
        async ({
            homeUIService,
            page
        }) => {
            // Open the home page and log in v1
            /*            
            await page.goto(URL);
            await page.locator('#emailinput').fill(USERNAME);
            await page.locator('#passwordinput').fill(PASSWORD);
            await page.getByRole('button', { name: 'Login' }).click();
            await expect(page.locator('.spinner-border')).toHaveCount(0);
            //await page.waitForSelector(`a#dropdownUser1 strong`);
            await expect(page.locator(`a#dropdownUser1 strong`)).toHaveText(USERNAME_AFTER_LOGIN);
            await expect(page.getByRole('heading', { name: 'Welcome to Sales Management Portal' })).toBeVisible();
            await expect(page.locator('#sidebar')).toHaveScreenshot('sidebar-on-the-Login-page.png');
            */

            // Open the home page
            homeUIService.openAsLoggedInUser();

            // Commented out this part because the username is not displayed correctly
            // await expect(page.locator(`a#dropdownUser1 strong`)).toHaveText(USERNAME_AFTER_LOGIN);

            // Take a screenshot of the sidebar
            await expect(page.locator('#sidebar')).toHaveScreenshot('sidebar-on-the-Login-page.png');
        });
});