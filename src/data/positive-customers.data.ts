// Description:
// This file contains positive test cases for customer data validation.
// It includes scenarios where customer data is valid, such as correct name, country, city, etc.

import { generateCustomerData } from "./customers/generate-customer.data";

export const positiveTestCases = [
    {
        name: "Create customer with valid data",
        data: generateCustomerData(),
        expectedError: null,
    },
    {
        name: "Create customer with empty notes",
        data: generateCustomerData({ notes: "" }),
        expectedError: null,
    },
]