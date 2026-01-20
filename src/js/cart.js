import { getLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./utils.mjs";

const cartFooter = document.querySelector(".cart-footer");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<li>Your cart is empty</li>";
    cartFooter.classList.add("hide");
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

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
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice,
    0
  );

  const formattedTotal = cartTotal.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  cartFooter.classList.remove("hide");
  cartFooter.querySelector(".cart-total").textContent =
    `Total: ${formattedTotal}`;
}

renderCartContents();
updateCartCount();
