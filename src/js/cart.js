import {
  getLocalStorage,
  loadHeaderFooter,
  updateCartCount,
} from "./utils.mjs";

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

  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });

  renderCartTotal(cartItems);
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span 
      class="cart-card__remove remove-item" 
      data-id="${item.Id}" 
      aria-label="Remove item from cart"
    >
      ✕
    </span>
  </li>`;
}

function renderCartTotal(cartItems) {
  const cartTotal = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

  const formattedTotal = cartTotal.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  cartFooter.classList.remove("hide");
  cartFooter.querySelector(".cart-total").textContent =
    `Total: ${formattedTotal}`;
}

function removeFromCart(event) {
  const idToRemove = event.target.dataset.id;

  let cartItems = getLocalStorage("so-cart") || [];

  // remove only the clicked item
  cartItems = cartItems.filter((item) => item.Id !== idToRemove);

  // save updated cart
  localStorage.setItem("so-cart", JSON.stringify(cartItems));

  // re-render UI
  renderCartContents();
  updateCartCount();
}

renderCartContents();
loadHeaderFooter();
