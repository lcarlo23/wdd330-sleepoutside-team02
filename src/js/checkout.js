// checkout.js
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter().then(() => {
  updateCartCount();
  renderOrderSummary();
});

function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}

function renderOrderSummary() {
  const cart = getLocalStorage("so-cart") || [];
  const numItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
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
