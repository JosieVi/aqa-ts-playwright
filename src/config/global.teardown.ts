import { sendNotification } from "utils/notifications/telegram";

export default async function () {
    await sendNotification(`Test run finished!
    
Link to deployed report:

https://JosieVi.github.io/aqa-ts-playwright/allure-report/#`);
}