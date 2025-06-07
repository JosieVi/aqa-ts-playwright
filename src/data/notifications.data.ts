// Description: 
// This file contains a set of notification messages used throughout the application.

export const NOTIFICATIONS = {
    CUSTOMER_CREATED: "Customer was successfully created",
    CUSTOMER_DUPLICATED: (email: string) => `Customer with email '${email}' already exists`,
    CUSTOMER_DELETED: "Customer was successfully deleted",
    PRODUCT_CREATED: "Product was successfully created",
};

export const EMPTY_TABLE_ROW_TEXT = "No records created yet";