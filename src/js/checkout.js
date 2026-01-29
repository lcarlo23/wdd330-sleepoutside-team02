import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const order = new CheckoutProcess("so-cart", "#totals");
const button = document.querySelector("#totals button");
const zip = document.getElementById("zip");

loadHeaderFooter();

order.init();

button.addEventListener("click", (e) => {
  e.preventDefault();

  const form = document.forms[0];

  form.reportValidity();

  if (form.checkValidity()) {
    order.checkout();
  }
});

zip.addEventListener("blur", order.calculateOrderTotal.bind(order));
