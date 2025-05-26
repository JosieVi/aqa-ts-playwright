import { defaultMetricsResponse } from "data/metrics.data";
import { expect, test } from "fixtures/business-steps.fixture";

const metricsForTests = [
    { name: 'Orders This Year', value: defaultMetricsResponse.Metrics.orders.totalOrders },
    { name: 'New Customers', value: defaultMetricsResponse.Metrics.customers.totalNewCustomers },
    { name: 'Canceled Orders', value: defaultMetricsResponse.Metrics.orders.totalCanceledOrders },
];

test.describe("[UI] [Home] [Metrics]", async () => {
    metricsForTests.forEach(({ name, value }) => {
        test(`Check the metric - ${name}`, async ({
            loginAsLocalUser,
            homePage,
            mock,
        }) => {

            await mock.metrics(defaultMetricsResponse);
            await loginAsLocalUser();
            const ordersThisYear = await homePage.getMetrics(name);
            expect.soft(ordersThisYear).toEqual(value);
        });
    });
});