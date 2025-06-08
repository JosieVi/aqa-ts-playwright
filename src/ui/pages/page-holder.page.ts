// This is a base class for all pages

import { Page } from "@playwright/test";

export class PageHolder {
    constructor(protected page: Page) { }
}