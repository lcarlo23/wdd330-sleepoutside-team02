//cart.js
import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter().then(() => {
  updateCartCount();
  displayCartItems();

  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      setLocalStorage("so-cart", []);
      updateCartCount();
      displayCartItems();
    });
  }
});

function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}

function displayCartItems() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  cartItems.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement("li");
    li.className = "cart-card divider";
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h2>${item.name}</h2>
      <p>qty: ${item.quantity}</p>
      <p>$${item.price.toFixed(2)}</p>
    `;
    cartContainer.appendChild(li);
  });

  const totalElement = document.createElement("div");
  totalElement.className = "cart-total";
  totalElement.innerHTML = `<h2>Total: $${total.toFixed(2)}</h2>`;
  cartContainer.appendChild(totalElement);
}

