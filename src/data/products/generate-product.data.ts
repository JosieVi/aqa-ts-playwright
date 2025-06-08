// Description:
// This file contains a generator function for product data used in tests.
// It uses Faker.js to create realistic product information for testing purposes.

import { faker } from "@faker-js/faker";
import { IProduct } from "types/products.types";
import { getRandromEnumValue } from "utils/enum.utils";
import { MANUFACTURERS } from "./manufacturers.data";

export function generateProductData(params?: Partial<IProduct>): IProduct {
    return {
        name: `Test ${faker.string.alpha(35)}`,
        manufacturer: getRandromEnumValue(MANUFACTURERS),
        price: faker.number.int({ min: 1, max: 99999 }),
        amount: faker.number.int({ min: 0, max: 999 }),
        notes: `Notes ${faker.string.alpha(244)}`,
        ...params,
    };
}