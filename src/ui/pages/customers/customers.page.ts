import { expect, Locator } from "@playwright/test";
import { SalesPortalPage } from "../sales-portal.page";
import { ICustomer, ICustomerInTable } from "types/customer.types";
import { FilterModal } from "../modals-customers/filter.modal";
import { DeleteModal } from "../modals-customers/delete.modal";
import { COUNTRIES } from "data/customers/countries.data";

export class CustomersPage extends SalesPortalPage {
    readonly filterModal = new FilterModal(this.page);
    readonly deleteModal = new DeleteModal(this.page);

    readonly tableHeader = this.page.locator("#table-customers th div");
    readonly emailHeader = this.tableHeader.filter({ hasText: "Email" });
    readonly nameHeader = this.tableHeader.filter({ hasText: "Name" });
    readonly countryHeader = this.tableHeader.filter({ hasText: "Country" });
    readonly createdOnHeader = this.tableHeader.filter({ hasText: "Created On" });

    readonly tableRow = this.page.locator("#table-customers tbody tr");
    readonly tableRowByEmail = (email: string) => this.tableRow.filter({ has: this.page.getByText(email) });

    readonly emailCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(1);
    readonly nameCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(2);
    readonly countryCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(3);
    readonly createdOnCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(4);
    readonly editButton = (email: string) => this.tableRowByEmail(email).getByTitle("Edit");
    readonly detailsButton = (email: string) => this.tableRowByEmail(email).getByTitle("Details");
    readonly deleteButton = (email: string) => this.tableRowByEmail(email).getByTitle("Delete");

    readonly filterButton = this.page.getByRole("button", { name: "Filter" });

    addNewCustomerButton = this.page.getByRole("button", { name: "Add Customer" });

    uniqueElement = this.addNewCustomerButton;

    async clickAddNewCustomer() {
        await this.addNewCustomerButton.click();
    }

    async clickDeleteCustomer(customerEmail: string) {
        await this.deleteButton(customerEmail).click();
    }

    async clickFilter() {
        await this.filterButton.click();
    }

    async clickTableAction(customerEmail: string, action: "edit" | "details" | "delete") {
        const buttons = {
            edit: this.editButton(customerEmail),
            details: this.detailsButton(customerEmail),
            delete: this.deleteButton(customerEmail),
        };

        await buttons[action].click();
    }

    async getCustomerDataByEmil(customerEmail: string): Promise<ICustomerInTable> {
        const [email, name, country, createdOn] = await this.tableRowByEmail(customerEmail).locator("td").allInnerTexts();
        return {
            email,
            name,
            country: country as COUNTRIES,
        };
    }

    async getTableData() {
        const tableData: Array<ICustomerInTable> = [];
        const rows = await this.tableRow.all();
        for (const row of rows) {
            const [email, name, country] = await row.locator("td").allInnerTexts();
            tableData.push({
                email,
                name,
                country: country as COUNTRIES,
            });
        }
        return tableData;
    }

    async getCustomerRowByEmail(email: string): Promise<Locator> {
        return this.page.locator(`//td[contains(text(), "${email}")]`);
    }

    async getFirstCustomerData(): Promise<ICustomerInTable> {
        const [email, name, country] = await this.page.locator('table tbody tr').first().locator('td').allInnerTexts();
        return {
            email,
            name,
            country: country as COUNTRIES,
        };
    }
}