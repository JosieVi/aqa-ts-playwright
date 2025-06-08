import { CustomersApiService } from "api/services/customers.api-service";
import { test as base } from "fixtures/controllers.fixture";
import { SignInApiService } from "api/services/sign-in.api-service";
// import { AuthorizationService } from "api/services/authorization.api-service";

interface IApiServices {
    customersApiService: CustomersApiService;
    signInApiService: SignInApiService;
}

export const test = base.extend<IApiServices>({
    customersApiService: async ({ request }, use) => {
        await use(new CustomersApiService(request));
    },

    signInApiService: async ({ request }, use) => {
        await use(new SignInApiService(request));
    },
});

export { expect } from "@playwright/test";