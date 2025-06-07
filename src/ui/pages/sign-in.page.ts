import { ICredentials } from "types/sign-in.types";
import { SalesPortalPage } from "./sales-portal.page";
import { test } from "@playwright/test";

export class SignInPage extends SalesPortalPage {

    // Locators for the Sign In page
    readonly emailInput = this.page.locator("#emailinput");
    readonly passwordInput = this.page.locator("#passwordinput");
    readonly loginButton = this.page.getByRole("button", { name: "Login" });

    // Unique element to identify the page
    uniqueElement = this.loginButton;

    async fillCredentials({ email, password }: ICredentials) {
        return await test.step("Fill default credentials in Sign In form", async () => {
            email && (await this.emailInput.fill(email));
            password && (await this.passwordInput.fill(password));
        });
    }

    async clickLogin() {
        return await test.step("Click Login button", async () => {
            await this.loginButton.click();
        });
    }
}
