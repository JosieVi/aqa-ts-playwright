import { Locator, Page } from "@playwright/test";
import { SalesPortalPage } from "./sales-portal.page";
import { ModuleName } from "types/home.types";
import { logStep } from "utils/reporter.utils";

export class HomePage extends SalesPortalPage {
    title = this.page.getByRole('heading', { name: 'Welcome to Sales Management Portal' });
    customersButton = this.page.getByRole("link", { name: "Customer" });
    productsButton = this.page.getByRole("link", { name: "Products" });
    ordersButton = this.page.getByRole("link", { name: "Orders" });

    ordersThisYearMetric = this.page.locator('.card-body', { hasText: 'Orders This Year' }).locator('.card-text.display-6')
    newCustomersMetric = this.page.locator('.card-body', { hasText: 'New Customers' }).locator('.card-text.display-6');
    cancelledOrdersMetric = this.page.locator('.card-body', { hasText: 'Canceled Orders' }).locator('.card-text.display-6');

    uniqueElement = this.title;

    @logStep("Click on the module button")
    async clickModuleButton(moduleName: ModuleName) {
        
        const moduleButtons: Record<ModuleName, Locator> = {
            Customers: this.customersButton,
            Products: this.productsButton,
            Orders: this.ordersButton,
        };

        await moduleButtons[moduleName].click();
    }

    // HW-25 Task 1
    async getMetrics(metrics: string) {
        switch (metrics) {
            case 'Orders This Year':
                return Number(await this.ordersThisYearMetric.innerText());
            case 'New Customers':
                return Number(await this.newCustomersMetric.innerText());
            case 'Canceled Orders':
                return await Number(await this.cancelledOrdersMetric.innerText());
        }
    }
}