// import { test, expect } from "fixtures/business-steps.fixture";
import { generateCustomerData } from "data/customers/generate-customer.data";
import { TAGS } from "data/test-tags.data";
import { test } from "fixtures/ui-services.fixture";

test.describe("[UI] [Customers] [Edit]", async () => {
    let token = "";
    let id = "";
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

            // Action
            // Create a new customer with generated data
            const customerData = generateCustomerData();
            const customerResponse = await customersController.create(customerData, token);
            // id = customerResponse.body.Customer._id;

            // Open the home page and open the Customers module v1
            /*            
            await homePage.openPortal();
            await homePage.waitForOpened();
            await homePage.clickModuleButton("Customers");
            await customersPage.waitForOpened();
            */

            // Open the home page and open the Customers module
            homeUIService.openAsLoggedInUser();
            await homeUIService.openModule("Customers");


            // Click the edit button for the customer with the specified email
            await customersPage.clickTableAction(customerResponse.body.Customer.email, "edit");

            // Change customer data
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

            // Get the errors after filling the form
            const errors = await editCustomerPage.getFormErrors();
        });
});