import { defaultMetricsResponse } from "data/metrics.data";
import { expect, test } from "fixtures/business-steps.fixture";

test.describe("[UI] [Home] [Metrics]", async () => {
    test(`Check the metric - Orders This Year`, async ({
        loginAsLocalUser,
        homePage,
        mock,
    }) => {

        await mock.metrics(defaultMetricsResponse);
        await loginAsLocalUser();
        const ordersThisYear = await homePage.getMetrics('Orders This Year');
        expect.soft(ordersThisYear).toEqual(defaultMetricsResponse.Metrics.orders.totalOrders);
    });


    test(`Check the metric - New Customers`, async ({
        loginAsLocalUser,
        homePage,
        mock,
    }) => {

        await mock.metrics(defaultMetricsResponse);
        await loginAsLocalUser();
        const newCustomers = await homePage.getMetrics('New Customers');
        expect.soft(newCustomers).toEqual(defaultMetricsResponse.Metrics.customers.totalNewCustomers);
    });


    test(`Check the metric - Canceled Orders`, async ({
        loginAsLocalUser,
        homePage,
        mock,
    }) => {

        await mock.metrics(defaultMetricsResponse);
        await loginAsLocalUser();
        const cancelledOrders = await homePage.getMetrics('Canceled Orders');
        expect.soft(cancelledOrders).toEqual(defaultMetricsResponse.Metrics.orders.totalCanceledOrders);
    }
    );
});




