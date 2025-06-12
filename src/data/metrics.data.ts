import { IMetricsFromResponse } from "types/customer.types";

export const defaultMetricsResponse: IMetricsFromResponse = {
    IsSuccess: true,
    Metrics: {
        orders: {
            totalRevenue: 100000,
            totalOrders: 111,
            averageOrderValue: 5000,
            totalCanceledOrders: 333,
            recentOrders: [],
            ordersCountPerDay: [
                {
                    date: {
                        day: 1,
                        month: 1,
                        year: 2025
                    },
                    count: 5
                },
                {
                    date: {
                        day: 2,
                        month: 1,
                        year: 2025
                    },
                    count: 3
                }
            ]
        },
        customers: {
            totalNewCustomers: 222,
            topCustomers: [
                {
                    _id: "1",
                    totalSpent: 25000,
                    ordersCount: 3,
                    customerName: "John Doe",
                    customerEmail: "john@example.com"
                },
                {
                    _id: "2",
                    totalSpent: 18000,
                    ordersCount: 2,
                    customerName: "Jane Smith",
                    customerEmail: "jane@example.com"
                }
            ],
            customerGrowth: [
                {
                    date: {
                        year: 2025,
                        month: 1,
                        day: 1
                    },
                    count: 2
                },
                {
                    date: {
                        year: 2025,
                        month: 1,
                        day: 2
                    },
                    count: 3
                }
            ]
        },
        products: {
            topProducts: [
                {
                    name: "Product A",
                    sales: 10
                },
                {
                    name: "Product B",
                    sales: 5
                }
            ]
        }
    },
    ErrorMessage: null
};