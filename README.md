# 🧪 AQA with TypeScript & Playwright

> Automated testing project using **Playwright** and **TypeScript**  
> Author: Olga Marushkina  
> Instructor: [Anatoly Karpovich](https://github.com/anatoly-karpovich)

![TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg)
![Playwright](https://img.shields.io/badge/framework-Playwright-green)
![Status](https://img.shields.io/badge/progress-Homework_Completed-brightgreen)

---

## HW-18

### Task #1  
**Create a smoke test suite for the registration form**

1. Navigate to: [Registration Form](https://anatoly-karpovich.github.io/demo-login-form/)
2. Implement smoke tests based on the following field validations:

**Username Field:**
- Required
- Length: 3 to 40 characters
- Leading/trailing spaces are invalid
- Only spaces = invalid

**Password Field:**
- Required
- Length: 8 to 20 characters
- Must contain both uppercase and lowercase letters
- Only spaces = invalid

---

### Task #2  
**Create a single smoke test for user registration**

1. Navigate to: [Demo Registration Page](https://anatoly-karpovich.github.io/demo-registration-form/)
2. Fill in the registration form
3. Verify successful registration

---

## HW-19

### Task #1  
**Create a UI test for dynamic controls**

1. Open [The Internet App](https://the-internet.herokuapp.com/)
2. Go to the “Dynamic Controls” page
3. Wait for the "Remove" button
4. Validate the page header
5. Check the checkbox
6. Click the "Remove" button
7. Wait until the checkbox disappears
8. Verify the "Add" button appears
9. Validate the "It's gone!" message
10. Click "Add"
11. Wait for checkbox to reappear
12. Validate the "It's back!" message

---

### Task #2  
**Create a UI test for login and home screen validation**

1. Open [AQA Course Project](https://anatoly-karpovich.github.io/aqa-course-project/#)
2. Login using `test@gmail.com / 12345678`
3. Wait until loading spinners disappear
4. Verify the login name is `Anatoly`
5. Validate the side navigation menu with screenshot (page: Home)

---

## HW-20

### Task #1  
**Create a DDT test suite with negative registration scenarios**

Use: [Login Form](https://anatoly-karpovich.github.io/demo-login-form/)

**Registration Page Validation:**
- **Username:** required, 3–40 chars, no whitespace-only or trailing/leading spaces
- **Password:** required, 8–20 chars, must include both upper/lowercase, no space-only input

**Login Page Validation:**
- **Username:** required
- **Password:** required

---

### Task #2  
**Create a UI test for product checkout validation**

1. Open [Shopping Cart App](https://anatoly-karpovich.github.io/demo-shopping-cart/)
2. Add products with IDs: 2, 4, 6, 8, 10
3. Validate the cart badge count
4. Open the checkout
5. Verify selected products and total sum
6. Apply all valid promo codes (from first lecture)
7. Confirm updated total price
8. Complete checkout
9. Validate final sum

---

## HW-21

### Task #1  
**Implement a Page Object for the Sign In page**

- Email input
- Password input
- Login button
- Method to fill in credentials
- Method to click login

---

### Task #2  
**Develop an end-to-end test for creating a customer**

1. Open [AQA Course Project](https://anatoly-karpovich.github.io/aqa-course-project/#)
2. Login with your credentials
3. Navigate to **Customers** module
4. Create a new customer
5. Validate success notification
6. Verify new customer is at the top of the table (compare all fields)

---

## HW-22

### Task #1  
**E2E test: create and delete a customer**

1. Login to Sales Portal
2. Go to **Customers List**
3. Navigate to **Add New Customer**
4. Create a new customer
5. Confirm customer is listed
6. Click “Delete” on the new customer
7. Confirm deletion in modal (click “Yes, Delete”)
8. Wait for modal to close and page to reload
9. Verify customer is no longer listed

**You’ll need:**
- Page Object for delete modal
- Integration of modal into Customers Page Object
- Fixtures

---

## HW-23

### Task #1  
**Write a smoke API test for login**

- Create and validate schema
- Check status code
- Verify presence of token in headers

---

### Task #2  
**Write a smoke API test for retrieving all customers**

1. Login
2. Create a new customer and validate 200 status
3. Retrieve all customers
4. Create and validate schema
5. Verify status code
6. Confirm created customer is in the response array
7. Validate `IsSuccess` and `ErrorMessage` fields

---

## HW-24

### Task #1  
**Create a SignInController**

- Implement `SignInController` similar to `CustomersController`
- Use it across all previously written API tests

---

### Task #2  
**Create a DDT-based test suite for creating customers**

- Include both positive and negative tests  
- Use `SignInController`, `CustomersController`  
- Clean up customers after each test

**Validation Rules:**
- **Email:** required, unique
- **Name:** 1–40 letters + one space allowed
- **Country:** required, allowed values: `USA`, `Canada`, `Belarus`, etc.
- **City:** 1–20 letters + one space
- **Street:** 1–40 alphanumeric chars + one space
- **House:** 1–999
- **Flat:** 1–9999
- **Phone:** 10–20 digits, starts with `+`
- **Notes:** up to 250 chars, no `<` or `>`

---

## HW-25

### Task #1  
**Integration tests for metrics**

Mock the response from `metrics` endpoint and verify:

1. **Orders This Year** — `Metrics.orders.totalOrders`
2. **New Customers** — `Metrics.customers.customers`
3. **Canceled Orders** — `Metrics.orders.totalCanceledOrders`

Preserve structure of other response fields.

---

## HW-26

### Task #1  
**E2E test: create a product**

1. Login
2. Go to **Products List**
3. Navigate to **Add New Product**
4. Fill in fields with valid data
5. Save the product
6. Validate its presence in the table

Use validation messages on the frontend. Field **Name** must be unique.

---

## HW-27

### Task #1  
**Decorators and test improvements**

1. Implement `testStep` decorator (as shown in lecture)
2. Use it on all service/page/controller methods with custom step names
3. Create `TAGS` enum with: `SMOKE`, `REGRESSION`, `UI`, `API`, `VISUAL_REGRESSION`
4. Apply tags in every existing test
5. Implement login reuse across all UI tests (excluding login-specific ones)
6. Ensure **no test failures**
7. Attach screenshot of the test report with passing results and implemented features ✅

---

## 📂 Project Structure

```
AQA-TS-PLAYWRIGHT
├── allure-report/
├── allure-results/
├── node_modules/
├── playwright-report/
└── src/
├── .auth/
├── api/
│ ├── apiClients/
│ ├── controllers/
│ ├── services/
│ └── tests/
├── config/
├── data/
├── fixtures/
├── types/
├── ui/
│ ├── pages/
│ ├── services/
│ └── tests/
└── utils/
├── notifications/
├── validations/
├── date.utils.ts
├── enum.utils.ts
├── reporter.utils.ts
└── request-params.utils.ts
```

---

## 📌 Technologies

| Tech         | Description                  |
|--------------|------------------------------|
| Playwright   | UI automation framework      |
| TypeScript   | Strongly typed JS superset   |
| Allure       | Reporting & visualization    |

---

## ✅ Run Tests

```bash
# UI Tests
  npm run test:ui

# API Tests
  npm run test:api

# UI mode
  npm run ui-mode

# Allure Report
  npm npm run allure-report-open
```

---

## 📷 Sample Report

> ![Allure Report Sample](./assets/sample-report.png)