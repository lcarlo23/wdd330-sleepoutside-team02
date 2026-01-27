import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const productListElement = document.querySelector("ul.product-list");

const dataSource = new ExternalServices();
const productsList = new ProductList(category, dataSource, productListElement);

const h2 = document.querySelector("h2");
h2.textContent = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
productsList.init();
