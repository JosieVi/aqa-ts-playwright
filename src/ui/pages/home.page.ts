import { Locator, Page } from "@playwright/test";
import { SalesPortalPage } from "./sales-portal.page";
import { ModuleName } from "types/home.types";

export class HomePage extends SalesPortalPage {
    title = this.page.getByRole('heading', { name: 'Welcome to Sales Management Portal' });
    customersButton = this.page.getByRole("link", { name: "Customer" });
    productsButton = this.page.getByRole("link", { name: "Products" });
    ordersButton = this.page.getByRole("link", { name: "Orders" });

    uniqueElement = this.title;

    async clickModuleButton(moduleName: ModuleName) {
        const moduleButtons: Record<ModuleName, Locator> = {
            Customers: this.customersButton,
            Products: this.productsButton,
            Orders: this.ordersButton,
        };

        await moduleButtons[moduleName].click();
    }
}