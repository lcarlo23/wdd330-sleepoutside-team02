/* eslint-disable no-console */
// src/js/ProductList.mjs
function productTemplate(product) {
  const image =
    product.Image || product.Images?.PrimaryMedium || "fallback.jpg";
  const brand = product.Brand?.Name || "Unknown Brand";
  const name = product.NameWithoutBrand || "Unnamed Product";
  const price = product.FinalPrice || "N/A";

  return `
    <li class="product-card">
      <img src="${image}" alt="${name}">
      <h3>${brand}</h3>
      <p>${name}</p>
      <p class="product-card__price">$${price}</p>
      <a href="../product_pages/index.html?product=${product.Id || product.id}" class="btn">View Details</a>
      <button class="add-to-cart" data-id="${product.Id || product.id}">Add to Cart</button>
    </li>
  `;
}
  export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const products = await this.dataSource.getData();
      this.renderList(products);
    } catch (err) {
      console.error("Error loading products:", err);
      this.listElement.innerHTML = `<li>Error loading products.</li>`;
    }
  }

  renderList(products) {
    this.listElement.innerHTML = products.map(productTemplate).join("");
  }
}
