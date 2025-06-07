import { test, expect } from "fixtures/controllers.fixture";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/enviroment";
import { STATUS_CODES } from "data/status-codes.data";
import { validateSchema } from "utils/validations/schema-validation";
import { loginSchema } from "data/schemas/login.schema";
import { TAGS } from "data/test-tags.data";

test.describe("[API] [Login]", () => {
    test('Login with valid credentials',
        { tag: [TAGS.SMOKE, TAGS.REGRESSION] },
        async ({ signInController }) => {
            const credentials = { username: USER_LOGIN, password: USER_PASSWORD };
            const loginResponse = await signInController.signIn(credentials);

            const headers = loginResponse.headers;
            const token = headers["authorization"];
            //const body = await loginResponse.json();
            const expectedUser = {
                _id: "680d4d7dd006ba3d475ff67b",
                username: "OlgaMarushkina",
                firstName: "Olga",
                lastName: "Marushkina",
                roles: ["USER"],
                createdOn: "2025/04/26 21:17:49",
            };

            expect.soft(loginResponse.status).toBe(STATUS_CODES.OK);
            expect.soft(token).toBeTruthy();
            expect.soft(loginResponse.body.User).toMatchObject(expectedUser);
            expect.soft(loginResponse.body.ErrorMessage).toBe(null);
            expect.soft(loginResponse.body.IsSuccess).toBe(true);
            validateSchema(loginSchema, loginResponse.body);
        });
});