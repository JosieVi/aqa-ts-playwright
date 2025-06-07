import { expect, Page, test } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { generateCustomerData } from "data/customers/generate-customer.data";
import { STATUS_CODES } from "data/status-codes.data";
import { ICustomer, ICustomerResponse } from "types/customer.types";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import _ from "lodash";

export class AddNewCustomerUiService {
    private addNewCustomerPage: AddNewCustomerPage;
    private customersPage: CustomersPage;
    constructor(private page: Page) {
        this.addNewCustomerPage = new AddNewCustomerPage(page);
        this.customersPage = new CustomersPage(page);
    }

    //@logStep("Create a new customer with smoke data on Add New Customer page")
    async createNewCustomer(customData?: Partial<ICustomer>) {
        return await test.step("Create a new customer with smoke data on Add New Customer page", async () => {
            const data = generateCustomerData(customData);
            await this.addNewCustomerPage.fillInputs(data);
            const response = await this.addNewCustomerPage.interceptResponse<ICustomerResponse, any>(
                apiConfig.ENDPOINTS.CUSTOMERS,
                this.addNewCustomerPage.clickSaveNewCustomer.bind(this.addNewCustomerPage)
            );
            expect(response.status).toBe(STATUS_CODES.CREATED);
            expect(_.omit(response.body.Customer, "_id", "createdOn")).toEqual({ ...data });
            await this.customersPage.waitForOpened();
            return response.body.Customer;
        });
    }

    async createDuplicatedCustomer(customData?: Partial<ICustomer>) {
        return await test.step("Create a duplicated customer with smoke data on Add New Customer page", async () => {
            const data = generateCustomerData(customData);
            await this.addNewCustomerPage.fillInputs(data);
            const response = await this.addNewCustomerPage.interceptResponse<ICustomerResponse, any>(
                apiConfig.ENDPOINTS.CUSTOMERS,
                this.addNewCustomerPage.clickSaveNewCustomer.bind(this.addNewCustomerPage)
            );
            expect(response.status).toBe(STATUS_CODES.CUSTOMER_DUPLICATED);
        });
    }
}