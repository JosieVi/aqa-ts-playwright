import { Page, test } from "@playwright/test";
import { ModuleName } from "types/home.types";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
import { ProductsPage } from "ui/pages/products/products.page";

export class HomeUIService {

    // Initialize the HomePage, CustomersPage, and ProductsPage instances
    homePage: HomePage;
    customersPage: CustomersPage;
    productsPage: ProductsPage;
    constructor(private page: Page) {
        this.customersPage = new CustomersPage(page);
        this.homePage = new HomePage(page);
        this.productsPage = new ProductsPage(page);
    }

    async openModule(moduleName: ModuleName) {
        return await test.step(`Open ${moduleName} module on Home Page`, async () => {
            await this.homePage.clickModuleButton(moduleName);

            // v1
            /*
            switch (moduleName) {
                case "Customers":
                    await this.customersPage.waitForOpened();
                    break;
                case "Products":
                    await this.productsPage.waitForOpened();
            }
            */

            // v2
            await (this as any)[`${moduleName.toLowerCase()}Page`].waitForOpened();
        });
    }

    async openAsLoggedInUser() {
        return await test.step("Open Sales Portal on Home Page as logged in user", async () => {
            await this.homePage.openPortal();
            await this.homePage.waitForOpened();
        });
    }
}