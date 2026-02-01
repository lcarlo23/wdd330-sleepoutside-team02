// utils.mjs
// load header and footer partials

// utils.mjs
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export async function loadHeaderFooter() {
  const header = await fetch("/src/public/partials/header.html");
  const footer = await fetch("/src/public/partials/footer.html");
  document.querySelector("#main-header").innerHTML = await header.text();
  document.querySelector("#main-footer").innerHTML = await footer.text();
}

// helper to read query parameters from the URL

export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

