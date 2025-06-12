import { Page, test } from "@playwright/test";
import { USER_LOGIN, USER_PASSWORD } from "config/enviroment";
import { HomePage } from "ui/pages/home.page";
import { SignInPage } from "ui/pages/sign-in.page";
import { logStep } from "utils/reporter.utils";

export class SignInUIService {

    private signInPage: SignInPage;
    private homePage: HomePage;
    constructor(private page: Page) {
        this.signInPage = new SignInPage(page);
        this.homePage = new HomePage(page);
    }

    @logStep("Login as local user with default credentials")
    async signInAsLocalUser() {
        await this.signInPage.openPortal();
        await this.signInPage.fillCredentials({ email: USER_LOGIN, password: USER_PASSWORD });
        await this.signInPage.clickLogin();
        await this.homePage.waitForOpened();
        const token = (await this.page.context().cookies()).find((c) => c.name === "Authorization")!.value;
        return token;
    }
}