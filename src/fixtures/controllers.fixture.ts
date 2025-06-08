// Description:
// This file extends the base test fixture to include controllers for customers, products, and sign-in.

import { test as base } from "@playwright/test";
import { CustomersController } from "api/controllers/customers.controller";
import { ProductsController } from "api/controllers/products-hw26.controller";
import { SignInController } from "api/controllers/sign-in-hw24-1.controller";

interface ISalesPortalControllers {
    customersController: CustomersController;
    productsController: ProductsController;
    signInController: SignInController;
}

export const test = base.extend<ISalesPortalControllers>({
    customersController: async ({ request }, use) => {
        await use(new CustomersController(request));
    },
    productsController: async ({ request }, use) => {
        await use(new ProductsController(request));
    },
    signInController: async ({ request }, use) => {
        await use(new SignInController(request));
    },
});

export { expect } from "@playwright/test";