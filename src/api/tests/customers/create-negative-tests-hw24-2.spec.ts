import { USER_LOGIN, USER_PASSWORD } from "config/enviroment";
import { STATUS_CODES } from "data/status-codes.data";
import _ from "lodash";
import { test, expect } from "fixtures/controllers.fixture";
import { validateResponse } from "utils/validations/response-validation";
import { negativeTestCases } from "data/negative-customers.data";
import { TAGS } from "data/test-tags.data";

test.describe("[API] [Customers] [Create]", () => {
    let token = "";

    test.beforeEach(async ({ signInController }) => {
        const credentials = { username: USER_LOGIN, password: USER_PASSWORD };
        const loginResponse = await signInController.signIn(credentials);
        const headers = loginResponse.headers;
        token = headers["authorization"];
        validateResponse(loginResponse, STATUS_CODES.OK, true, null);
        if (!token) {
            throw new Error("Authorization token was not received. Cannot continue tests.");
        }
    });

    negativeTestCases.forEach(({ name, data, expectedError }) => {
        test(name,
            { tag: [TAGS.CRITICAL_PATH, TAGS.API] },
            async ({ customersController }) => {
                const customerResponse = await customersController.update("6849bf511c508c5d5e52929d", data, token);
                console.log("generated data: ", data);
                console.log("response: ", customerResponse.body, "status: ", customerResponse.status);
                validateResponse(customerResponse, STATUS_CODES.BAD_REQUEST, false, expectedError);

            });
    });
});