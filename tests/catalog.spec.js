import { test, expect } from "@playwright/test";
import CatalogPage from "../business/catalog.page.js";
import ProductPage from "../business/product.page.js";
import {
  PRODUCTS,
  CATEGORIES,
  HAND_TOOLS_SUBCATEGORIES,
  BRANDS,
  SORT,
} from "../data/catalog.data.js";

test("User searches for an exact product by name", async ({ page }) => {
  const catalog = new CatalogPage(page);
  await catalog.open();
  await catalog.search(PRODUCTS.THOR_HAMMER);

  await expect(catalog.productNames).toHaveCount(1);
  await expect(catalog.productNames).toHaveText(PRODUCTS.THOR_HAMMER);
});

test("should list products from Hand Tools category", async ({ page }) => {
  const catalog = new CatalogPage(page);
  const product = new ProductPage(page);
  await catalog.open();
  await catalog.filterByCategory(CATEGORIES.HAND_TOOLS);
  await catalog.openFirstProduct();

  const category = await product.category.textContent();
  expect(HAND_TOOLS_SUBCATEGORIES).toContain(category);
});

test("User filters products by brand", async ({ page }) => {
  const catalog = new CatalogPage(page);
  const product = new ProductPage(page);
  await catalog.open();
  await catalog.filterByBrand(BRANDS.FORGE_FLEX);
  await catalog.openFirstProduct();

  await expect(product.brand).toHaveText(BRANDS.FORGE_FLEX);
});

test("User sorts products by price", async ({ page }) => {
  const catalog = new CatalogPage(page);
  await catalog.open();
  await catalog.sortBy(SORT.PRICE_ASC);

  await expect
    .poll(async () => {
      const values = await catalog.getPrices();
      return values.every((price, i) => i === 0 || values[i - 1] <= price);
    })
    .toBe(true);
});
