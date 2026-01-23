// utils.mjs
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

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
/*Make a new function in the utils.mjs file called renderListWithTemplate 
and export it. It should receive five (5) arguments: templateFn, parentElement,
 list, position, and clear.*/
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true,
) {
  if (clear) parentElement.innerHTML = "";
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
// Returns a parameter from the URL when requested
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
export function renderWithTemplate(template, parentElement, data, callback) {
  // If template is a string (from fetch), set it directly
  parentElement.innerHTML = template;
  if (callback) {
    callback();
  }
}

/*Add a function to the utils.mjs named loadTemplate. 
This asynchronous function fetches the content of the HTML file 
given a path. The response to the fetch is converted to text 
and returns the HTML content as a string.*/
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}
/*Add a function to the utils.mjs named loadHeaderFooter that can be
 exported. It needs to be able to do the following:
 Load the header and footer templates in from the partials using the loadTemplate.
 Grab the header and footer placeholder elements out of the DOM.
 Render the header and footer using renderWithTemplate.*/
export async function loadHeaderFooter() {
  // Path: Up one level from product_pages, into public/partials
  const headerTemplate = await loadTemplate("../public/partials/header.html");
  const headerElement = qs("#main-header");
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("../public/partials/footer.html");
  const footerElement = qs("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}
