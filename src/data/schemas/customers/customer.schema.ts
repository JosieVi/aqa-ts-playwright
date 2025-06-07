// Description:
// This schema defines the structure of a customer object, including required fields and their types.
// It also includes an enumeration for the country field, ensuring that only valid country values are accepted.

import { COUNTRIES } from "data/customers/countries.data";

export const customerSchema = {
    type: "object",
    properties: {
        Customer: {
            type: "object",
            properties: {
                _id: { type: "string" },
                email: { type: "string" },
                name: { type: "string" },
                country: { type: "string", enum: Object.values(COUNTRIES) },
                city: { type: "string" },
                street: { type: "string" },
                house: { type: "number" },
                flat: { type: "number" },
                phone: { type: "string" },
                createdOn: { type: "string" },
                notes: { type: "string" },
            },
            required: ["_id", "email", "name", "country", "street", "city", "createdOn", "house", "flat", "phone"],
        },
        IsSuccess: { type: "boolean" },
        ErrorMessage: { type: ["string", "null"] },
    },
    required: ["Customer", "IsSuccess", "ErrorMessage"],
};