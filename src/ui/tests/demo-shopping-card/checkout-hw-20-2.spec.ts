import { test, expect, Page, Locator } from '@playwright/test';

interface IPromoCode {
    [key: string]: string,
}

const URL = 'https://anatoly-karpovich.github.io/demo-shopping-cart/';
const PRODUCTS: string[] = ['Product 2', 'Product 4', 'Product 6', 'Product 8', 'Product 10'];
const promocodes = {
    'CODE5': '5-PERCENT-FOR-UTILS',
    'CODE7': 'JAVA-FOR-BOOMERS',
    'CODE8': 'NO-PYTHON',
    'CODE10': 'HOT-COURSE',
    'CODESECOND10': '10-PERCENT-FOR-REDEEM',
    'CODE15': '15-PERCENT-FOR-CSS',
}
const totalDiscount = (100 - Object.keys(promocodes)
    .map(key => key.match(/\d+$/))
    .map(match => parseInt(match![0]))
    .reduce((acc, num) => acc + num, 0)) / 100;

test.describe('[UI] [Demo Shopping Card] [Checkout] HW20-2', () => {
    test('Should Add Products To Cart', async ({ page }) => {
        await page.goto(URL);
        await addProductsToCard(PRODUCTS, page);
        await expect(page.locator('.badge')).toHaveText(PRODUCTS.length.toString());

        let cartProductPrices = await Promise.all(PRODUCTS.map((productName) => getProductPrice(productName, page)));
        const totalPrice = cartProductPrices.reduce((acc, price) => acc + price, 0);

        await page.getByRole('button', { name: 'Shopping cart' }).click();
        await expect(page.locator('[data-product-id]')).toHaveCount(PRODUCTS.length);
        await expect(page.locator('#total-price')).toHaveText(`$${totalPrice.toFixed(2)}`);

        await inputPromoCode(promocodes, page);
        await expect(page.locator('#total-price')).toHaveText(`$${(totalPrice * totalDiscount).toFixed(2)} (-$${(totalPrice * (1 - totalDiscount)).toFixed(1)})`);
        await page.getByRole('button', { name: 'Continue to checkout' }).click();
        await expect(page.getByText('Thanks for ordering!')).toBeVisible();
        await expect(page.locator('.text-muted')).toHaveText(`$${(totalPrice * totalDiscount).toFixed(2)}`);
    });
});


function findProductLocators(productName: string[], page: Page): Locator[] {
    let productForOrderLocators: Locator[] = [];
    for (let i = 0; i < productName.length; i++) {
        productForOrderLocators[i] = page
            .locator('div.card-body')
            .filter({ has: page.getByText(`${productName[i]}`) })
            .getByRole('button', { name: 'Add to card' });
    }
    return productForOrderLocators;
}

async function addProductsToCard(productName: string[], page: Page): Promise<void> {
    const productForOrderLocators = findProductLocators(productName, page);
    for (let i = 0; i < productForOrderLocators.length; i++) {
        await productForOrderLocators[i].click();
    }
}

function getProductPriceSpan(productName: string, page: Page): Locator {
    return page
        .locator("div.card-body")
        .filter({
            has: page.getByText(`${productName}`),
        })
        .locator("span");
}

async function getProductPrice(productName: string, page: Page): Promise<number> {
    // const productLocator = await page.locator(`//li[.//h5[text()='${product}']]//span[@class=\'text-muted fw-bold\']`);
    // const priseAsText = await productLocator.innerText();
    const productPriceSpan = getProductPriceSpan(productName, page);
    const priseAsText = await productPriceSpan.innerText();
    const price = priseAsText.replace('$', '')
    return +price;
}

async function inputPromoCode(promocode: IPromoCode, page: Page,): Promise<void> {
    for (const code of Object.values(promocode)) {
        await page.getByPlaceholder('Promo code').fill(code);
        await page.getByRole('button', { name: 'Redeem' }).click();
        await expect(page.locator('#rebates-container li').getByText(code)).toBeVisible();
    }
}