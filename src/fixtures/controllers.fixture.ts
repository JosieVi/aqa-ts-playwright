import { test as base } from "@playwright/test";
import { CustomersController } from "api/controllers/customer.controller";
import { SignInController } from "api/controllers/sign-in-hw24-1.controller";

interface ISalesPortalControllers {
    customersController: CustomersController;
    signInController: SignInController;
}

export const test = base.extend<ISalesPortalControllers>({
    customersController: async ({ }, use) => {
        await use(new CustomersController());
    },
    signInController: async ({ }, use) => {
        await use(new SignInController());
    },
});
export { expect } from "@playwright/test";