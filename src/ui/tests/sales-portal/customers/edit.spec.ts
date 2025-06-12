import { generateCustomerData } from "data/customers/generate-customer.data";
import { TAGS } from "data/test-tags.data";
import { test } from "fixtures/ui-services.fixture";

test.describe("[UI] [Customers] [Edit]", async () => {
    let token = "";
    test("Edit customer with smoke data",
        { tag: [TAGS.SMOKE, TAGS.REGRESSION] },
        async ({
            homeUIService,
            customersPage,
            editCustomerPage,
            signInApiService,
            customersController
        }) => {

            token = await signInApiService.loginAsLocalUser();

            const customerData = generateCustomerData();
            const customerResponse = await customersController.create(customerData, token);

            await homeUIService.openAsLoggedInUser();
            await homeUIService.openModule("Customers");

            await customersPage.clickTableAction(customerResponse.body.Customer.email, "edit");

            await editCustomerPage.waitForOpened();
            await editCustomerPage.fillInputs({
                email: "Wilburn0@hotmail.com!",
                // city: "@!#",
                // flat: 11111111111111,
                // house: 1111111111111111111,
                // name: "123!@#",
                // notes: "<>",
                // phone: "123",
                // street: "123!@#",
            });

            const errors = await editCustomerPage.getFormErrors();
        });
});