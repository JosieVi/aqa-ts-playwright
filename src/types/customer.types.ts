import { COUNTRIES } from "data/customers/countries.data";
import { customersSortField, IResponseFields, sortDirection } from "./api.types";
import { IProductFromResponse } from "./products.types";
import { String } from "lodash";

export interface ICustomer {
    email?: string;
    name: string;
    country: COUNTRIES;
    city: string;
    street: String;
    house: number;
    flat: number;
    phone: string;
    notes?: string;
    role?: string;
}

export type ICustomerInTable = Pick<ICustomer, "email" | "country" | "name">;

export interface ICustomerFromResponse extends ICustomer {
    _id: string;
    createdOn: string;
}

export interface ICustomerResponse extends IResponseFields {
    Customer: ICustomerFromResponse;
}

export interface ICustomersResponse extends IResponseFields {
    Customers: ICustomerFromResponse[];
    sorting: {
        sortField: customersSortField;
        sortOrder: sortDirection;
    };
}

// HW-25 Task 1
export interface IMetricsFromResponse {
    IsSuccess: boolean;
    Metrics: {
        orders: {
            totalRevenue: number;
            totalOrders: number;
            averageOrderValue: number;
            totalCanceledOrders: number;
            recentOrders: IOrder[];
            ordersCountPerDay: {
                date: {
                    day: number;
                    month: number;
                    year: number;
                };
                count: number;
            }[];
        };
        customers: {
            totalNewCustomers: number;
            topCustomers: ITopCustomer[];
            customerGrowth: {
                date: {
                    day: number;
                    month: number;
                    year: number;
                };
                count: number;
            }[];
        };
        products: {
            topProducts: {
                name: string;
                sales: number;
            }[];
        };
    };
    ErrorMessage: string | null;
}

export interface IOrder {
    _id: string;
    status: string;
    customer: ICustomerFromResponse;
    products: IProductFromResponse[];
    delivery: any;
    total_price: number;
    createdOn: string;
    comments: any[];
    history: IOrderHistory[];
    assignedManager: IPerformer;
}

export interface IOrderHistory {
    status: string;
    customer: string;
    products: IProductFromResponse[];
    total_price: number;
    delivery: any;
    changedOn: string;
    action: string;
    performer: IPerformer;
}

export interface IPerformer {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    roles: string[];
    createdOn: string;
}

export interface ITopCustomer {
    _id: string;
    totalSpent: number;
    ordersCount: number;
    customerName: string;
    customerEmail: string;
}