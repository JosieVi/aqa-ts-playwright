import { test, expect, Page } from '@playwright/test';
import { SALES_PORTAL_URL, USER_LOGIN, USER_PASSWORD } from 'config/enviroment';
import { generateCustomerData } from 'data/customers/generate-customer.data';
import { NOTIFICATIONS } from 'data/notifications.data';
import { ICustomerInTable } from 'types/customer.types';
import { AddNewCustomerPage } from 'ui/pages/customers/add-new-customer.page';
import { CustomersPage } from 'ui/pages/customers/customers.page';
import { HomePage } from 'ui/pages/home.page';
import { LoginPage } from "ui/pages/login.page";

test.describe('[UI] [Sales Portal] [e2e] HW21-2', () => {
    test('Should create a new customer and verify creation notification and table entry', async ({ page }) => {
        //Precondition
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const customersPage = new CustomersPage(page);
        const addNewCustomerPage = new AddNewCustomerPage(page);
        await page.goto(SALES_PORTAL_URL);
        await loginPage.fillCredentials(USER_LOGIN, USER_PASSWORD);
        await loginPage.clickLogin();
        await homePage.waitForOpened();
        await homePage.clickModuleButton('Customers');
        await customersPage.waitForOpened();
        await customersPage.clickAddNewCustomer();
        await addNewCustomerPage.waitForOpened();
        const data = generateCustomerData();

        //Action
        await addNewCustomerPage.fillInputs(data);
        await addNewCustomerPage.clickSaveNewCustomer();

        //Assert
        await customersPage.waitForOpened();
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