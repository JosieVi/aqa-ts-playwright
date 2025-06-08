import { APIRequestContext, test } from "@playwright/test";
import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api-config";
import { IRequestOptions } from "types/api.types";
import { ICustomer, ICustomerResponse, ICustomersResponse } from "types/customer.types";
import { logStep } from "utils/reporter.utils";
import { convertRequestParams } from "utils/request-params.utils";

export class CustomersController {

    // constructor(private request = new RequestApi()) { }

    // Create a new instance of RequestApi with the provided APIRequestContext
    private request: RequestApi;

    constructor(context: APIRequestContext) {
        this.request = new RequestApi(context);
    }

    @logStep("Create a new customer via API")
    async create(body: ICustomer, token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.BASE_URL,
            url: apiConfig.ENDPOINTS.CUSTOMERS,
            method: "post",
            data: body,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        return await this.request.send<ICustomerResponse>(options);
    }

    async getById(id: string, token: string) {
        return await test.step(`Get customer by ID: ${id}`, async () => {
            const options: IRequestOptions = {
                baseURL: apiConfig.BASE_URL,
                url: apiConfig.ENDPOINTS.CUSTOMER_BY_ID(id),
                method: "get",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            return await this.request.send<ICustomerResponse>(options);
        });
    }

    @logStep("Get all customers")
    async getAll(token: string, params?: Record<string, string>) {
        const options: IRequestOptions = {
            baseURL: apiConfig.BASE_URL,
            url: apiConfig.ENDPOINTS.CUSTOMERS + (params ? convertRequestParams(params) : ""),
            method: "get",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        return await this.request.send<ICustomersResponse>(options);
    }

    async update(id: string, body: ICustomer, token: string) {
        return await test.step(`Update customer with ID: ${id}`, async () => {
            const options: IRequestOptions = {
                baseURL: apiConfig.BASE_URL,
                url: apiConfig.ENDPOINTS.CUSTOMER_BY_ID(id),
                method: "put",
                data: body,
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            return await this.request.send<ICustomerResponse>(options);
        });
    }

    async delete(id: string, token: string) {
        return await test.step(`Delete customer with ID: ${id}`, async () => {
            const options: IRequestOptions = {
                baseURL: apiConfig.BASE_URL,
                url: apiConfig.ENDPOINTS.CUSTOMER_BY_ID(id),
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return await this.request.send<null>(options);
        });
    }
}