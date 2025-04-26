import { test, expect, Page } from '@playwright/test';

const URL = 'https://anatoly-karpovich.github.io/demo-login-form/';
enum MESSAGES {
    errorWithEmptyPassword = 'Password is required',
    errorWithEmptyUsername = 'Username is required',
    errorWithSpacesOnlyUsername = 'Prefix and postfix spaces are not allowed is username',
    errorWithSpacesOnlyPassword = 'Password is required',
    errorWithShortUsername = 'Username should contain at least 3 characters',
    errorWithLongUsername = 'Username can\'t exceed 40 characters',
    errorWithShortPassword = 'Password should contain at least 8 characters',
    errorWithLongPassword = 'Password can\'t exceed 20 characters',
    errorWithoutLowerCaseinPassword = 'Password should contain at least one character in lower case',
    errorWithoutUpperCaseinPassword = 'Password should contain at least one character in upper case',
    successMessage = 'Successfully registered! Please, click Back to return on login page',
    errorMessageForRepeatedUsername = 'Username is in use',
}

enum CREDENTIAL {
    tooShortPassword = 'shortPa',
    typicalPassword = 'testPassword',
    tooLongPassword = 'testPasswordThisIs21CharactersExactly1',
    tooShortUsername = 'Us',
    typicalUsername = 'TestUsername',
    tooLongUsername = 'TestUsername_ThisIs41CharactersExactly123',
}

interface INegativeRegistration {
    testName: string;
    userName: string;
    password: string;
    errorMessage: string;
}

const negativeRegistrationTestData: INegativeRegistration[] = [
    {
        testName: 'Should Not Register With Empty Password',
        userName: CREDENTIAL.typicalUsername,
        password: '',
        errorMessage: MESSAGES.errorWithEmptyPassword
    },
    {
        testName: 'Should Not Register With Empty Username',
        userName: '',
        password: CREDENTIAL.typicalPassword,
        errorMessage: MESSAGES.errorWithEmptyUsername
    },
    {
        testName: 'Should Not Register With Spaces Only Username',
        userName: '   ',
        password: CREDENTIAL.typicalPassword,
        errorMessage: MESSAGES.errorWithSpacesOnlyUsername
    },
    {
        testName: 'Should Not Register With Spaces Only Password',
        userName: CREDENTIAL.typicalUsername,
        password: '   ',
        errorMessage: MESSAGES.errorWithSpacesOnlyPassword
    },
    {
        testName: 'Should Not Register With Short Username',
        userName: CREDENTIAL.tooShortUsername,
        password: CREDENTIAL.typicalPassword,
        errorMessage: MESSAGES.errorWithShortUsername
    },
    {
        testName: 'Should Not Register With Short Password',
        userName: CREDENTIAL.typicalUsername,
        password: CREDENTIAL.tooShortPassword,
        errorMessage: MESSAGES.errorWithShortPassword
    },
    {
        testName: 'Should Not Register Username With Trimmed Spaces',
        userName: `   ${CREDENTIAL.typicalUsername}   `,
        password: CREDENTIAL.typicalPassword,
        errorMessage: MESSAGES.errorWithSpacesOnlyUsername
    },
    {
        testName: 'Should Not Register Password Without Lowercase',
        userName: CREDENTIAL.typicalUsername,
        password: CREDENTIAL.typicalUsername.toUpperCase(),
        errorMessage: MESSAGES.errorWithoutLowerCaseinPassword
    },
    {
        testName: 'Should Not Register Password Without Uppercase',
        userName: CREDENTIAL.typicalUsername,
        password: CREDENTIAL.typicalUsername.toLowerCase(),
        errorMessage: MESSAGES.errorWithoutLowerCaseinPassword
    },
]

const negativeLengthDataSet: INegativeRegistration[] = [
    {
        testName: 'Should Not Register With Long Username',
        userName: CREDENTIAL.tooLongUsername,
        password: CREDENTIAL.typicalPassword,
        errorMessage: MESSAGES.errorWithLongUsername
    },
    {
        testName: 'Should Not Register With Long Password',
        userName: CREDENTIAL.typicalUsername,
        password: CREDENTIAL.tooLongPassword,
        errorMessage: MESSAGES.errorWithLongPassword
    },
]

test.describe('[UI] [demo-login-form] [Registration] Negative Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        await page.locator('#registerOnLogin').click();
    });

    negativeRegistrationTestData.forEach(({ testName, userName, password, errorMessage }: INegativeRegistration) => {
        test(testName, async ({ page }) => {
            await page.locator('#userNameOnRegister').fill(userName);
            await page.locator('#passwordOnRegister').fill(password);
            await page.locator('#register').click();
            await expect(page.locator('#errorMessageOnRegister')).toContainText(errorMessage);
        });
    });

    negativeLengthDataSet.forEach(({ testName, userName, password, errorMessage }: INegativeRegistration) => {
        test(testName, async ({ page }) => {
            await page.evaluate(() => {
                const inputUserName = document.querySelector('#userNameOnRegister');
                const inputPassword = document.querySelector('#passwordOnRegister');
                if (inputUserName) inputUserName.setAttribute('maxlength', '50');
                if (inputPassword) inputPassword.setAttribute('maxlength', '50');
            });
            await page.locator('#userNameOnRegister').fill(userName);
            await page.locator('#passwordOnRegister').fill(password);
            await page.locator('#register').click();
            await expect(page.locator('#errorMessageOnRegister')).toContainText(errorMessage);
        });
    });

    test('Should Not Allow Registration With Existing Username', async ({ page }) => {
        const repeatedUserName = getRandomUserName();
        await page.locator('#userNameOnRegister').fill(repeatedUserName);
        await page.locator('#passwordOnRegister').fill('testPassword');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText(MESSAGES.successMessage);
        await page.locator('#userNameOnRegister').fill(repeatedUserName);
        await page.locator('#passwordOnRegister').fill('testPassword');
        await page.locator('#register').click();
        await expect(page.locator('#errorMessageOnRegister')).toContainText(MESSAGES.errorMessageForRepeatedUsername);
    });
});


function getRandomUserName(): string {
    const firstNames = ['Aino', 'Eero', 'Lumi', 'Oskari', 'Veera'];
    const lastNames = ['Korhonen', 'Virtanen', 'Mäkinen', 'Nieminen', 'Heikkinen'];
    return `${firstNames[Math.floor(Math.random() * 5)]} ${lastNames[Math.floor(Math.random() * 5)]}`;
}

















