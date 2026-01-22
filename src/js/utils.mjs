// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Returns a parameter from the URL when requested
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Render a list (such as cards) from a template
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const newList = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, newList.join(''));
}

// Render elements from template (such as headers and footers)
export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}

// Load template file
export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

// Load header and footer from templates
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const header = document.getElementById('main-header');
  const footer = document.getElementById('main-footer');

  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);
  updateCartCount();
}

// cart count 
export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCountEl = document.querySelector(".cart-count");

  if (!cartCountEl) return;

  let itemCount = cartItems.length;

  if (itemCount > 0) {
    cartCountEl.textContent = itemCount;
    cartCountEl.style.display = "flex";
  } else {
    cartCountEl.style.display = "none";
  }
}