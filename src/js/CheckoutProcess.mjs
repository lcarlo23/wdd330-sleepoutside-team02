import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, selector) {
        this.key = key;
        this.selector = selector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSubTotal();
        this.calculateOrderTotal();
    }

    calculateItemSubTotal() {
        this.itemTotal = this.list.reduce((acc, item) => acc + item.FinalPrice, 0);
    }

    calculateOrderTotal() {
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        this.tax = this.itemTotal * 0.06;
        this.shipping = 10 + (2 * (this.list.length - 1));
        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const subtotal = document.querySelector(`${this.selector} #subtotal`);
        const tax = document.querySelector(`${this.selector} #tax`);
        const shipping = document.querySelector(`${this.selector} #shipping`);
        const total = document.querySelector(`${this.selector} #order-total`);

        subtotal.textContent = `$ ${this.itemTotal.toFixed(2)}`;
        tax.textContent = `$ ${this.tax.toFixed(2)}`;
        shipping.textContent = `$ ${this.shipping.toFixed(2)}`;
        total.textContent = `$ ${this.orderTotal.toFixed(2)}`;
    }
}