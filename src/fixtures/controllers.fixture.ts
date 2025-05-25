import { test as base } from "@playwright/test";
import { CustomersController } from "api/controllers/customers.controller";
import { ProductsController } from "api/controllers/products.controller";
import { SignInController } from "api/controllers/sign-in-hw24-1.controller";

interface ISalesPortalControllers {
    customersController: CustomersController;
    productsController: ProductsController;
    // signInController: SignInController;
}

export const test = base.extend<ISalesPortalControllers>({
    customersController: async ({ request }, use) => {
        await use(new CustomersController(request));
    },
    productsController: async ({ request }, use) => {
        await use(new ProductsController(request));
    }
    // signInController: async ({ }, use) => {
    //     await use(new SignInController);
    // },
});
export { expect } from "@playwright/test";