import { test } from "@playwright/test";
import { Modal } from "ui/pages/modals/modal.page";

export class DeleteCustomerModal extends Modal {

    // Locators for elements in the delete customer modal
    readonly modalContainer = this.page.locator(`div[role="dialog"]`);
    readonly deleteButton = this.modalContainer.getByRole("button", { name: "Yes, Delete" });
    readonly cancelButton = this.modalContainer.getByRole("button", { name: "Cancel" });
    readonly title = this.modalContainer.locator(".modal-title");
    readonly closeButton = this.modalContainer.locator('button[aria-label="Close"]');

    // Unique element to identify the modal
    uniqueElement = this.deleteButton;

    async close() {
        return await test.step("Close Delete Customer Modal", async () => {
            await this.closeButton.click();
            await this.waitForClosed();
        });
    }

    async clickDelete() {
        return test.step("Click Delete Button in Delete Customer Modal", async () => {
            await this.deleteButton.click();
        });
    }

    async clickCancel() {
        return test.step("Click Cancel Button in Delete Customer Modal", async () => {
            await this.cancelButton.click();
        });
    }
}