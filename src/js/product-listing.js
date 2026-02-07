/* eslint-disable no-console */
// src/js/product-listing.js
import {
  loadHeaderFooter,
  getParam,
  getLocalStorage,
  setLocalStorage,
} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter().then(() => updateCartCount());

const category = getParam("category");
document.querySelector(".title").textContent = category;

const dataSource = new ProductData(category);
const productList = new ProductList(
  category,
  dataSource,
  document.querySelector(".product-list"),
);
productList.init();

function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}

function addToCart(product) {
  let cart = getLocalStorage("so-cart") || [];
  const productId = product.Id || product.id;
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: product.NameWithoutBrand || product.Name,
      price: product.FinalPrice,
      image: product.Images?.PrimaryMedium,
      quantity: 1,
    });
  }

  setLocalStorage("so-cart", cart);
  updateCartCount();
}

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const productId = e.target.dataset.id;
    const product = await dataSource.getProductById(productId);
    if (product) addToCart(product);
  }
});
