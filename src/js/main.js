//main.js
/*Import the ProductData module into main.js .*/
import ProductData from "./ProductData.mjs";
//create an instance of it.
const category = "tents";
const dataSource = new ProductData(category);

/*Import the ProductList class into main.js as a type module.*/
import ProductList from "./ProductList.mjs";
/*create an instance of your ProductList class in main.js and 
make sure that you can see the list of products.*/
const productListElement = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, productListElement);
productList.init();
/*Update main.js to import in loadHeaderFooter and then call
 that imported function to load the header and footer into src/index.html.*/
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

