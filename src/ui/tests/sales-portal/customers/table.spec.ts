
import { expect, test } from "fixtures/ui-services.fixture";
import { generateCustomerData } from "data/customers/generate-customer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import _ from "lodash";
import { TAGS } from "data/test-tags.data";
// import { test, expect } from "fixtures/business-steps.fixture";
// import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
// import { CustomersPage } from "ui/pages/customers/customers.page";
// import { HomePage } from "ui/pages/home.page";


test.describe("[UI] [Customers] [Table]", async () => {
  test("Should check created customer in table",
    { tag: [TAGS.REGRESSION] },
    async ({
      homeUIService,
      customersPage,
      customersUIService,
      addNewCustomerUIService
    }) => {

      /*      
      const homePage = new HomePage(page);
      const customersPage = new CustomersPage(page);
      const addNewCustomerPage = new AddNewCustomerPage(page);
      await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
      await page.locator("#emailinput").fill("test@gmail.com");
      await page.locator("#passwordinput").fill("12345678");
      await page.getByRole("button", { name: "Login" }).click();

      await homePage.waitForOpened();
      await homePage.clickModuleButton("Customers");
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
      await homeUIService.openModule("Customers");

      await customersUIService.openAddPage();
      const data = generateCustomerData();
      await addNewCustomerUIService.createNewCustomer(data);
      await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

      await expect(customersPage.tableRowByEmail(data.email)).toBeVisible();

      // await expect.soft(customersPage.emailCell(data.email)).toHaveText(data.email);
      const actualCustomerData = await customersPage.getCustomerData(data.email);
      expect(actualCustomerData).toEqual(_.pick(data, ["email", "name", "country"]));

      await customersPage.clickTableAction(data.email, "delete");
    });

  test("Should check filtered by country table data",
    { tag: [TAGS.REGRESSION] },
    async ({
      customersPage,
      homeUIService }) => {

      /*      
      await page.goto(SALES_PORTAL_URL);
      await page.locator("#emailinput").fill(USER_LOGIN);
      await page.locator("#passwordinput").fill(USER_PASSWORD);
      await page.getByRole("button", { name: "Login" }).click();

      await homePage.waitForOpened();
      await loginAsLocalUser();

      await homePage.openPortal();
      await homePage.clickModuleButton("Customers");
      await customersPage.waitForOpened();
      */

      await homeUIService.openAsLoggedInUser();
      await homeUIService.openModule("Customers");

      await customersPage.clickFilter();
      await customersPage.filterModal.waitForOpened();
      const countriesToCheck = ["USA", "Belarus", "Germany"];
      await customersPage.filterModal.checkFilters(...countriesToCheck);
      await customersPage.filterModal.clickApply();
      await customersPage.filterModal.waitForClosed();
      await customersPage.waitForOpened();

      const actualTableData = await customersPage.getTableData();
      expect(
        actualTableData.every((row) => countriesToCheck.includes(row.country)),
        `Expect table to contain only customers from ${countriesToCheck.join(", ")}`
      ).toBe(true);
    });
});