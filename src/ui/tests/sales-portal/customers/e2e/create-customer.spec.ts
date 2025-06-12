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

            await homeUIService.openAsLoggedInUser();
            token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;

            await homeUIService.openModule("Customers");
            await customersUIService.openAddPage();

            const createdCustomer = await addNewCustomerUIService.createNewCustomer();
            const response = await customersController.getById(createdCustomer._id, token);
            id = createdCustomer._id;

            expect(response.status).toBe(STATUS_CODES.OK);
        }
    );

    test.afterEach(async ({ customersController }) => {
        await customersController.delete(id, token);
    });
});