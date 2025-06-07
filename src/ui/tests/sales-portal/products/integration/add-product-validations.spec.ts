import { MANUFACTURERS } from "data/products/manufacturers.data";
import { TAGS } from "data/test-tags.data";
import { test } from "fixtures/ui-services.fixture";
import { IProduct } from "types/products.types";

test.describe("[UI] [Products] [Add]", () => {
    test("Should see the correct error message for name field",
        { tag: [TAGS.SMOKE] },
        async ({
            homeUIService,
            productsPage,
            addNewProductPage, }) => {

            // Open the home page and open the Products module
            await homeUIService.openAsLoggedInUser();
            await homeUIService.openModule("Products");

            // Click the "Add New Product" button and add a new product with invalid data
            await productsPage.addNewProductButton.click();
            await addNewProductPage.fillInputs({
                name: 1231451 as unknown as IProduct["name"],
                amount: 1,
                price: 1,
                manufacturer: MANUFACTURERS.APPLE,
                notes: "123",
            });
        });
});