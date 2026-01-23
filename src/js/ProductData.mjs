// src/js/ProductData.mjs
export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = "/src/public/json/" + category + ".json";
  }
  // Inside ProductData.mjs constructor or getData method
  async getData() {
    // If your index.html is in /src/product_pages/, you need to go up to src:
    const response = await fetch("../public/json/tents.json");
    const data = await response.json();
    return data;
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}

