import { test, expect, chromium } from "@playwright/test";

test("has title", async () => {
  const browser = await chromium.launch({ headless: false }); // Set headless: false to see the browser UI

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://parabank.parasoft.com/parabank/register.htm");

    await page.fill('input[name="customer.firstName"]', "Jazzy");
    await page.fill('input[name="customer.lastName"]', "Doe");
    await page.fill('input[name="customer.address.street"]', "123 Test St");
    await page.fill('input[name="customer.address.city"]', "TestCity");
    await page.fill('input[name="customer.address.state"]', "CA");
    await page.fill('input[name="customer.address.zipCode"]', "12345");
    await page.fill('input[name="customer.phoneNumber"]', "555-555-5555");
    await page.fill('input[name="customer.ssn"]', "123-45-6789");
    await page.fill('input[name="customer.username"]', "testuser1" + Date.now());
    await page.fill('input[name="customer.password"]', "Test123!");
    await page.fill('input[name="repeatedPassword"]', "Test123!");

    await page.click('input[value="Register"]');

    // Wait for success message and verify registration
    await page.waitForSelector('div#rightPanel p');
    await page.waitForTimeout(5000);
    // const message = await page.textContent('div#rightPanel p');
    // expect(message).toContain('Your account was created successfully');

    // Add a delay to keep browser open

  } finally {
    await browser.close();
  }
});
