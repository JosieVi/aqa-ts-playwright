import { expect, test } from "@playwright/test";
import { SalesPortalPage } from "ui/pages/sales-portal.page";

export abstract class Modal extends SalesPortalPage {
    async waitForClosed() {
        return await test.step("Wait for Modal to be closed", async () => {
            await expect(this.uniqueElement).not.toBeVisible();
        });
    }
}