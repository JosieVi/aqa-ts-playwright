import { expect, test } from "fixtures/ui-services.fixture";
import { generateCustomerData } from "data/customers/generate-customer.data";
import { EMPTY_TABLE_ROW_TEXT, NOTIFICATIONS } from "data/notifications.data";
import { TAGS } from "data/test-tags.data";
// import { test, expect } from "fixtures/business-steps.fixture";

test.describe('[UI] [Customers] [Delete]', () => {

  let token = "";

  test("Should delete an existing customer",
    { tag: [TAGS.SMOKE, TAGS.REGRESSION] },
    async ({
      customersPage,
      addNewCustomerUIService,
      customersUIService,
      homeUIService,
      page
    }) => {

      //Precondition
      /*
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
      */

      // Open the home page and log in as a user 
      homeUIService.openAsLoggedInUser();
      token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;

      // Open the Customers module and add a new customer
      await homeUIService.openModule("Customers");
      await customersUIService.openAddPage();

      // Create a new customer and wait for the notification
      const data = generateCustomerData();
      await addNewCustomerUIService.createNewCustomer(data);
      await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

      // Assert that the customer is displayed in the table
      /*
      const expectedObject = {
        email: data.email,
        name: data.name,
        country: data.country,
      };
      const receivedObject: ICustomerInTable = await customersPage.getFirstCustomerData();
      await expect(receivedObject).toEqual(expectedObject);
      */

      //Action
      // Click the delete button for the customer and confirm deletion
      await customersPage.clickTableAction(data.email, "delete");
      await customersPage.deleteCustomerModal.waitForOpened();
      await customersPage.deleteCustomerModal.clickDelete();
      await customersPage.deleteCustomerModal.waitForClosed();

      // Assert
      // Wait for the notification and check that the customer is no longer visible in the table
      await customersPage.waitForOpened();
      await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
      await expect(customersPage.tableRowByEmail(data.email)).not.toBeVisible();
      await customersPage.search(data.email);
      await expect(customersPage.emptyTableRow).toHaveText(EMPTY_TABLE_ROW_TEXT);
    });

  test("Should delete customer on Edit Customer page",
    { tag: [TAGS.REGRESSION] },
    async ({
      customersPage,
      addNewCustomerUIService,
      customersUIService,
      homeUIService,
      editCustomerPage,
      page,
    }) => {

      // Precondition
      // Open the home page and log in as a user 
      homeUIService.openAsLoggedInUser();
      token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;

      // Open the Customers module and add a new customer
      await homeUIService.openModule("Customers");
      await customersUIService.openAddPage();

      // Create a new customer and wait for the notification
      const data = generateCustomerData();
      await addNewCustomerUIService.createNewCustomer(data);
      await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

      // Open the Edit Customer page for the created customer
      await customersPage.clickTableAction(data.email, "edit");
      await editCustomerPage.waitForOpened();

      // Click the delete button for the customer and confirm deletion
      await editCustomerPage.clickDeleteCustomer();
      await editCustomerPage.deleteCustomerModal.waitForOpened();
      await editCustomerPage.deleteCustomerModal.clickDelete();
      await editCustomerPage.deleteCustomerModal.waitForClosed();

      // Assert
      // Wait for the notification and check that the customer is no longer visible in the table
      await editCustomerPage.waitForOpened();
      await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
      await expect(customersPage.tableRowByEmail(data.email)).not.toBeVisible();
      await customersPage.search(data.email);
      await expect(customersPage.emptyTableRow).toHaveText(EMPTY_TABLE_ROW_TEXT);
    });
});