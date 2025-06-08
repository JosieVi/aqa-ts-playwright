import { ICredentials } from "types/sign-in.types";
import { SalesPortalPage } from "./sales-portal.page";
import { test } from "@playwright/test";
import { logStep } from "utils/reporter.utils";

export class SignInPage extends SalesPortalPage {

    // Locators for the Sign In page
    readonly emailInput = this.page.locator("#emailinput");
    readonly passwordInput = this.page.locator("#passwordinput");
    readonly loginButton = this.page.getByRole("button", { name: "Login" });

    // Unique element to identify the page
    uniqueElement = this.loginButton;

    @logStep("Fill default credentials in Sign In form")
    async fillCredentials({ email, password }: ICredentials) {
        email && (await this.emailInput.fill(email));
        password && (await this.passwordInput.fill(password));
    }

    @logStep("Click Login button")
    async clickLogin() {
        await this.loginButton.click();
    }
}
