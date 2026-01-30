// src/js/ProductData.mjs
export default class ProductData {
  constructor(category) {
  const normalized = category.toLowerCase().replace("sleepingbags", "sleeping-bags");
  this.category = normalized;

  this.pathMap = {
    tents: "../public/json/tents.json",
    backpacks: "../public/json/backpacks.json",
    "sleeping-bags": "../public/json/sleeping-bags.json",
    hammocks: "../public/json/hammocks.json",
  };
}

  async getData() {
    const url = this.pathMap[this.category];
    if (!url) throw new Error(`Unknown category: ${this.category}`);

    const response = await fetch(url);
    const data = await response.json();

    // sleeping-bags.json has a Result array
    if (Array.isArray(data) && data[0]?.Result) {
      return data[0].Result;
    }
    if (data?.Result) {
      return data.Result;
    }
    if (Array.isArray(data)) {
      return data;
    }

    throw new Error("No product data found in JSON");
  }

  async getProductById(id) {
    const products = await this.getData();
    return products.find((p) => p.Id.toLowerCase() === id.toLowerCase());
  }
}

