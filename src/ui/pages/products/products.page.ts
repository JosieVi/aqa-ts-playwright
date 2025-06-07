import test from "@playwright/test";
import { ProductDetailsModal } from "../modals/products/product-details.modal";
import { SalesPortalPage } from "../sales-portal.page";

export class ProductsPage extends SalesPortalPage {

    // Initializing the ProductDetailsModal
    readonly detailsModal = new ProductDetailsModal(this.page);

    // Locators for elements in the Products page
    readonly tableRow = this.page.locator("#table-products tbody tr");
    readonly tableRowByName = (name: string) => this.tableRow.filter({ has: this.page.getByText(name, { exact: true }) });
    readonly detailsButton = (name: string) => this.tableRowByName(name).getByTitle("Details");
    readonly addNewProductButton = this.page.getByRole("button", { name: "Add Product" });

    // Unique element to identify the Products page
    readonly uniqueElement = this.addNewProductButton;

    async clickDetails(name: string) {
        return await test.step(`Click Details Button for Product: ${name}`, async () => {
            await this.detailsButton(name).click();
            await this.detailsModal.waitForOpened();
        });
    }

    async clickAddNewProduct() {
        return await test.step("Click Add New Product Button", async () => {
            await this.addNewProductButton.click();
        });
    }
}