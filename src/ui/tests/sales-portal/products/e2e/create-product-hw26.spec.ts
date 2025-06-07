import { NOTIFICATIONS } from "data/notifications.data";
import { STATUS_CODES } from "data/status-codes.data";
import { TAGS } from "data/test-tags.data";
import { expect, test } from "fixtures/ui-services.fixture";


test.describe("[E2E] [UI] [Products] [Create]", async () => {
    let id = "";
    let token = "";
    test(
        "Should create product with smoke data",
        { tag: [TAGS.SMOKE] },
        async ({
            homeUIService,
            productsUIService,
            addNewProductUIService,
            productsController,
            page,
            productsPage }) => {

            // Precondition
            // Open the home page
            await homeUIService.openAsLoggedInUser();

            token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;

            // Open the Products module and open the Add Product page
            await homeUIService.openModule("Products");
            await productsUIService.openAddPage();

            // Action
            // Create a new product with valid data
            const createdProduct = await addNewProductUIService.create();
            const response = await productsController.getById(createdProduct._id, token);
            id = createdProduct._id;

            // Check that the product is created successfully via API
            expect(response.status).toBe(STATUS_CODES.OK);
            productsPage.waitForNotification(NOTIFICATIONS.PRODUCT_CREATED);
        }
    );

    // Postcondition
    // Delete the created product
    test.afterEach(async ({ productsController }) => {
        await productsController.delete(id, token);
    });
});



















/*

import test, { expect } from "@playwright/test";
import { generateCustomerData } from "data/customers/generate-customer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
    test("Should create customer with smoke data", async ({ page }) => {
        const homePage = new HomePage(page);
        const customersPage = new CustomersPage(page);
        const addNewCustomerPage = new AddNewCustomerPage(page);
        await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
        // await page.locator("#emailinput").fill("test@gmail.com");
        // await page.locator("#passwordinput").fill("12345678");
        // await page.getByRole("button", { name: "Login" }).click();

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
    });

    test("Should NOT create customer with duplicated email", async ({ page }) => {
        const homePage = new HomePage(page);
        const customersPage = new CustomersPage(page);
        const addNewCustomerPage = new AddNewCustomerPage(page);
        await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
        // await page.locator("#emailinput").fill("test@gmail.com");
        // await page.locator("#passwordinput").fill("12345678");
        // await page.getByRole("button", { name: "Login" }).click();

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

        await customersPage.clickAddNewCustomer();
        await addNewCustomerPage.waitForOpened();
        await addNewCustomerPage.fillInputs(generateCustomerData({ email: data.email }));
        await addNewCustomerPage.clickSaveNewCustomer();
        await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DUPLICATED(data.email));
    });
});
*/