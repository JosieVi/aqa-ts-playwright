import { test, expect, Page, Locator } from '@playwright/test';

const URL = 'https://anatoly-karpovich.github.io/demo-shopping-cart/';
const totalDiscount = 0.45;
let PRODUCTNUMBERS = [2, 4, 6, 8, 10];
const promocodes = {
    'CODE5': '5-PERCENT-FOR-UTILS',
    'CODE7': 'JAVA-FOR-BOOMERS',
    'CODE8': 'NO-PYTHON',
    'CODE10': 'HOT-COURSE',
    'CODE10SECOND': '10-PERCENT-FOR-REDEEM',
    'CODE15': '15-PERCENT-FOR-CSS',
}

interface ICartProductPrices {
    [key: string]: number,
}

test.describe('[UI] [Demo Shopping Card] [Checkout] HW20-2', () => {
    test('Should Add Products To Cart', async ({ page }) => {
        await page.goto(URL);
        for (let productNumber of PRODUCTNUMBERS) {
            await addToCardButton(`Product ${productNumber}`, page).click();
        }
        await addToCardButton([`Product ${productNumber}`, `Product ${productNumber}`, page).click()




        await expect(page.locator('.badge')).toHaveText(PRODUCTNUMBERS.length.toString());
        await page.getByRole('button', { name: 'Shopping cart' }).click();
        await expect(page.locator('[data-product-id]')).toHaveCount(PRODUCTNUMBERS.length);

        let cartProductPrices: ICartProductPrices = {};
        for (let productNumber of PRODUCTNUMBERS) {
            await expect(getCartProductLocator(`Product ${productNumber}`, page)).toBeVisible();
            let currentProductPrice = await getProductPrice(`Product ${productNumber}`, page);
            cartProductPrices = { ...cartProductPrices, [`Product ${productNumber}`]: currentProductPrice };
        }
        const totalPrice = Object.values(cartProductPrices).reduce((acc, price) => acc + price, 0);
        await expect(page.locator('#total-price')).toHaveText(`$${totalPrice}.00`);

        await inputPromoCode(page, promocodes.CODE5);
        await inputPromoCode(page, promocodes.CODE7);
        await inputPromoCode(page, promocodes.CODE8);
        await inputPromoCode(page, promocodes.CODE10);
        await inputPromoCode(page, promocodes.CODE10SECOND);
        await inputPromoCode(page, promocodes.CODE15);
        await expect(page.locator('#total-price')).toHaveText(`$${(totalPrice * totalDiscount).toFixed(2)} (-$${(totalPrice * (1 - totalDiscount)).toFixed(1)})`);
        await page.getByRole('button', { name: 'Continue to checkout' }).click();
        await expect(page.getByText('Thanks for ordering!')).toBeVisible();
        await expect(page.locator('.text-muted')).toHaveText(`$${(totalPrice * totalDiscount).toFixed(2)}`);
    });
});

function addToCardButton(product: string[], page: Page): void {
    for (let i = 0; i < product.length; i++) {
        page.locator('div.card-body').filter({ has: page.getByText(`${product}`) }).getByRole('button', { name: 'Add to card' }).click();
    }
}

function getCartProductLocator(product: string, page: Page): Locator {
    return page.locator('[data-product-id]').getByRole('heading', { name: `${product}` });
}

async function getProductPrice(product: string, page: Page): Promise<number> {
    const productLocator = await page.locator(`//li[.//h5[text()='${product}']]//span[@class=\'text-muted fw-bold\']`);
    const priseAsText = await productLocator.innerText();
    const price = priseAsText.replace('$', '')
    return +price;
}

async function inputPromoCode(page: Page, promocode: string): Promise<void> {
    await page.getByPlaceholder('Promo code').fill(promocode);
    await page.getByRole('button', { name: 'Redeem' }).click();
    await expect(page.locator('#rebates-container li').getByText(promocode)).toBeVisible();

}