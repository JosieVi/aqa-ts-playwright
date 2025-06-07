import { Page, test } from "@playwright/test";
import { AddNewProductPage } from "ui/pages/products/add-new-product.page";
import { ProductsPage } from "ui/pages/products/products.page";

export class ProductsUIService {

    // Initialize the ProductsPage and AddNewProductPage instances
    private productsPage: ProductsPage;
    private addNewProductPage: AddNewProductPage;

    constructor(private page: Page) {
        this.productsPage = new ProductsPage(page);
        this.addNewProductPage = new AddNewProductPage(page);
    }

    async openAddPage() {
        return await test.step("Open Add New Product Page from Products Page", async () => {
            await this.productsPage.clickAddNewProduct();
            await this.addNewProductPage.waitForOpened();
        });
    }
}