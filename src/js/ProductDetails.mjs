import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;// wdd330-sleepoutside-team02/src/js/ProductDetails.mjs
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = null;
  }

  async init() {
    this.product = await this.dataSource.getProductById(this.productId);
    this.renderProductDetails(this.product);
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    const cart = getLocalStorage("so-cart") || [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
    alert(`${this.product.Name} has been added to your cart.`);
  }

  renderProductDetails(product) {
    const brand = document.querySelector(".product-detail h3");
    const name = document.querySelector(".product-detail h2");
    const price = document.querySelector(".product-detail__price");
    const description = document.querySelector(
      ".product-detail .product-detail__description",
    );
    const image = document.querySelector(".product-detail__image");
    // ✅ Safe image assignment
    if (product.Image) {
      // relative path from index.html in src/product_pages
      image.src = `../public/images/tents/${product.Image}`;
      image.alt = product.Name;
    } else {
      image.src = "../public/images/tents/default.jpg"; // fallback
      image.alt = "Image not available";
    }
    const color = document.querySelector(".product-detail__color");
    const button = document.getElementById("addToCart");
    brand.textContent = product.Brand.Name;
    name.textContent = product.NameWithoutBrand;
    price.textContent = `$${product.FinalPrice}`;
    color.textContent = product.Colors.ColorName;
    description.innerHTML = product.DescriptionHtmlSimple;
    button.dataset.id = product.Id;
  }
}

