import test from "@playwright/test";
import { ProductDetailsModal } from "../modals/products/product-details.modal";
import { SalesPortalPage } from "../sales-portal.page";
import { logStep } from "utils/reporter.utils";

export class ProductsPage extends SalesPortalPage {

    readonly detailsModal = new ProductDetailsModal(this.page);

    readonly tableRow = this.page.locator("#table-products tbody tr");
    readonly tableRowByName = (name: string) => this.tableRow.filter({ has: this.page.getByText(name, { exact: true }) });
    readonly detailsButton = (name: string) => this.tableRowByName(name).getByTitle("Details");
    readonly addNewProductButton = this.page.getByRole("button", { name: "Add Product" });

    readonly uniqueElement = this.addNewProductButton;

    async clickDetails(name: string) {
        return await test.step(`Click Details Button for Product: ${name}`, async () => {
            await this.detailsButton(name).click();
            await this.detailsModal.waitForOpened();
        });
    }

    @logStep("Click Add New Product Button")
    async clickAddNewProduct() {
        await this.addNewProductButton.click();
    }
}