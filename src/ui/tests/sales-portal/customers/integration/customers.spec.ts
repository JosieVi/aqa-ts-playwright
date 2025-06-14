import { apiConfig } from "config/api-config";
import { COUNTRIES } from "data/customers/countries.data";
import { TAGS } from "data/test-tags.data";
import { expect, test } from "fixtures/ui-services.fixture";
import { customersSortField, sortDirection } from "types/api.types";

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

                    await homeUIService.openAsLoggedInUser();
                    await homeUIService.openModule("Customers");

                    await expect(customersPage.table).toHaveScreenshot();
                });
        });
    });

    test("Should send correct query clicking on Created On header",
        { tag: [TAGS.REGRESSION] },
        async ({ homeUIService, customersPage, page }) => {

            await homeUIService.openAsLoggedInUser();
            await homeUIService.openModule("Customers");

            // const [request] = await Promise.all([
            //  page.waitForRequest((request) => request.url().includes(apiConfig.ENDPOINTS.CUSTOMERS)),
            //  customersPage.clickTableHeader("createdOn"),
            // ]);
            const request = await customersPage.interceptRequest(
                apiConfig.ENDPOINTS.CUSTOMERS,
                customersPage.clickTableHeader.bind(customersPage),
                "createdOn"
            );

            expect(request.url()).toBe(
                `${apiConfig.BASE_URL}/${apiConfig.ENDPOINTS.CUSTOMERS}?sortField=createdOn&sortOrder=asc&page=1&limit=10`
            );
        });
});