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