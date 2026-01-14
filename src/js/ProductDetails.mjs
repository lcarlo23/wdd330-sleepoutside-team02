import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // the product details are needed before rendering the HTML
        this.renderProductDetails(this.product);
        // once the HTML is rendered, add a listener to the Add to Cart button        
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        document.getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
    }
    addToCart(product) {
        const cart = getLocalStorage("so-cart") || [];
        cart.push(product);
        setLocalStorage("so-cart", cart);
    }
    renderProductDetails(product) {
        const brand = document.querySelector(".product-detail h3");
        const name = document.querySelector(".product-detail h2");
        const image = document.querySelector(".product-detail img");
        const price = document.querySelector(".product-card__price");
        const color = document.querySelector(".product__color");
        const description = document.querySelector(".product__description");
        const button = document.getElementById("addToCart");

        brand.textContent = product.Brand.Name;
        name.textContent = product.NameWithoutBrand;
        image.src = product.Image;
        image.alt = product.Name;
        price.textContent = `$ ${product.FinalPrice}`;
        color.textContent = product.Colors.ColorName;
        description.innerHTML = product.DescriptionHtmlSimple;
        button.dataset.id = product.Id;
    }
}