import { expect, Locator, test } from "@playwright/test";
import { SALES_PORTAL_URL } from "config/enviroment";
import { BasePage } from "./base.page";
import { logStep } from "utils/reporter.utils";

export abstract class SalesPortalPage extends BasePage {

  readonly spinner = this.page.locator(".spinner-border");
  readonly notification = this.page.locator(".toast-body");

  abstract uniqueElement: Locator;

  @logStep("Wait for Page to be opened")
  async waitForOpened() {
    // await this.page.waitForLoadState("domcontentloaded");
    // await expect(this.uniqueElement).toBeVisible();
    await this.uniqueElement.waitFor({ state: "visible", timeout: 15000 });
    await this.waitForSpinner();
  }

  @logStep("Wait for Spinner to be hidden")
  async waitForSpinner() {
    await expect(this.spinner).toHaveCount(0);
  }

  @logStep("Wait for Notification to appear")
  async waitForNotification(text: string) {
    await expect(this.notification.last()).toHaveText(text);
  }

  @logStep("Open Sales Portal")
  async openPortal() {
    // await this.page.goto(SALES_PORTAL_URL);
    await this.page.goto(SALES_PORTAL_URL, { waitUntil: "load" });
    await this.page.waitForLoadState('networkidle');
  }
}