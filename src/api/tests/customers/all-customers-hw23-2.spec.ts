import test, { expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/enviroment";
import { STATUS_CODES } from "data/status-codes.data";
import { validateSchema } from "utils/validations/schema-validation";
import { generateCustomerData } from "data/customers/generate-customer.data";
import { ICustomerFromResponse } from "types/customer.types";
import { allCustomersSchema } from "data/schemas/customers/all-customers.schema";

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

        const allCustomersResponse = await request.get(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        expect.soft(allCustomersResponse.status()).toBe(STATUS_CODES.OK);
        const allCustomersBody = await allCustomersResponse.json();
        validateSchema(allCustomersSchema, allCustomersBody);

        const createdCustomerFromResponse = allCustomersBody.Customers.find((el: ICustomerFromResponse) => el.email === customerBody.Customer.email)
        expect.soft(createdCustomerFromResponse).toMatchObject(customerBody.Customer);
        expect.soft(allCustomersBody.ErrorMessage).toBe(null);
        expect.soft(allCustomersBody.IsSuccess).toBe(true);

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