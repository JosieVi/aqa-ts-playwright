import { TAGS } from "data/test-tags.data";
import { expect, test } from "fixtures/ui-services.fixture";
import _ from "lodash";
import { convertToDateAndTime } from "utils/date.utils";

test.describe("[E2E] [UI] [Customers] [Details]", () => {
    let token = "";
    let id = "";

    test(
        "Should display customer details after creation",
        { tag: [TAGS.SMOKE, TAGS.REGRESSION] },
        async ({
            page,
            homeUIService,
            customersUIService,
            customersApiService,
            customerDetailsPage }) => {

            // Open the home page and log in as a user
            await homeUIService.openAsLoggedInUser();
            token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;

            // Create a new customer using the Customers API service 
            const createdCustomer = await customersApiService.create(token);
            id = createdCustomer._id;

            // Verify that the created customer details are displayed correctly in the details page
            await homeUIService.openModule("Customers");
            await customersUIService.openDetailsPage(createdCustomer.email);
            const actualData = await customerDetailsPage.getDetails();
            expect(actualData).toMatchObject({
                ..._.omit(createdCustomer, "_id"),
                createdOn: convertToDateAndTime(createdCustomer.createdOn),
            });
        }
    );

    // Clean up after the test by deleting the created customer
    test.afterEach(async ({ customersController }) => {
        await customersController.delete(id, token);
    });
});