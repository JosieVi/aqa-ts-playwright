import { apiConfig } from "config/api-config";
import { COUNTRIES } from "data/customers/countries.data";
import { TAGS } from "data/test-tags.data";
import { expect, test } from "fixtures/ui-services.fixture";
import { customersSortField, sortDirection } from "types/api.types";
// import { expect, test } from "fixtures/business-steps.fixture";

test.describe("[UI] [Customers] [Table component]", async () => {
    const customer = {
        email: "aaa@gmail.com",
        name: "Anatoly Karpovich",
        country: "USA" as COUNTRIES,
        city: "Warszawa",
        street: "asda",
        house: 321,
        flat: 123,
        phone: "+1111111111111111111",
        createdOn: "2025-05-13T17:33:12.000Z",
        notes: "asdasda",
        _id: "68238258d006ba3d47613e8d",
    };

    // Define the fields and directions for sorting
    const fields: customersSortField[] = ["createdOn", "email", "name", "country"];
    const directions: sortDirection[] = ["desc", "asc"];

    fields.forEach((field) => {
        directions.forEach((direction) => {
            test(`Should display correct sorting for ${field} field and ${direction} direction`,
                { tag: [TAGS.REGRESSION] },
                async ({
                    // loginAsLocalUser,
                    customersPage,
                    mock,
                    homeUIService,
                }) => {

                    // Mock the API response for customers
                    await mock.customers({
                        Customers: [
                            {
                                ...customer,
                            },
                        ],
                        ErrorMessage: null,
                        IsSuccess: true,
                        sorting: {
                            sortField: field,
                            sortOrder: direction,
                        },
                    });

                    // Open the home page and navigate to the Customers module v1
                    /*                     
                    await loginAsLocalUser();
                    await customersPage.open();
                    await customersPage.waitForOpened();
                    */

                    // Open the home page and navigate to the Customers module
                    await homeUIService.openAsLoggedInUser();
                    await homeUIService.openModule("Customers");

                    // Take a screenshot of the table after sorting by the specified field and direction
                    await expect(customersPage.table).toHaveScreenshot();
                });
        });
    });

    test("Should send correct query clicking on Created On header",
        { tag: [TAGS.REGRESSION] },
        async ({ homeUIService, customersPage, page }) => {

            // Open the home page and intercept the request v1
            /*
            await loginAsLocalUser();        
            await customersPage.open();
            await customersPage.waitForOpened();
            const [request] = await Promise.all([
              page.waitForRequest((request) => request.url().includes(apiConfig.ENDPOINTS.CUSTOMERS)),
              customersPage.clickTableHeader("createdOn"),
            ]);
            */

            // Open the home page and navigate to the Customers module
            await homeUIService.openAsLoggedInUser();
            await homeUIService.openModule("Customers");

            // Intercept the request when clicking on the Created On header
            const request = await customersPage.interceptRequest(
                apiConfig.ENDPOINTS.CUSTOMERS,
                customersPage.clickTableHeader.bind(customersPage),
                "createdOn"
            );

            // Verify that the request URL is correct
            expect(request.url()).toBe(
                `${apiConfig.BASE_URL}/${apiConfig.ENDPOINTS.CUSTOMERS}?sortField=createdOn&sortOrder=asc&page=1&limit=10`
            );
        });
});