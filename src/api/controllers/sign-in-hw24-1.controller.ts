import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api-config";
import { ILoginResponseBody, IRequestOptions } from "types/api.types";
import { ICredentials } from "types/sign-in.types";

export class SignInController {
    constructor(private request = new RequestApi()) { }
    async signIn(body: ICredentials) {
        const options: IRequestOptions = {
            url: apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN,
            method: "post",
            data: body,
            headers: {
                "content-type": "application/json",
            },
        };
        return await this.request.send<ILoginResponseBody>(options);
    }
}