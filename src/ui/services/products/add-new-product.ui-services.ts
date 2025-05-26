import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { generateProductData } from "data/products/generate-product.data";
import { STATUS_CODES } from "data/status-codes.data";
import _ from "lodash";
import { logStep } from "utils/reporter.utils";
import { AddNewProductPage } from "ui/pages/products/add-new-product.page";
import { ProductsPage } from "ui/pages/products/products.page";
import { IProduct, IProductResponse } from "types/products.types";

export class AddNewProductUiService {
    private addNewProductPage: AddNewProductPage;
    private productsPage: ProductsPage;
    constructor(private page: Page) {
        this.addNewProductPage = new AddNewProductPage(page);
        this.productsPage = new ProductsPage(page);
    }

    @logStep("Create new Product on Add New Product Page")
    async create(customData?: IProduct) {
        const data = generateProductData(customData);
        await this.addNewProductPage.fillInputs(data);
        const response = await this.addNewProductPage.interceptResponse<IProductResponse, any>(
            apiConfig.ENDPOINTS.PRODUCTS,
            this.addNewProductPage.clickSaveNewProduct.bind(this.addNewProductPage)
        );
        expect(response.status).toBe(STATUS_CODES.CREATED);
        expect(_.omit(response.body.Product, "_id", "createdOn")).toEqual({ ...data });
        await this.productsPage.waitForOpened();
        return response.body.Product;
    }
}