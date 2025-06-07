import { test, expect } from "fixtures/controllers.fixture";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/enviroment";
import { generateCustomerData } from "data/customers/generate-customer.data";
import { customerSchema } from "data/schemas/customers/customer.schema";
import { STATUS_CODES } from "data/status-codes.data";
import { validateSchema } from "utils/validations/schema-validation";
import { TAGS } from "data/test-tags.data";

test.describe("[API] [Customers] [Get_By_Id]", () => {
    test("Should get created customer by id",
        { tag: [TAGS.REGRESSION] },
        async ({
            request,
            signInController
        }) => {
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

            const getResponse = await request.get(
                apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerBody.Customer._id),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "content-type": "application/json",
                    },
                }
            );

            const body = await getResponse.json();
            validateSchema(customerSchema, body);
            expect.soft(getResponse.status()).toBe(STATUS_CODES.OK);
            expect.soft(body.Customer).toMatchObject({ ...customerBody.Customer });
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