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

// Products's name should contain only 3-40 alphanumerical characters and one space between
// Price should be in range 1-99999
// Amount should be in range 0-999
// Notes should be in range 0-250 and without < or > symbols