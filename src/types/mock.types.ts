// Description:
// This file extends the base test fixture to include a mock service for API testing.

import { Mock } from 'fixtures/mock';

export interface ISortingMockOptions {
    sortField: string;
    sortDir: string;
}

export interface MockFixture {
    mock: Mock;
}