import { USER_LOGIN, USER_PASSWORD } from "config/enviroment";
import { customerSchema } from "data/schemas/customers/customer.schema";
import { STATUS_CODES } from "data/status-codes.data";
import _ from "lodash";
import { validateSchema } from "utils/validations/schema-validation";
import { test, expect } from "fixtures/controllers.fixture";
import { validateResponse } from "utils/validations/response-validation";
import { positiveTestCases } from "data/positive-customers.data";

test.describe("[API] [Customers] [Create]", () => {
    let id = "";
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

    positiveTestCases.forEach(({ name, data }) => {
        test(name, async ({ customersController }) => {
            const customerResponse = await customersController.create(data, token);
            id = customerResponse.body.Customer._id;
            validateSchema(customerSchema, customerResponse.body);
            validateResponse(customerResponse, STATUS_CODES.CREATED, true, null);
            expect.soft(customerResponse.body.Customer).toMatchObject({ ...data });
        });
    });

    test.afterEach(async ({ customersController }) => {
        if (!id) return;
        const response = await customersController.delete(id, token);
        expect.soft(response.status).toBe(STATUS_CODES.DELETED);
    });
});