// Description:
// These interfaces define the structure of product-related API responses and requests.

import { MANUFACTURERS } from "data/products/manufacturers.data";
import { IResponseFields, sortDirection } from "./api.types";

export interface IProduct {
    name: string;
    manufacturer: MANUFACTURERS;
    price: number;
    amount: number;
    notes?: string;
}

export interface IProductFromResponse extends IProduct {
    _id: string;
    createdOn: string;
    // received: boolean;
}

export interface IProductResponse extends IResponseFields {
    Product: IProductFromResponse;
}

export interface IProductsResponse extends IResponseFields {
    Products: IProductFromResponse[];
    sorting: {
        sortField: "createdOn" | "name" | "manufacturer" | "price";
        sortOrder: sortDirection;
    };
}