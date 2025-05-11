import test, { expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/enviroment";
import { STATUS_CODES } from "data/status-code.data";
import { validateSchema } from "utils/validations/schema-validation";
import { generateCustomerData } from "data/customers/generate-customer.data";
import { allCustomersSchema } from "data/schemas/customers/all-customers.schema";
import _ from "lodash";

test.describe("[API] [Customers] Smoke Test", () => {
    test('Get all customers and check schema', async ({ request }) => {
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
        expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
        expect.soft(token).toBeTruthy();

        const customerData = generateCustomerData();
        const customerResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS, {
            data: customerData,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        expect.soft(customerResponse.status()).toBe(STATUS_CODES.CREATED);
        const customerBody = await customerResponse.json();

        const customersResponse = await request.get(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        expect.soft(customersResponse.status()).toBe(STATUS_CODES.OK);
        const responseBody = await customersResponse.json();
        validateSchema(allCustomersSchema, responseBody);

        expect.soft({ ...customerData }).toMatchObject(_.omit(customerBody.Customer, "_id", "createdOn"));
        expect.soft(responseBody.ErrorMessage).toBe(null);
        expect.soft(responseBody.IsSuccess).toBe(true);

        const deleteResponse = await request.delete(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerBody.Customer._id), {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        expect.soft(deleteResponse.status()).toBe(STATUS_CODES.DELETED);
    }
    );
});