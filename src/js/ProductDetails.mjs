import { setLocalStorage, getLocalStorage, alertMessage } from "./utils.mjs";
import { updateCartCount } from "./utils.mjs";

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
    addToCart() {
        const cart = getLocalStorage("so-cart") || [];
        cart.push(this.product);
        setLocalStorage("so-cart", cart);
        updateCartCount();
        alertMessage(`${this.product.Name} has been added to the cart!`);
    }

    renderProductDetails(product) {
        const title = document.querySelector("title");
        const brand = document.querySelector(".product-detail h3");
        const name = document.querySelector(".product-detail h2");
        const image = document.querySelector(".product-detail img");
        const price = document.querySelector(".product-card__price");
        const color = document.querySelector(".product__color");
        const description = document.querySelector(".product__description");
        const button = document.getElementById("addToCart");

        title.textContent = product.Brand.Name + " | " + product.NameWithoutBrand;
        price.innerHTML = `<p class="product-card__price">$${product.FinalPrice}</p>`;

        if (product.FinalPrice < product.SuggestedRetailPrice) {
            const discount = (product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice * 100;
            price.innerHTML = `
        <p class="discount-tag">${Math.round(discount)}% OFF</p>
        <p class="product-card__discount">
            <span class="discount-price">$${product.FinalPrice}</span>
            <span class="original-price">$${product.SuggestedRetailPrice}</span>
        </p>
        `
        }

        brand.textContent = product.Brand.Name;
        name.textContent = product.NameWithoutBrand;
        image.src = product.Images.PrimaryExtraLarge;
        image.alt = product.Name;
        image.loading = "eager";
        image.srcset = `
            ${product.Images.PrimarySmall} 80w,
            ${product.Images.PrimaryMedium} 160w,
            ${product.Images.PrimaryLarge} 320w,
            ${product.Images.PrimaryExtraLarge} 600w`;
        image.sizes = "(max-width: 600px) 100vw, 600px";
        color.textContent = product.Colors.ColorName;
        description.innerHTML = product.DescriptionHtmlSimple;
        button.dataset.id = product.Id;
    }
}

updateCartCount();