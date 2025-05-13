import { generateCustomerData } from "./customers/generate-customer.data";

export const negativeTestCases = [
    {
        name: "Create customer with invalid name",
        data: generateCustomerData({ name: "" }),
        //expectedError: "Customer's name should contain only 1-40 alphabetical characters and one space between",
        expectedError: "Incorrect request body"
    }
    ,
    {
        name: "Create customer with invalid country",
        data: generateCustomerData({ country: undefined }),
        //expectedError: "Country is not valid",
        expectedError: "Incorrect request body",
    },
    {
        name: "Create customer with invalid city",
        data: generateCustomerData({ city: "City123" }),
        //expectedError: "City's name should contain only 1-20 alphabetical characters and one space between",
        expectedError: "Incorrect request body",
    },
    {
        name: "Create customer with invalid street",
        data: generateCustomerData({ street: "" }),
        //expectedError: "Street should contain only 1-40 alphanumerical characters and one space between",
        expectedError: "Incorrect request body",
    },
    {
        name: "Create customer with invalid house number",
        data: generateCustomerData({ house: 0 }),
        //expectedError: "House number should be in range 1-999",
        expectedError: "Incorrect request body",
    },
    {
        name: "Create customer with invalid flat number",
        data: generateCustomerData({ flat: 0 }),
        //expectedError: "Flat number should be in range 1-9999",
        expectedError: "Incorrect request body",
    },
    {
        name: "Create customer with invalid phone number",
        data: generateCustomerData({ phone: "+1234567890123456789012345678901234567890" }),
        //expectedError: "Mobile Number should be at least 10 characters (max 20) and start with a +",
        expectedError: "Incorrect request body",
    },
    {
        name: "Create customer with invalid notes",
        data: generateCustomerData({ notes: "<InvalidNotes>" }),
        //expectedError: "Notes should be in range 0-250 and without < or > symbols",
        expectedError: "Incorrect request body",
    },
];