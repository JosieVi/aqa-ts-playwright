import { expect, test } from "@playwright/test";
import { log } from "node:util";
import { SalesPortalPage } from "ui/pages/sales-portal.page";
import { logStep } from "utils/reporter.utils";

export abstract class Modal extends SalesPortalPage {
    @logStep("Wait for Modal to be opened")
    async waitForClosed() {
        await expect(this.uniqueElement).not.toBeVisible();
    }
}