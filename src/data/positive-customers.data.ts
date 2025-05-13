import { generateCustomerData } from "./customers/generate-customer.data";

export const positiveTestCases = [
    {
        name: "Create customer with valid data",
        data: generateCustomerData(),
        expectedError: null,
    },
    {
        name: "Create customer with invalid notes",
        data: generateCustomerData({ notes: "" }),
        expectedError: null,
    },
]