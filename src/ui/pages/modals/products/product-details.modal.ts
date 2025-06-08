import { MANUFACTURERS } from "data/products/manufacturers.data";
import { Modal } from "../modal.page";
import { IProduct } from "types/products.types";
import { logStep } from "utils/reporter.utils";

export class ProductDetailsModal extends Modal {

    // Locators for elements in the product details modal
    readonly modalBody = this.page.locator(`#details-modal-body-container`);
    readonly values = this.modalBody.locator("p");

    // Unique element to identify the product details modal
    uniqueElement = this.modalBody;

    @logStep("Get Product Details from Modal")
    async getDetails(): Promise<Required<IProduct> & { createdOn: string }> {
        const [name, amount, price, manufacturer, createdOn, notes] = await this.values.allInnerTexts();
        return {
            name,
            amount: +amount,
            price: +price,
            manufacturer: manufacturer as MANUFACTURERS,
            createdOn,
            notes,
        };
    }
}