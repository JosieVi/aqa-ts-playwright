import { STATUS_CODES } from "data/status-codes.data";
import { TAGS } from "data/test-tags.data";
import { expect, test } from "fixtures/ui-services.fixture";

test.describe("[E2E] [UI] [Customers] [Create]", () => {
    let id = "";
    let token = "";
    test(
        "Create a new customer via UI with smoke data ",
        { tag: [TAGS.SMOKE, TAGS.REGRESSION] },
        async ({ homeUIService, customersUIService, addNewCustomerUIService, customersController, page }) => {
            // Open the home page and log in as a user
            homeUIService.openAsLoggedInUser();
            token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;

            // Navigate to the Customers module and open the Add Customer page
            await homeUIService.openModule("Customers");
            await customersUIService.openAddPage();

            // Create a new customer using the Add New Customer UI service
            const createdCustomer = await addNewCustomerUIService.createNewCustomer();
            const response = await customersController.getById(createdCustomer._id, token);
            id = createdCustomer._id;

            // Verify that the customer was created successfully
            expect(response.status).toBe(STATUS_CODES.OK);
        }
    );

    // Clean up after the test by deleting the created customer
    test.afterEach(async ({ customersController }) => {
        await customersController.delete(id, token);
    });
});