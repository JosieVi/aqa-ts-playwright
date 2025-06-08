
import { ICustomer } from "types/customer.types";
import { SalesPortalPage } from "../sales-portal.page";
import { test } from "@playwright/test";
import { logStep } from "utils/reporter.utils";

export class AddNewCustomerPage extends SalesPortalPage {

    // Locators for the Add New Customer page
    emailInput = this.page.locator("#inputEmail");
    nameInput = this.page.locator("#inputName");
    countryInput = this.page.locator("#inputCountry");
    cityInput = this.page.locator("#inputCity");
    streetInput = this.page.locator("#inputStreet");
    houseInput = this.page.locator("#inputHouse");
    flatInput = this.page.locator("#inputFlat");
    phoneInput = this.page.locator("#inputPhone");
    notesInput = this.page.locator("#textareaNotes");
    saveNewCustomerButton = this.page.locator("#save-new-customer");

    // Unique element to identify the page
    uniqueElement = this.saveNewCustomerButton;

    @logStep("Fill in Add New Customer form")
    async fillInputs(customer: Partial<ICustomer>) {
        customer.email && (await this.emailInput.fill(customer.email));
        customer.name && (await this.nameInput.fill(customer.name));
        customer.country && (await this.countryInput.selectOption(customer.country));
        customer.city && (await this.cityInput.fill(customer.city));
        customer.street && (await this.streetInput.fill(customer.street));
        customer.house && (await this.houseInput.fill(customer.house.toString()));
        customer.flat && (await this.flatInput.fill(customer.flat.toString()));
        customer.phone && (await this.phoneInput.fill(customer.phone));
        customer.notes && (await this.notesInput.fill(customer.notes));
    }

    @logStep("Click Save New Customer button")
    async clickSaveNewCustomer() {
        await this.saveNewCustomerButton.click();
    }
}