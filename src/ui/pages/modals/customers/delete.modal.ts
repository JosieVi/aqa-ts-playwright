import { Modal } from "ui/pages/modals/modal.page";
import { logStep } from "utils/reporter.utils";

export class DeleteCustomerModal extends Modal {

    readonly modalContainer = this.page.locator(`div[role="dialog"]`);
    readonly deleteButton = this.modalContainer.getByRole("button", { name: "Yes, Delete" });
    readonly cancelButton = this.modalContainer.getByRole("button", { name: "Cancel" });
    readonly title = this.modalContainer.locator(".modal-title");
    readonly closeButton = this.modalContainer.locator('button[aria-label="Close"]');

    uniqueElement = this.deleteButton;

    @logStep("Close Delete Customer Modal")
    async close() {
        await this.closeButton.click();
        await this.waitForClosed();
    }

    @logStep("Click Delete Button in Delete Customer Modal")
    async clickDelete() {
        await this.deleteButton.click();
    }

    @logStep("Click Cancel Button in Delete Customer Modal")
    async clickCancel() {
        await this.cancelButton.click();
    }
}