import { test, Locator } from "@playwright/test";
import { SalesPortalPage } from "../sales-portal.page";
import { ICustomerInTable } from "types/customer.types";
import { FilterModal } from "../modals/customers/filter.modal";
import { DeleteCustomerModal } from "../modals/customers/delete.modal";
import { COUNTRIES } from "data/customers/countries.data";
import { customersSortField } from "types/api.types";
import { logStep } from "utils/reporter.utils";

export class CustomersPage extends SalesPortalPage {
    // Modals
    readonly filterModal = new FilterModal(this.page);
    readonly deleteCustomerModal = new DeleteCustomerModal(this.page);

    // Header menu
    readonly addNewCustomerButton = this.page.getByRole("button", { name: "Add Customer" });
    readonly filterButton = this.page.getByRole("button", { name: "Filter" });
    readonly searchInput = this.page.locator('input[type="search"]');
    readonly searchButton = this.page.locator("#search-customer");
    readonly chipButton = this.page.locator(".chip");
    readonly searchChipButton = this.page.locator('div[data-chip-customers="search"]');

    // Table
    readonly table = this.page.locator("#table-customers");

    // Table headers
    readonly tableHeader = this.page.locator("#table-customers th div");
    readonly emailHeader = this.tableHeader.filter({ hasText: "Email" });
    readonly nameHeader = this.tableHeader.filter({ hasText: "Name" });
    readonly countryHeader = this.tableHeader.filter({ hasText: "Country" });
    // readonly createdOnHeader = this.tableHeader.filter({ hasText: "Created On" }).nth(1);
    readonly createdOnHeader = this.tableHeader.filter({ hasText: 'Created On' }).filter({ has: this.page.locator('[onclick*="sortCustomersInTable"]') });

    // Table Body
    readonly tableRow = this.page.locator("#table-customers tbody tr");
    readonly tableRowByEmail = (email: string) => this.tableRow.filter({ has: this.page.getByText(email) });
    readonly emailCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(1);
    readonly nameCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(2);
    readonly countryCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(3);
    readonly createdOnCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(4);
    readonly editButton = (email: string) => this.tableRowByEmail(email).getByTitle("Edit");
    readonly detailsButton = (email: string) => this.tableRowByEmail(email).getByTitle("Details");
    readonly deleteButton = (email: string) => this.tableRowByEmail(email).getByTitle("Delete");
    readonly emptyTableRow = this.page.locator("td.fs-italic");

    readonly uniqueElement = this.addNewCustomerButton;

    @logStep("Open Customers Page by calling a method from the browser")
    async open() {
        await this.page.evaluate(async () => {
            await (window as typeof window & { renderCustomersPage: () => Promise<void> }).renderCustomersPage();
        });
    }

    @logStep("Click on Add New Customer button")
    async clickAddNewCustomer() {
        await this.addNewCustomerButton.click();
    }

    @logStep("Click on Filter button")
    async clickFilter() {
        await this.filterButton.click();
    }

    async clickTableAction(customerEmail: string, action: "edit" | "details" | "delete") {
        return await test.step(`Click on ${action} button for customer with email: ${customerEmail}`, async () => {
            const buttons = {
                edit: this.editButton(customerEmail),
                details: this.detailsButton(customerEmail),
                delete: this.deleteButton(customerEmail),
            };
            await buttons[action].click();
        });
    }



    async getCustomerData(customerEmail: string): Promise<ICustomerInTable> {
        // version 1
        /*
        return {
          email: await this.emailCell(email).textContent(),
          name: await this.nameCell(email).textContent(),
          country: await this.countryCell(email).textContent(),
          createdOn: await this.createdOnCell(email).textCnt(),
          createdOn: await this.createdOnCell(email).textContent(),
        };
        */

        // version 2
        /*
        const [email, name, country, createdOn] = await Promise.all([
          this.emailCell(customerEmail).textContent(),
          this.nameCell(customerEmail).textContent(),
          this.countryCell(customerEmail).textContent(),
          this.createdOnCell(customerEmail).textContent(),
        ]);
        return { email, name, country, createdOn };
        */

        // version 3
        return await test.step(`Get customer data for email: ${customerEmail}`, async () => {
            const [email, name, country, createdOn] = await this.tableRowByEmail(customerEmail).locator("td").allInnerTexts();
            return {
                email,
                name,
                country: country as COUNTRIES,
                //createdOn
            };
        });
    }

    @logStep("Get all customers data from the table")
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
        return await test.step(`Get customer row by email: ${email}`, async () => {
            return this.page.locator(`//td[contains(text(), "${email}")]`);
        });
    }

    @logStep("Get first customer data from the table")
    async getFirstCustomerData(): Promise<ICustomerInTable> {
        const [email, name, country] = await this.page.locator('table tbody tr').first().locator('td').allInnerTexts();
        return {
            email,
            name,
            country: country as COUNTRIES,
        };
    }

    async fillSearch(value: string | number) {
        return await test.step(`Fill search input with value: ${value}`, async () => {
            await this.searchInput.fill(String(value));
        });
    }

    @logStep("Click on Search button")
    async clickSearch() {
        await this.searchButton.click();
    }

    async search(value: string | number) {
        return await test.step(`Search for customer with value: ${value}`, async () => {
            await this.fillSearch(value);
            await this.clickSearch();
            await this.waitForOpened();
        });
    }

    async clickTableHeader(header: customersSortField) {
        return await test.step(`Click on table header: ${header}`, async () => {
            switch (header) {
                case "email":
                    await this.emailHeader.click();
                    break;
                case "name":
                    await this.nameHeader.click();
                    break;
                case "country":
                    await this.countryHeader.click();
                    break;
                case "createdOn":
                    await this.createdOnHeader.click();
                    break;
            }
        });
    }
}