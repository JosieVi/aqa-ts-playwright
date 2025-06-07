import { Locator, test } from "@playwright/test";
import { SalesPortalPage } from "./sales-portal.page";
import { ModuleName } from "types/home.types";
import { logStep } from "utils/reporter.utils";

export class HomePage extends SalesPortalPage {

    // Locators for elements in the Home page
    title = this.page.getByRole('heading', { name: 'Welcome to Sales Management Portal' });
    customersButton = this.page.getByRole("link", { name: "Customer" });
    productsButton = this.page.getByRole("link", { name: "Products" });
    ordersButton = this.page.getByRole("link", { name: "Orders" });

    ordersThisYearMetric = this.page.locator('div.card-body', { hasText: 'Orders This Year' }).locator('p.card-text.display-6');
    newCustomersMetric = this.page.locator('div.card-body', { hasText: 'New Customers' }).locator('p.card-text.display-6');
    cancelledOrdersMetric = this.page.locator('div.card-body', { hasText: 'Canceled Orders' }).locator('p.card-text.display-6');

    // Unique element to identify the Home page
    uniqueElement = this.title;

    async clickModuleButton(moduleName: ModuleName) {
        const moduleButtons: Record<ModuleName, Locator> = {
            Customers: this.customersButton,
            Products: this.productsButton,
            Orders: this.ordersButton,
        };
        return await test.step(`Click on the ${moduleName} module button`, async () => {
            await moduleButtons[moduleName].click();
        });
    }

    // HW-25 Task 1
    async getMetrics(metrics: string) {
        return await test.step(`Get ${metrics} metric`, async () => {

            /*
            switch (metrics) {
                case 'Orders This Year':
                    return Number(await this.ordersThisYearMetric.innerText());
                case 'New Customers':
                    return Number(await this.newCustomersMetric.innerText());
                case 'Canceled Orders':
                    return await Number(await this.cancelledOrdersMetric.innerText());
            }
            */

            let locator;
            switch (metrics) {
                case 'Orders This Year':
                    locator = this.ordersThisYearMetric;
                    break;
                case 'New Customers':
                    locator = this.newCustomersMetric;
                    break;
                case 'Canceled Orders':
                    locator = this.cancelledOrdersMetric;
                    break;
                default:
                    throw new Error(`Unknown metric name: ${metrics}`);
            }
            await locator.waitFor({ state: 'visible', timeout: 5000 });
            const metricText = await locator.innerText();
            return +metricText;
        });
    }
}