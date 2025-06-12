import { expect, test } from "fixtures/ui-services.fixture";
import { generateCustomerData } from 'data/customers/generate-customer.data';
import { NOTIFICATIONS } from 'data/notifications.data';
import { ICustomerInTable } from 'types/customer.types';
import { TAGS } from "data/test-tags.data";
/*
import { test, expect, Page } from '@playwright/test';
import { SALES_PORTAL_URL, USER_LOGIN, USER_PASSWORD } from 'config/enviroment';
import { AddNewCustomerPage } from 'ui/pages/customers/add-new-customer.page';
import { CustomersPage } from 'ui/pages/customers/customers.page';
import { HomePage } from 'ui/pages/home.page';
import { SignInPage } from 'ui/pages/sign-in.page';
*/

test.describe('[UI] [Sales Portal] [e2e] HW21-2', () => {
    let token = "";
    test('Should create a new customer and verify creation notification and table entry',
        { tag: [TAGS.SMOKE, TAGS.REGRESSION] },
        async ({
            page,
            homeUIService,
            customersUIService,
            addNewCustomerUIService,
            customersPage
        }) => {

            /*
            const signInPage = new SignInPage(page);
            const homePage = new HomePage(page);
            const customersPage = new CustomersPage(page);
            const addNewCustomerPage = new AddNewCustomerPage(page);
            await page.goto(SALES_PORTAL_URL);
            await signInPage.fillCredentials({ email: USER_LOGIN, password: USER_PASSWORD });
            await signInPage.clickLogin();
            await homePage.waitForOpened();
            await homePage.clickModuleButton('Customers');
            await customersPage.waitForOpened();
            await customersPage.clickAddNewCustomer();
            await addNewCustomerPage.waitForOpened();
            const data = generateCustomerData();

            await addNewCustomerPage.fillInputs(data);
            await addNewCustomerPage.clickSaveNewCustomer();

            await customersPage.waitForOpened();
            await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
            */

            await homeUIService.openAsLoggedInUser();
            token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;
            await homeUIService.openModule("Customers");

            await customersUIService.openAddPage();
            const data = generateCustomerData();
            await addNewCustomerUIService.createNewCustomer(data);
            await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

            const expectedObject = {
                email: data.email,
                name: data.name,
                country: data.country,
            };

            const receivedObject: ICustomerInTable = await customersPage.getFirstCustomerData();
            await expect(receivedObject).toEqual(expectedObject);
        });
});