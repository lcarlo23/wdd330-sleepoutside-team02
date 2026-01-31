import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";
import { loadHeaderFooter, quickLook } from "./utils.mjs";

loadHeaderFooter();

const alert = new Alert("/json/alerts.json");
alert.init();

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
