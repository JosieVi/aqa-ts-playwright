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

      await homeUIService.openAsLoggedInUser();
      token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;

      await homeUIService.openModule("Customers");
      await customersUIService.openAddPage();

      const data = generateCustomerData();
      await addNewCustomerUIService.createNewCustomer(data);
      await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

      await customersPage.clickTableAction(data.email, "delete");
      await customersPage.deleteCustomerModal.waitForOpened();
      await customersPage.deleteCustomerModal.clickDelete();
      await customersPage.deleteCustomerModal.waitForClosed();

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

      await homeUIService.openAsLoggedInUser();
      token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;

      await homeUIService.openModule("Customers");
      await customersUIService.openAddPage();

      const data = generateCustomerData();
      await addNewCustomerUIService.createNewCustomer(data);
      await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

      await customersPage.clickTableAction(data.email, "edit");
      await editCustomerPage.waitForOpened();

      await editCustomerPage.clickDeleteCustomer();
      await editCustomerPage.deleteCustomerModal.waitForOpened();
      await editCustomerPage.deleteCustomerModal.clickDelete();
      await editCustomerPage.deleteCustomerModal.waitForClosed();

      await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
      await expect(customersPage.tableRowByEmail(data.email)).not.toBeVisible();
      await customersPage.search(data.email);
      await expect(customersPage.emptyTableRow).toHaveText(EMPTY_TABLE_ROW_TEXT);
    });
});