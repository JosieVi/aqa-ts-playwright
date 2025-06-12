import { test, APIRequestContext } from "@playwright/test";
import { CustomersController } from "api/controllers/customers.controller";
import { generateCustomerData } from "data/customers/generate-customer.data";
import { STATUS_CODES } from "data/status-codes.data";
import { ICustomer } from "types/customer.types";
import { logStep } from "utils/reporter.utils";
import { validateResponse } from "utils/validations/response-validation";

export class CustomersApiService {

    controller: CustomersController;

    constructor(request: APIRequestContext) {
        this.controller = new CustomersController(request);
    }

    @logStep("Create a new customer via API")
    async create(token: string, customData?: ICustomer) {
        const body = generateCustomerData(customData);
        const response = await this.controller.create(body, token);
        validateResponse(response, STATUS_CODES.CREATED, true, null);
        return response.body.Customer;
    }
}