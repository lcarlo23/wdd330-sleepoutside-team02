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

// popup function for alerts
export function alertMessage(message, scroll = true) {
  const error = typeof message === "string" ? [message] : Object.values(message);
  const main = document.querySelector("main");

  error.forEach(err => {
    const div = document.createElement("p");
    const p = document.createElement("span");
    const close = document.createElement("span");

    div.classList.add("alert-box");
    close.classList.add("close-alert");

    p.textContent = err;
    close.textContent = "X";

    div.addEventListener("click", (e) => {
      if (e.target.classList.contains("close-alert")) {
        div.remove();
      }
    });

    div.append(p);
    div.append(close);
    main.prepend(div);
  })

  if (scroll) {
    window.scrollTo(0, 0);
  };
}

export async function quickLook(id, dataSource) {
  const modal = document.getElementById("quick-look");
  const product = await dataSource.findProductById(id);

  const image = product.Images.PrimaryLarge;
  const name = product.Name;
  const description = product.DescriptionHtmlSimple;

  populateModal(image, name, description, modal);
  modal.showModal();
}

function populateModal(image, name, description, modal) {

  modal.textContent = "";

  const img = document.createElement("img");
  const h4 = document.createElement("h4");
  const p = document.createElement("p");
  const close = document.createElement("p");

  close.classList.add("close-btn");

  img.src = image;
  img.alt = name;
  h4.textContent = name;
  p.innerHTML = description;
  close.textContent = "X";

  modal.append(img);
  modal.append(h4);
  modal.append(p);
  modal.append(close);

  close.addEventListener("click", () => {
    modal.close();
  })
}