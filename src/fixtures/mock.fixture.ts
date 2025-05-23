import { test as base } from "fixtures/api-services.fixture";
import { Page } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { STATUS_CODES } from "data/status-codes.data";
import { ICustomerResponse, ICustomersResponse, IMetricsFromResponse } from "types/customer.types";
import { MockFixture } from "types/mock.types";

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

export const test = base.extend<MockFixture>({
    mock: async ({ page }, use) => {
        await use(new Mock(page));
    },
});

export { expect } from "@playwright/test";