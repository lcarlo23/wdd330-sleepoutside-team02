import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    productList.innerHTML = "<li>Your cart is empty</li>";
    return;
  }

  // Render cart items
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  // Show cart total
  renderCartTotal(cartItems);
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function renderCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice,
    0
  );

  cartFooter.classList.remove("hide");

  const formattedTotal = cartTotal.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  cartFooter.querySelector(".cart-total").textContent = `Total: ${formattedTotal}`;
}

renderCartContents();
