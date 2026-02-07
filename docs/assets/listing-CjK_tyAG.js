import{l as m,a as u,g as s,s as g}from"./utils-PR4Y1CF8.js";import{P as h}from"./ProductData-BFcYmMbF.js";function p(t){var i,o;const a=t.Image||((i=t.Images)==null?void 0:i.PrimaryMedium)||"fallback.jpg",e=((o=t.Brand)==null?void 0:o.Name)||"Unknown Brand",n=t.NameWithoutBrand||"Unnamed Product",r=t.FinalPrice||"N/A";return`
    <li class="product-card">
      <img src="${a}" alt="${n}">
      <h3>${e}</h3>
      <p>${n}</p>
      <p class="product-card__price">$${r}</p>
      <a href="../product_pages/index.html?product=${t.Id||t.id}" class="btn">View Details</a>
      <button class="add-to-cart" data-id="${t.Id||t.id}">Add to Cart</button>
    </li>
  `}class y{constructor(a,e,n){this.category=a,this.dataSource=e,this.listElement=n}async init(){try{const a=await this.dataSource.getData();this.renderList(a)}catch(a){console.error("Error loading products:",a),this.listElement.innerHTML="<li>Error loading products.</li>"}}renderList(a){this.listElement.innerHTML=a.map(p).join("")}}m().then(()=>l());const c=u("category");document.querySelector(".title").textContent=c;const d=new h(c),f=new y(c,d,document.querySelector(".product-list"));f.init();function l(){const a=(s("so-cart")||[]).reduce((n,r)=>n+r.quantity,0),e=document.getElementById("cart-count");e&&(e.textContent=a)}function I(t){var r;let a=s("so-cart")||[];const e=t.Id||t.id,n=a.find(i=>i.id===e);n?n.quantity+=1:a.push({id:e,name:t.NameWithoutBrand||t.Name,price:t.FinalPrice,image:(r=t.Images)==null?void 0:r.PrimaryMedium,quantity:1}),g("so-cart",a),l()}document.addEventListener("click",async t=>{if(t.target.classList.contains("add-to-cart")){const a=t.target.dataset.id,e=await d.getProductById(a);e&&I(e)}});
