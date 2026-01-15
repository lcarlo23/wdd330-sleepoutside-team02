import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {

    let price = `<p class="product-card__price">$${product.FinalPrice}</p>`;

    if (product.FinalPrice < product.SuggestedRetailPrice) {
        const discount = (product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice * 100;
        price = `
        <p class="discount-tag">${Math.round(discount)}% OFF</p>
        <p class="product-card__discount">
            <span class="discount-price">$${product.FinalPrice}</span>
            <span class="original-price">$${product.SuggestedRetailPrice}</span>
        </p>
        `
    }

    return `
    <li class="product-card">
        <a href="product_pages/?product=${product.Id}">
            <img
                src="${product.Image}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            ${price}
        </a>
    </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}