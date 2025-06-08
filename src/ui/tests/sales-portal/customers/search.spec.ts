// import { test, expect } from "fixtures/business-steps.fixture";
import { TAGS } from "data/test-tags.data";
import { expect, test } from "fixtures/ui-services.fixture";

test.describe("[UI] [Customers] [Search]", async () => {
    test("Should search for existing customer by email",
        { tag: TAGS.REGRESSION },
        async ({
            homeUIService,
            customersPage
        }) => {

            // Open the home page and open the Customers module
            homeUIService.openAsLoggedInUser();
            await homeUIService.openModule("Customers");

            // Specify the expected customer data
            const expected = {
                email: "bshamukov1748645041366@test.com",
                name: "Test tMIdetKiEMWqZeDCVBPVJoXUXfhZQayWNBG",
                country: "Belarus",
            };

            // Search for the customer by email and verify the results
            await customersPage.search(expected.email);
            await expect.soft(customersPage.tableRow).toHaveCount(1);
            const actual = await customersPage.getCustomerData(expected.email);
            expect.soft(actual).toMatchObject(expected);
            await expect.soft(customersPage.searchChipButton).toHaveText(expected.email);
        });
});