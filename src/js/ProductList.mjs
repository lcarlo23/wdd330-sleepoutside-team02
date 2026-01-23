//ProductList.msj
import { renderListWithTemplate } from "./utils.mjs";

/*Create a template function that will simply return a template literal 
string for each of the templates needed. Add a function for a productCardTemplate(product). 
You can use the current HTML in the /index.html file as your starting point.*/
function productCardTemplate(product) {
  // Fix the path: change "../images" to "../public/images"
  const fixedImagePath = product.Image.replace("../images", "../public/images");

  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${fixedImagePath}" alt="${product.Brand.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

/*Add a class called ProductList 
and export this class as default.*/

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Pass the category to getData if your ProductData class requires it
    const list = await this.dataSource.getData();
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
