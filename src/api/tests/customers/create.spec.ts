import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/enviroment";
import { generateCustomerData } from "data/customers/generate-customer.data";
import { customerSchema } from "data/schemas/customers/customer.schema";
import { STATUS_CODES } from "data/status-codes.data";
import _ from "lodash";
import { validateSchema } from "utils/validations/schema-validation";
import { test, expect } from "fixtures/controllers.fixture";
import { validateResponse } from "utils/validations/response-validation";


test.describe("[API] [Customers] [Create]", () => {
    let id = "";
    let token = "";

    test.skip("Create customer with smoke data", async ({ request }) => {
        const loginResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN, {
            data: { username: USER_LOGIN, password: USER_PASSWORD },
            headers: {
                "content-type": "application/json",
            },
        });

        const headers = loginResponse.headers();
        token = headers["authorization"];
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

        const customerData = generateCustomerData();
        const customerResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS, {
            data: customerData,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const customerBody = await customerResponse.json();

        id = customerBody.Customer._id;
        validateSchema(customerSchema, customerBody);
        expect.soft(customerResponse.status()).toBe(STATUS_CODES.CREATED);
        // expect.soft(customerBody.Customer).toMatchObject({ ...customerData });
        expect.soft({ ...customerData }).toMatchObject(_.omit(customerBody.Customer, "_id", "createdOn"));
        expect.soft(body.ErrorMessage).toBe(null);
        expect.soft(body.IsSuccess).toBe(true);

        const response = await request.delete(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(id), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect.soft(response.status()).toBe(STATUS_CODES.DELETED);
    });

    test("Create customer with smoke data and Controller", async ({ request, customersController, signInController }) => {
        const credentials = { email: USER_LOGIN, password: USER_PASSWORD };
        const loginResponse = await signInController.signIn(credentials);
        const headers = loginResponse.headers;
        token = headers["authorization"];
        const expectedUser = {
            _id: "680d4d7dd006ba3d475ff67b",
            username: "OlgaMarushkina",
            firstName: "Olga",
            lastName: "Marushkina",
            roles: ["USER"],
            createdOn: "2025/04/26 21:17:49",
        };
        expect.soft(loginResponse.headers.authorization).toBeTruthy();
        expect.soft(loginResponse.body.User).toMatchObject(expectedUser);
        validateResponse(loginResponse, STATUS_CODES.OK, true, null);

        const customerData = generateCustomerData();
        const customerResponse = await customersController.create(customerData, token);
        id = customerResponse.body.Customer._id;

        validateSchema(customerSchema, customerResponse.body);
        validateResponse(customerResponse, STATUS_CODES.CREATED, true, null);
        expect.soft(customerResponse.body.Customer).toMatchObject({ ...customerData });
    });

    test.afterEach(async ({ customersController }) => {
        if (!id) return;
        const response = await customersController.delete(id, token);
        expect.soft(response.status).toBe(STATUS_CODES.DELETED);
    });
});
