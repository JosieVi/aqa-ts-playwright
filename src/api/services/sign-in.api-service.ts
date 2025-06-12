import { APIRequestContext, test } from "@playwright/test";
import { SignInController } from "api/controllers/sign-in-hw24-1.controller";
import { USER_LOGIN, USER_PASSWORD } from "config/enviroment";
import { STATUS_CODES } from "data/status-codes.data";
import { validateResponse } from "utils/validations/response-validation";
import { logStep } from "utils/reporter.utils";

export class SignInApiService {

    controller: SignInController;

    constructor(request: APIRequestContext) {
        this.controller = new SignInController(request);
    }

    @logStep("Login as local user via API with default credentials")
    async loginAsLocalUser() {
        const response = await this.controller.signIn({
            username: USER_LOGIN,
            password: USER_PASSWORD,
        });

        validateResponse(response, STATUS_CODES.OK, true, null);
        const token = response.headers["authorization"];
        return token;
    }
}