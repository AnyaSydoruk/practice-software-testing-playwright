import BasePage from "../core/base.page.js";

export default class CatalogPage extends BasePage {
  get searchInput() {
    return this.page.locator('[data-test="search-query"]');
  }
  get searchButton() {
    return this.page.locator('[data-test="search-submit"]');
  }
  get sortSelect() {
    return this.page.locator('[data-test="sort"]');
  }
  get productNames() {
    return this.page.locator('[data-test="product-name"]');
  }
  get productPrices() {
    return this.page.locator('[data-test="product-price"]');
  }

  async search(term) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async filterByCategory(name) {
    await this.page.getByLabel(name).check();
  }

  async filterByBrand(name) {
    await this.page.getByLabel(name).check();
  }

  async sortBy(value) {
    await this.sortSelect.selectOption(value);
  }

  async openFirstProduct() {
    await this.productNames.first().click();
  }

  async getPrices() {
    const texts = await this.productPrices.allTextContents();
    return texts.map((t) => parseFloat(t.replace("$", "")));
  }
}
