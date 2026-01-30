/* eslint-disable no-console */
// src/js/product-listing.js

import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
document.querySelector(".title").textContent = category;

const dataSource = new ProductData(category);
const productList = new ProductList(category, dataSource, document.querySelector(".product-list"));

productList.init();





