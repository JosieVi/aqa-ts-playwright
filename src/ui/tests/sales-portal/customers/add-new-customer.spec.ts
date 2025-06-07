
import { test } from "fixtures/ui-services.fixture";
import { generateCustomerData } from "data/customers/generate-customer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import { TAGS } from "data/test-tags.data";
/*
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
*/

test.describe("[UI] [Customers] [Create]", async () => {

    let token = "";
    let id = "";

    test("Should create new customer via UI with smoke data",
        { tag: [TAGS.SMOKE, TAGS.REGRESSION] },
        async ({ homeUIService, customersUIService, addNewCustomerUIService, customersPage, customersController, page }) => {

            // Open the home page and log in as a user via UI v1    
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
            await addNewCustomerPage.fillInputs(data);
            await addNewCustomerPage.clickSaveNewCustomer();
            await customersPage.waitForOpened();
            await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
            */

            // Open the home page and log in as a user
            homeUIService.openAsLoggedInUser();
            token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;

            // Open the Customers module and open the Add Customer page
            await homeUIService.openModule("Customers");
            await customersUIService.openAddPage();

            // Create a new customer with generated data
            const data = generateCustomerData();
            const createdCustomer = await addNewCustomerUIService.createNewCustomer(data);
            id = createdCustomer._id;
            await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

            // Delete the created customer after the test
            await customersController.delete(id, token);
        });

    test("Should NOT create new customer via UI with duplicated data",
        { tag: [TAGS.CRITICAL_PATH] },
        async ({
            homeUIService,
            customersUIService,
            addNewCustomerUIService,
            customersPage,
            page
        }) => {

            // Open the home page and log in as a user via UI v1
            // Open the Customers module and create a new customer v1

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
    
            await customersPage.clickAddNewCustomer();
            await addNewCustomerPage.waitForOpened();
            await addNewCustomerPage.fillInputs(generateCustomerData({ email: data.email }));
            await addNewCustomerPage.clickSaveNewCustomer();
            await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DUPLICATED(data.email));
            */

            // Open the home page and log in as a user
            homeUIService.openAsLoggedInUser();
            token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;

            // Open the Customers module and open the Add Customer page
            await homeUIService.openModule("Customers");
            await customersUIService.openAddPage();

            // Create a new customer with generated data
            const data = generateCustomerData();
            const createdCustomer = await addNewCustomerUIService.createNewCustomer(data);
            await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

            // Try to create a duplicated customer with the same email
            await customersUIService.openAddPage();
            await addNewCustomerUIService.createDuplicatedCustomer(data);
            id = createdCustomer._id;
            await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DUPLICATED(data.email));
        });
});