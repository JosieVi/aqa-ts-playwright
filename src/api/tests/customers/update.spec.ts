import { test, expect } from "fixtures/controllers.fixture";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/enviroment";
import { generateCustomerData } from "data/customers/generate-customer.data";
import { customerSchema } from "data/schemas/customers/customer.schema";
import { STATUS_CODES } from "data/status-codes.data";
import { validateSchema } from "utils/validations/schema-validation";

test.describe("[API] [Customers] [Update]", () => {
    test("Update customer with smoke data", async ({ request, signInController }) => {
        const credentials = { username: USER_LOGIN, password: USER_PASSWORD };
        const loginResponse = await signInController.signIn(credentials);
        const headers = loginResponse.headers;
        const token = headers["authorization"];
        expect.soft(loginResponse.status).toBe(STATUS_CODES.OK);

        const customerData = generateCustomerData();
        const customerResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS, {
            data: customerData,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const customerBody = await customerResponse.json();
        expect.soft(customerResponse.status()).toBe(STATUS_CODES.CREATED);

        const updateCustomerData = generateCustomerData();
        const updateCustomerResponse = await request.put(
            apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerBody.Customer._id),
            {
                data: updateCustomerData,
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const body = await updateCustomerResponse.json();
        validateSchema(customerSchema, body);
        expect.soft(updateCustomerResponse.status()).toBe(STATUS_CODES.OK);
        expect.soft(body.Customer).toMatchObject({ ...updateCustomerData });
        expect.soft(body.ErrorMessage).toBe(null);
        expect.soft(body.IsSuccess).toBe(true);

        const response = await request.delete(
            apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerBody.Customer._id),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        expect.soft(response.status()).toBe(STATUS_CODES.DELETED);
    });
});