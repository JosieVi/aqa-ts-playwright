import { Locator, Page, test } from "@playwright/test";

import { SideMenuItem } from "types/side-menu.types";
import { PageHolder } from "./page-holder.page";
import { logStep } from "utils/reporter.utils";

export class SideMenuComponent extends PageHolder {

    // Locators for elements in the side menu component v1 

    /*
    readonly salesPortalButton: Locator;
    readonly userDropdown: Locator;
    readonly signOutButton: Locator;
    constructor(protected page: Page) {
        this.salesPortalButton = this.page.locator("span.fs-4");
        this.userDropdown = this.page.locator("#dropdownUser1");
        this.signOutButton = this.page.locator("#signOut");
    }
    */

    // Locators for elements in the side menu component with PageHolder
    private readonly salesPortalButton = this.page.locator("span.fs-4");
    private readonly userDropdown = this.page.locator("#dropdownUser1");
    private readonly signOutButton = this.page.locator("#signOut");


    readonly menuItem = (itemName: SideMenuItem) => this.page.locator(`a[name="${itemName}"]`);

    async clickMenuItem(itemName: SideMenuItem) {
        return await test.step(`Click Menu Item: ${itemName}`, async () => {
            await this.menuItem(itemName).click();
        });
    }
    @logStep("Open User Dropdown")
    async openUserDropdown() {
        await this.userDropdown.click();
    }

    @logStep("Click Sign Out Button")
    async clickSignOut() {
        await this.signOutButton.click();
    }
}