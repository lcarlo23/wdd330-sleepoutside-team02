// src/js/CheckoutProcess.mjs
/* eslint-disable no-console */
// src/js/checkout.js
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter().then(() => {
  updateCartCount();
  renderOrderSummary();
  setupFormValidation();
});

function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}

function renderOrderSummary() {
  const cart = getLocalStorage("so-cart") || [];
  const numItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );
  const shipping = subtotal * 0.1;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  document.getElementById("num-items").textContent = numItems;
  document.getElementById("cartTotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("shipping").textContent = `$${shipping.toFixed(2)}`;
  document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("orderTotal").textContent = `$${total.toFixed(2)}`;
}

function setupFormValidation() {
  const form = document.forms.checkout;
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const errors = [];
    const card = form.cardNumber.value.trim();
    const exp = form.expiration.value.trim();
    const code = form.code.value.trim();

    // Basic validation
    if (!/^\d{16}$/.test(card)) {
      errors.push("Invalid Card Number");
    }

    if (!/^\d{2}\/\d{2}$/.test(exp)) {
      errors.push("Invalid Expiration Date (use MM/YY)");
    }

    if (!/^\d{3}$/.test(code)) {
      errors.push("Invalid Security Code");
    }

    // Clear previous errors
    const errorBox = document.querySelector(".checkout-form");
    errorBox.querySelectorAll(".error").forEach((el) => el.remove());

    if (errors.length > 0) {
      errors.forEach((msg) => {
        const div = document.createElement("div");
        div.className = "error";
        div.textContent = msg;
        errorBox.prepend(div);
      });
    } else {
      // Optionally save order data here
      window.location.href = "../checkout/success.html";
    }
  });
}
