// src/js/product.js
import { getParam } from "../js/utils.mjs";
import ProductData from "../js/ProductData.mjs";
import ProductDetails from "../js/ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();
