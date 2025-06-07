import { expect, test } from "@playwright/test";
import { Modal } from "../modal.page";

export class FilterModal extends Modal {

    // Unique element to identify the filter modal
    readonly uniqueElement = this.page.locator(`div[role="dialog"]`);

    // locators for elements in the filter modal
    readonly title = this.uniqueElement.locator(".modal-title");
    readonly applyButton = this.uniqueElement.getByRole("button", { name: "Apply" });
    readonly clearFiltersButton = this.uniqueElement.getByRole("button", { name: "Clear Filters" });
    readonly closeButton = this.uniqueElement.locator('button[aria-label="Close"]');

    readonly checkbox = (name: string) => this.uniqueElement.locator(`input[value="${name}"]`);

    async checkFilters(...value: string[]) {
        return test.step("Check Filters in Filter Modal", async () => {
            for (const v of value) {
                await this.checkbox(v).check();
            }
        });
    }

    async clickApply() {
        return await test.step("Click Apply Button in Filter Modal", async () => {
            await this.applyButton.click();
        });
    }

    async clickClearFilters() {
        return await test.step("Click Clear Filters Button in Filter Modal", async () => {
            await this.clearFiltersButton.click();
        });
    }

    async close() {
        return await test.step("Close Filter Modal", async () => {
            await this.closeButton.click();
            await expect(this.uniqueElement).not.toBeVisible();
        });
    }
}