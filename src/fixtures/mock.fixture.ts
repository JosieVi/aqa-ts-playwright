// Description:
// This file extends the base test fixture to include a mock service for API testing.

import { test as base } from "fixtures/api-services.fixture";
import { Mock } from "./mock";

export interface MockFixture {
    mock: Mock;
}

export const test = base.extend<MockFixture>({
    mock: async ({ page }, use) => {
        await use(new Mock(page));
    },
});

export { expect } from "@playwright/test";