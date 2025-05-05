import { test, expect } from "fixtures/business-steps.fixture";
import { generateCustomerData } from "data/customers/generate-customer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import { ICustomerInTable } from "types/customer.types";

test.describe('[UI] [Sales Portal] [Customers]', () => {
    test("Should delete an existing customer", async ({ customersPage, homePage, addNewCustomerPage, loginAsLocalUser }) => {
        //Precondition
        await loginAsLocalUser();
        await homePage.clickModuleButton('Customers');
        await customersPage.waitForOpened();
        await customersPage.clickAddNewCustomer();
        await addNewCustomerPage.waitForOpened();
        const data = generateCustomerData();
        await addNewCustomerPage.fillInputs(data);
        await addNewCustomerPage.clickSaveNewCustomer();
        await customersPage.waitForOpened();
        await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
        const expectedObject = {
            email: data.email,
            name: data.name,
            country: data.country,
        };
        const receivedObject: ICustomerInTable = await customersPage.getFirstCustomerData();
        await expect(receivedObject).toEqual(expectedObject);

        //Action
        await customersPage.clickDeleteCustomer(data.email);
        await customersPage.deleteModal.clickYes();
        await customersPage.deleteModal.waitForClosed();

        //Assert
        await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
        await expect(customersPage.tableRowByEmail(data.email)).not.toBeVisible();
    });
});