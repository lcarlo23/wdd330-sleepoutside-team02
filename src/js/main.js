import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, quickLook } from "./utils.mjs";

loadHeaderFooter();

const category = "tents";
const productListElement = document.querySelector("ul.product-list");

const dataSource = new ExternalServices();
const productsList = new ProductList(category, dataSource, productListElement);

productsList.init();

productListElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("quick-look-icon")) {
    quickLook(e.target.dataset.id, dataSource);
  }
});
