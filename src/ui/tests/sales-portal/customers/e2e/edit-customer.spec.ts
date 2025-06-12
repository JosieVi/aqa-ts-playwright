import { STATUS_CODES } from "data/status-codes.data";
import { TAGS } from "data/test-tags.data";
import { expect, test } from "fixtures/ui-services.fixture";

test.describe("[E2E] [UI] [Customers] [Edit]", () => {
    let id = "";
    let token = "";
    test("Should edit a customer via UI",
        { tag: [TAGS.REGRESSION] },
        async ({
            page,
            homeUIService,
            customersUIService,
            editCustomerUIService,
            customersController,
            customersApiService
        }) => {

            await homeUIService.openAsLoggedInUser();
            token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;

            const createdCustomer = await customersApiService.create(token);

            await homeUIService.openModule("Customers");
            await customersUIService.openEditPage(createdCustomer.email);
            const updatedCustomer = await editCustomerUIService.edit();
            const response = await customersController.getById(updatedCustomer._id, token);
            id = updatedCustomer._id;
            expect(response.status).toBe(STATUS_CODES.OK);
        });

    test.afterEach(async ({ customersController }) => {
        await customersController.delete(id, token);
    });
});