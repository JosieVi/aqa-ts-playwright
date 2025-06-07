import { expect, Locator, test } from "@playwright/test";
import { SALES_PORTAL_URL } from "config/enviroment";
import { BasePage } from "./base.page";

export abstract class SalesPortalPage extends BasePage {

  // Locators for elements in the abstract sales portal page
  readonly spinner = this.page.locator(".spinner-border");
  readonly notification = this.page.locator(".toast-body");

  // Unique element to identify the abstract sales portal page
  abstract uniqueElement: Locator;

  async waitForOpened() {
    return await test.step("Wait for Page to be opened", async () => {
      await expect(this.uniqueElement).toBeVisible();
      await this.waitForSpinner();
    });
  }

  async waitForSpinner() {
    return await test.step("Wait for Spinner to be hidden", async () => {
      await expect(this.spinner).toHaveCount(0);
    });
  }

  async waitForNotification(text: string) {
    return await test.step("Wait for Notification to appear", async () => {
      await expect(this.notification.last()).toHaveText(text);
    });
  }

  async openPortal() {
    return await test.step("Open Sales Portal", async () => {
      this.page.goto(SALES_PORTAL_URL);
    });
  }
}