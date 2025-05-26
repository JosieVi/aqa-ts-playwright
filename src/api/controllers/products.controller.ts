import { APIRequestContext } from "@playwright/test";
import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api-config";
import { IRequestOptions } from "types/api.types";
import { IProduct, IProductResponse, IProductsResponse } from "types/products.types";
import { convertRequestParams } from "utils/request-params.utils";
import { logStep } from "utils/reporter.utils";

export class ProductsController {
    // constructor(private request = new RequestApi()) { }
    private request: RequestApi;

    constructor(context: APIRequestContext) {
        this.request = new RequestApi(context);
    }

    @logStep()
    async create(body: IProduct, token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.BASE_URL,
            url: apiConfig.ENDPOINTS.PRODUCTS,
            method: "post",
            data: body,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        return await this.request.send<IProductResponse>(options);
    }

    @logStep()
    async getById(id: string, token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.BASE_URL,
            url: apiConfig.ENDPOINTS.PRODUCT_BY_ID(id),
            method: "get",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        return await this.request.send<IProductResponse>(options);
    }

    @logStep()
    async delete(id: string, token: string) {
        const options: IRequestOptions = {
            baseURL: apiConfig.BASE_URL,
            url: apiConfig.ENDPOINTS.PRODUCT_BY_ID(id),
            method: "delete",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return await this.request.send<null>(options);
    }
}