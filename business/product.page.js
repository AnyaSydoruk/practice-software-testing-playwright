import BasePage from "../core/base.page.js";

export default class ProductPage extends BasePage {
  get brand() {
    return this.page.getByLabel("brand");
  }
  get category() {
    return this.page.getByLabel("category");
  }
}
