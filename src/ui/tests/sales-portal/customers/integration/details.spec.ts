
import { COUNTRIES } from "data/customers/countries.data";
import { expect, test } from "fixtures/ui-services.fixture";
import { convertToDateAndTime } from "utils/date.utils";
/*
import { apiConfig } from "config/api-config";
import { expect, test } from "fixtures/business-steps.fixture";
*/

test.describe("[UI] [Customers] [Details]", async () => {
    test("Should display valid customer data",
        { tag: ["@critical path"] },
        async ({
            // loginAsLocalUser,
            customerDetailsPage,
            mock,
            homeUIService,
        }) => {

            const expected = {
                email: "user@domain.com",
                name: "User",
                country: "Belarus" as COUNTRIES,
                city: "Minsk",
                street: "Main",
                house: 5,
                flat: 1,
                phone: "+9912312331245132",
                createdOn: "2025-03-08T03:00:46.000Z",
                notes: "qwe",
            };
            const id = "67cb88af92fabac8b74e2f72";

            // Mock the API response for customer details v1
            /*            
            await mock.customers({
                Customers: [
                    {
                        _id: id,
                        ...expected,
                    },
                ],
                ErrorMessage: null,
                IsSuccess: true,
                sorting: {
                    sortField: "createdOn",
                    sortOrder: "desc",
                },
            });
            */


            await mock.customerDetails({ Customer: { _id: id, ...expected }, ErrorMessage: null, IsSuccess: true });

            // Open the home page and navigate to the Customers module and open the customer details v1
            /*            
            await loginAsLocalUser();
            await homePage.clickModuleButton("Customers");
            await customersPage.waitForOpened();

            await customersPage.clickTableAction("aaa@gmail.com", "details");
            await page.evaluate(async (id: string) => {
                await (
                    window as typeof window & { renderCustomerDetailsPage: (id: string) => Promise<void> }
                ).renderCustomerDetailsPage(id);
            }, id);
            */

            await homeUIService.openAsLoggedInUser();
            await homeUIService.openModule("Customers");

            await customerDetailsPage.open(id);
            await customerDetailsPage.waitForOpened();

            const actual = await customerDetailsPage.getDetails();
            expect(actual).toEqual({ ...expected, createdOn: convertToDateAndTime(expected.createdOn) });
        });
});