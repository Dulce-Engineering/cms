import Utils from "../lib/Utils.js";
import De_Db_Firestore from "../lib/De_Db_Firestore.js";
import De_Product from "../lib/De_Product.js";

class De_Cart extends HTMLElement 
{
  static tname = "de-cart";

  constructor() 
  {
    super();

    this.attachShadow({mode: 'open'});
    this.products = [];
    this.db = new De_Db_Firestore();

    this.On_Project_Connected = this.On_Project_Connected.bind(this);
    this.On_Click_Remove = this.On_Click_Remove.bind(this);
    this.On_Click_Add = this.On_Click_Add.bind(this);
    this.On_Click_Subtract = this.On_Click_Subtract.bind(this);
  }

  connectedCallback()
  {
    this.Render();
  }

  static observedAttributes = ["project-id"];
  attributeChangedCallback(attr_name, old_Value, new_value)
  {
    if (attr_name == "project-id")
    {
      const project_elem = document.getElementById(new_value);
      if (project_elem)
      {
        project_elem.addEventListener("connected", this.On_Project_Connected);
      }
    }
  }

  async Add_Product(product, quantity)
  {
    if (!this.products.includes(product))
    {
      product.quantity = quantity;
      this.products.push(product);
      const product_html = await this.Render_Product(product);
      this.products_elem.append(product_html);
    }
    else
    {
      product.quantity++;
      this.Update_Quantity(product);
    }
    this.Update_Total();
  }

  Remove_Product(product)
  {
    this.products = this.products.filter(p => p != product);
    const product_elem = this.shadowRoot.getElementById(product.id+"_item");
    product_elem.remove();
    this.Update_Total();
  }

  // events =======================================================================================

  On_Project_Connected(event)
  {
    this.project = event.target.project;
    //this.Render_Products();
  }

  On_Click_Remove(event)
  {
    const product = event.target.product;
    this.Remove_Product(product);
  }

  On_Click_Add(event)
  {
    const product = event.target.product;
    product.quantity++;
    this.Update_Quantity(product);
    this.Update_Product_Total(product);
    this.Update_Total();
  }

  On_Click_Subtract(event)
  {
    const product = event.target.product;
    product.quantity--;
    if (product.quantity <= 0)
    {
      this.Remove_Product(product);
    }
    else
    {
      this.Update_Quantity(product);
      this.Update_Product_Total(product);
      this.Update_Total();
    }
  }

  // rendering ====================================================================================

  async Update_Product_Total(product)
  {
    let total = product.price * product.quantity;
    let quantity_elem = this.shadowRoot.getElementById(product.id+"_total_price");
    quantity_elem.innerText = Utils.To_AUD(total);

    const original_price = await product.Get_Tag_Data(this.db, "TAG_ONSALE");
    if (original_price)
    {
      total = original_price * product.quantity;
      quantity_elem = this.shadowRoot.getElementById(product.id+"_total_original_price");
      quantity_elem.innerText = Utils.To_AUD(total);
    }
  }

  Update_Quantity(product)
  {
    const quantity_elem = this.shadowRoot.getElementById(product.id+"_quantity");
    quantity_elem.innerText = product.quantity;
  }

  Update_Total()
  {
    const total = this.products.reduce((prev_total, product) => prev_total += product.price * product.quantity, 0);
    this.total_elem.innerText = Utils.To_AUD(total);
  }

  async Render_Products(products)
  {
    if (!Utils.isEmpty(products))
    {
      this.products_elem.replaceChildren();
      for (const product of products)
      {
        const prod_html = await this.Render_Product(product);
        this.products_elem.append(prod_html);
      }
    }
  }

  async Render_Product(product)
  {
    const brand = await product.Get_Brand_Name(this.db);
    const sku = await product.Get_Tag_Data(this.db, "TAG_SKU");
    const original_price = await product.Get_Tag_Data(this.db, "TAG_ONSALE");
    const original_price_hidden = original_price != null ? "" : "hidden";

    const html = `
      <li id="${product.id}_item" class="product">
        <img id="${product.id}_image" src="${product.image_url}" width="100">
        <div class="details">
          <span id="${product.id}_brand" class="brand">${brand}</span>
          <span id="${product.id}_name" class="name">${product.name}</span>
          <span class="sku">sku: <span id="${product.id}_sku">${sku}</span></span>
        </div>
        <button id="${product.id}_remove_btn" class="remove">Remove</button>
        <div class="prices">
          <span id="${product.id}_original_price" class="original_price" ${original_price_hidden}>${Utils.To_AUD(original_price)}</span>
          <span id="${product.id}_price" class="price">${Utils.To_AUD(product.price)}</span>
        </div>
        <div class="quantity">
          <button id="${product.id}_subtract_btn">-</button>
          <span id="${product.id}_quantity" class="quantity_value">${product.quantity}</span>
          <button id="${product.id}_add_btn">+</button>
        </div>
        <div class="prices">
          <span id="${product.id}_total_original_price" class="original_price" ${original_price_hidden}>${Utils.To_AUD(original_price)}</span>
          <span id="${product.id}_total_price" class="price">${Utils.To_AUD(product.price)}</span>
        </div>
      </li>
    `;
    const elems = Utils.toDocument(html);
    
    const remove_btn = elems.getElementById(product.id+"_remove_btn");
    remove_btn.product = product;
    remove_btn.addEventListener("click", this.On_Click_Remove);

    const add_btn = elems.getElementById(product.id+"_add_btn");
    add_btn.product = product;
    add_btn.addEventListener("click", this.On_Click_Add);

    const subtract_btn = elems.getElementById(product.id+"_subtract_btn");
    subtract_btn.product = product;
    subtract_btn.addEventListener("click", this.On_Click_Subtract);

    return elems;
  }

  Render()
  {
    Utils.Add_Stylesheet(this);

    const html = `
      <ul id="products_elem"></ul>
      <div class="total">Total: <span id="total_elem">$0.00</span></div>
    `;
    const doc = Utils.toDocument(html);
    this.shadowRoot.append(doc);

    Utils.Set_Id_Shortcuts(this.shadowRoot, this);
  }
}

export default De_Cart;