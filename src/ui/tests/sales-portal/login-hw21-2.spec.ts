import { test, expect, Page } from '@playwright/test';
import { credentials } from "data/credentials.data";
import { generateCustomerData } from 'data/customers/generate-customer.data';
import { NOTIFICATIONS } from 'data/notifications.data';
import { AddNewCustomerPage } from 'ui/pages/customers/add-new-customer.page';
import { CustomersPage } from 'ui/pages/customers/customers.page';
import { HomePage } from 'ui/pages/home.page';
import { LoginPage } from "ui/pages/login.page";

const URL = 'https://anatoly-karpovich.github.io/aqa-course-project/#/';

test.describe('[UI] [Sales Portal] [e2e] HW21-2', () => {
    test('Should create a new customer and verify creation notification and table entry', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const customersPage = new CustomersPage(page);
        const addNewCustomerPage = new AddNewCustomerPage(page);
        await page.goto(URL);
        await loginPage.fillCredentials(credentials.validEmail, credentials.validPassword);
        await loginPage.clickLogin();
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
        const firstCustomerRow = await customersPage.getFirstCustomerRow();
        await customersPage.compareCreatedCustomerData(data, firstCustomerRow);
    });
});