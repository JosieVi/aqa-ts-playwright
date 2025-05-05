import { Locator, Page } from '@playwright/test';
import { SalesPortalPage } from './sales-portal.page';

export class LoginPage extends SalesPortalPage {
    loginButton = this.page.getByRole('button', { name: 'Login' });
    emailInput = this.page.getByPlaceholder('Enter a valid email address');
    passwordInput = this.page.getByPlaceholder('Enter password');
    uniqueElement = this.loginButton;

    async clickLogin() {
        const login = this.loginButton;
        await login.click();
    }

    async fillCredentials(email: string, password: string) {
        email && (await this.emailInput.fill(email));
        password && (await this.passwordInput.fill(password));
    }
}