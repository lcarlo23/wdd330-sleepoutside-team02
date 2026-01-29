import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

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
        this.tax = this.itemTotal * 0.06;
        this.shipping = 10 + 2 * (this.list.length - 1);
        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const subtotal = document.querySelector(`${this.selector} #subtotal`);
        const tax = document.querySelector(`${this.selector} #tax`);
        const shipping = document.querySelector(`${this.selector} #shipping`);
        const total = document.querySelector(`${this.selector} #order-total`);

        subtotal.textContent = `$ ${this.itemTotal.toFixed(2)}`;
        tax.textContent = `$ ${this.tax.toFixed(2)}`;
        shipping.textContent = `$ ${this.shipping.toFixed(2)}`;
        total.textContent = `$ ${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
        const form = document.getElementById("checkout-form");
        const order = formDataToJSON(form);

        order.orderDate = new Date().toISOString();
        order.items = packageItems(this.list);
        order.orderTotal = this.orderTotal;
        order.shipping = this.shipping;
        order.tax = this.tax;

        try {
            const response = await services.checkout(order);
            setLocalStorage("so-cart", "");
            window.location.href = "success.html";
        } catch (error) {
            alertMessage(error.message);
        }
    }
}

function packageItems(items) {
    const simpleItems = items.map((item) => {
        return {
            id: item.id,
            name: item.name,
            price: item.FinalPrice,
            quantity: 1
        }
    });

    return simpleItems;
}

function formDataToJSON(formElement) {
    const formData = new FormData(formElement), convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}