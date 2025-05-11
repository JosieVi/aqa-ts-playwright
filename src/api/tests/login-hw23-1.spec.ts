import test, { expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/enviroment";
import { STATUS_CODES } from "data/status-code.data";
import { validateSchema } from "utils/validations/schema-validation";
import { loginSchema } from "data/schemas/login.schema";

test.describe("[API] [Login] Smoke Test", () => {
    test('Login with valid credentials', async ({ request }) => {
        const loginResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN, {
            data: {
                username: USER_LOGIN,
                password: USER_PASSWORD,
            },
            headers: {
                "content-type": "application/json",
            },
        });

        const headers = loginResponse.headers();
        const token = headers["authorization"];
        const body = await loginResponse.json();
        const expectedUser = {
            _id: "680d4d7dd006ba3d475ff67b",
            username: "OlgaMarushkina",
            firstName: "Olga",
            lastName: "Marushkina",
            roles: ["USER"],
            createdOn: "2025/04/26 21:17:49",
        };

        expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
        expect.soft(token).toBeTruthy();
        expect.soft(body.User).toMatchObject(expectedUser);
        expect.soft(body.ErrorMessage).toBe(null);
        expect.soft(body.IsSuccess).toBe(true);
        validateSchema(loginSchema, body);
    });
});


