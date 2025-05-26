import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api-config";
import { ILoginResponseBody, IRequestOptions } from "types/api.types";
import { IAPICredentials, ICredentials, ILoginFromResponse } from "types/sign-in.types";
import { APIRequestContext } from "@playwright/test";

export class SignInController {
    private request: RequestApi;
    constructor(context: APIRequestContext) {
        this.request = new RequestApi(context);
    }

    // constructor(private request = new RequestApi()) { }

    // login
    async signIn(body: IAPICredentials) {
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
        // return await this.request.send<ILoginFromResponse>(options);
    }
}