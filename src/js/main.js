import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const category = "tents";
const productListElement = document.querySelector("ul.product-list");

const dataSource = new ProductData(category);
const productsList = new ProductList(category, dataSource, productListElement);

loadHeaderFooter();
productsList.init();
