import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api-config";
import { ILoginResponseBody, IRequestOptions } from "types/api.types";
import { IAPICredentials } from "types/sign-in.types";
import { APIRequestContext, test } from "@playwright/test";

export class SignInController {

    // Create a new instance of RequestApi with the provided APIRequestContext
    private request: RequestApi;

    constructor(context: APIRequestContext) {
        this.request = new RequestApi(context);
    }

    async signIn(body: IAPICredentials) {
        return await test.step("Sign in via API", async () => {
            const options: IRequestOptions = {
                baseURL: apiConfig.BASE_URL,
                url: apiConfig.ENDPOINTS.LOGIN,
                method: "post",
                data: body,
                headers: {
                    "content-type": "application/json",
                },
            };
            return await this.request.send<ILoginResponseBody>(options);
        });
    }
}
