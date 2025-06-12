
import { test } from "fixtures/ui-services.fixture";
import { generateCustomerData } from "data/customers/generate-customer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import { TAGS } from "data/test-tags.data";

test.describe("[UI] [Customers] [Create]", async () => {

    let token = "";
    let id = "";

    test("Should create new customer via UI with smoke data",
        { tag: [TAGS.SMOKE, TAGS.REGRESSION] },
        async ({ homeUIService, customersUIService, addNewCustomerUIService, customersPage, customersController, page }) => {

            await homeUIService.openAsLoggedInUser();
            token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;

            await homeUIService.openModule("Customers");
            await customersUIService.openAddPage();

            const data = generateCustomerData();
            const createdCustomer = await addNewCustomerUIService.createNewCustomer(data);
            id = createdCustomer._id;
            await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

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

            await homeUIService.openAsLoggedInUser();
            token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;

            await homeUIService.openModule("Customers");
            await customersUIService.openAddPage();

            const data = generateCustomerData();
            const createdCustomer = await addNewCustomerUIService.createNewCustomer(data);
            await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

            await customersUIService.openAddPage();
            await addNewCustomerUIService.createDuplicatedCustomer(data);
            id = createdCustomer._id;
            await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DUPLICATED(data.email));
        });
});