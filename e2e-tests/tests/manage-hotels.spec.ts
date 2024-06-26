import { test, expect } from "@playwright/test";
import path from "path";
const UI_URL = "http://localhost:5173/";
test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("test1@mail.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Sign in Successful")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);
  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test Hotel");
  await page.locator('[name="pricePerNight"]').fill("999");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Budget").click();
  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Parking").check();
  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("1");
  await page.setInputFiles('[name="imageFiles"]', [
    path.join(
      "test_data",
      "test_images",
      "hotel_taj",
      "pexels-elmir-jafarov-375483362-19356058.jpg"
    ),
    path.join(
      "test_data",
      "test_images",
      "hotel_taj",
      "pexels-jvdm-1457847.jpg"
    ),
  ]);
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  await expect(page.getByText("Hotel Taj")).toBeVisible();
  await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
  await expect(page.getByText("Mumbai, India")).toBeVisible();
  await expect(page.getByText("Luxury")).toBeVisible();
  await expect(page.getByText("₹5999")).toBeVisible();
  await expect(page.getByText("2 adults, 1 children")).toBeVisible();
  await expect(page.getByText("5 Star Rating")).toBeVisible();
  await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});
