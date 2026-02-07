import{l as d,s as m,g as l}from"./utils-PR4Y1CF8.js";d().then(()=>{o(),i();const a=document.getElementById("clear-cart");a&&a.addEventListener("click",()=>{m("so-cart",[]),o(),i()})});function o(){const e=(l("so-cart")||[]).reduce((c,t)=>c+t.quantity,0),n=document.getElementById("cart-count");n&&(n.textContent=e)}function i(){const a=l("so-cart")||[],e=document.getElementById("cart-items");if(!e)return;if(e.innerHTML="",a.length===0){e.innerHTML="<p>Your cart is empty.</p>";return}let n=0;a.forEach(t=>{const s=t.price*t.quantity;n+=s;const r=document.createElement("li");r.className="cart-card divider",r.innerHTML=`
      <img src="${t.image}" alt="${t.name}" />
      <h2>${t.name}</h2>
      <p>qty: ${t.quantity}</p>
      <p>$${t.price.toFixed(2)}</p>
    `,e.appendChild(r)});const c=document.createElement("div");c.className="cart-total",c.innerHTML=`<h2>Total: $${n.toFixed(2)}</h2>`,e.appendChild(c)}
