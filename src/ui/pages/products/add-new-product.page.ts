import { test } from "@playwright/test";
import { SalesPortalPage } from "../sales-portal.page";
import { IProduct } from "types/products.types";

export class AddNewProductPage extends SalesPortalPage {

    // Locators for elements in the add new product page
    readonly name = this.page.locator("#inputName");
    readonly price = this.page.locator("#inputPrice");
    readonly amount = this.page.locator("#inputAmount");
    readonly manufacturer = this.page.locator("#inputManufacturer");
    readonly notes = this.page.locator("#textareaNotes");
    readonly saveButton = this.page.locator("#save-new-product");
    readonly clearButton = this.page.locator("#clear-inputs");

    readonly nameError = this.page.locator("#error-inputName");

    // Unique element to identify the add new product page
    readonly uniqueElement = this.name;

    async fillInputs(product: Partial<IProduct>) {
        return await test.step("Fill Inputs in Add New Product Page", async () => {
            product.name && (await this.name.fill(String(product.name)));
            product.price && (await this.price.fill(product.price?.toString()));
            product.amount && (await this.amount.fill(product.amount?.toString()));
            product.manufacturer && (await this.manufacturer.selectOption(product.manufacturer));
            product.notes && (await this.notes.fill(product.notes));
        });
    }

    async getError() {
        return await test.step("Get Name Error Message", async () => {
            return await this.nameError.textContent();
        });
    }

    async clickSaveNewProduct() {
        return await test.step("Click Save New Product Button", async () => {
            await this.saveButton.click();
        });
    }
}