import { defaultMetricsResponse } from "data/metrics.data";
import { TAGS } from "data/test-tags.data";
import { expect, test } from "fixtures/ui-services.fixture";
// import { expect, test } from "fixtures/business-steps.fixture";

const metricsForTests = [
    { name: 'Orders This Year', value: defaultMetricsResponse.Metrics.orders.totalOrders },
    { name: 'New Customers', value: defaultMetricsResponse.Metrics.customers.totalNewCustomers },
    { name: 'Canceled Orders', value: defaultMetricsResponse.Metrics.orders.totalCanceledOrders },
];

test.describe("[UI] [Home] [Metrics]", async () => {
    metricsForTests.forEach(({ name, value }) => {
        test(`Check the metric - ${name}`,
            { tag: [TAGS.CRITICAL_PATH] },
            async ({
                homeUIService,
                homePage,
                mock, }) => {

                // Precondition
                // Mock the metrics response
                await mock.metrics(defaultMetricsResponse);

                // Open the home page
                // await loginAsLocalUser();
                homeUIService.openAsLoggedInUser();

                // Act
                // Get the metric value from the home page and check it
                const ordersThisYear = await homePage.getMetrics(name);
                console.log(`Orders this year: ${ordersThisYear}`);
                expect.soft(ordersThisYear).toEqual(value);
            });
    });
});