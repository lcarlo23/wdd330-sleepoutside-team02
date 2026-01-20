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