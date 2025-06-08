// Description: 
// This file contains the API configuration for the application, including base URL and endpoints.

export const apiConfig = {
    BASE_URL: "https://aqa-course-project.app",
    ENDPOINTS: {
        CUSTOMERS: "/api/customers",
        CUSTOMER_BY_ID: (id: string) => `/api/customers/${id}/`,
        PRODUCTS: "/api/products",
        PRODUCT_BY_ID: (id: string) => `/api/products/${id}/`,
        LOGIN: "/api/login",
        METRICS: "/api/metrics"
    },
} as const;