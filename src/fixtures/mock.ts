// Description:
// This file defines the Mock class for API mocking in Playwright tests, including methods for mocking customers, products, and metrics endpoints.

import { Page } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { STATUS_CODES } from "data/status-codes.data";
import { ICustomersResponse, ICustomerResponse, IMetricsFromResponse } from "types/customer.types";
import { IProductsResponse, IProductResponse } from "types/products.types";

export class Mock {
    constructor(private page: Page) { }

    async customers(body: ICustomersResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
        this.page.route(/\/api\/customers(\?.*)?$/, async (route) => {
            await route.fulfill({
                status: statusCode,
                contentType: "application/json",
                body: JSON.stringify(body),
            });
        });
    }

    async customerDetails(body: ICustomerResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
        this.page.route(apiConfig.BASE_URL + "/" + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(body.Customer._id), async (route) => {
            await route.fulfill({
                status: statusCode,
                contentType: "application/json",
                body: JSON.stringify(body),
            });
        });
    }

    async products(body: IProductsResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
        this.page.route(/\/api\/products(\?.*)?$/, async (route) => {
            await route.fulfill({
                status: statusCode,
                contentType: "application/json",
                body: JSON.stringify(body),
            });
        });
    }

    async productDetails(body: IProductResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
        this.page.route(apiConfig.BASE_URL + "/" + apiConfig.ENDPOINTS.PRODUCT_BY_ID(body.Product._id), async (route) => {
            await route.fulfill({
                status: statusCode,
                contentType: "application/json",
                body: JSON.stringify(body),
            });
        });
    }

    // HW-25 Task 1
    async metrics(body: IMetricsFromResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
        this.page.route(apiConfig.BASE_URL + "/" + apiConfig.ENDPOINTS.METRICS, async (route) => {
            await route.fulfill({
                status: statusCode,
                contentType: "application/json",
                body: JSON.stringify(body),
            });
        });
    }
}

export interface ISortingMockOptions {
    sortField: string;
    sortDir: string;
}

export { expect } from "@playwright/test";