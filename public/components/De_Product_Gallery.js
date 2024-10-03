import Utils from "../lib/Utils.js";
import De_Db_Firestore from "../lib/De_Db_Firestore.js";
import De_Product from "../lib/De_Product.js";

class De_Product_Gallery extends HTMLElement 
{
  static tname = "de-product-gallery";

  constructor() 
  {
    super();

    this.attachShadow({mode: 'open'});
    this.project = null;
    this.db = new De_Db_Firestore();

    this.On_Project_Connected = this.On_Project_Connected.bind(this);
    this.On_Click_Add_To_Cart = this.On_Click_Add_To_Cart.bind(this);
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

  // events =======================================================================================

  On_Project_Connected(event)
  {
    this.project = event.target.project;
    this.Render_Products();
  }

  On_Click_Add_To_Cart(event)
  {
    const addproduct = new CustomEvent('addproduct', { detail: event.target.product });
    this.dispatchEvent(addproduct);
  }

  // rendering ====================================================================================

  async Render_Products()
  {
    const products = await De_Product.Select_By_Project(this.db, this.project.id);
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
    const on_sale_tag = await product.Get_Tag(this.db, "TAG_ONSALE");
    const sale_hidden = on_sale_tag ? "" : "style='display:none;'";
    const original_price = on_sale_tag ? on_sale_tag.data : "";

    const html = `
      <div class="product">
        <span ${sale_hidden} class="sale">Sale</span>
        <img src="${product.image_url}">
        <div class="brand">${brand}</div>
        <div class="name">${product.name}</div>
        <div class="prices">
          <span class="original_price" ${sale_hidden}>${Utils.To_AUD(original_price)}</span>
          <span class="price">${Utils.To_AUD(product.price)}</span>
        </div>
        <button id="${product.id}_add_btn">Add to bag</button>
      </div>
    `;
    const elems = Utils.toDocument(html);
    
    const add_btn = elems.getElementById(product.id+"_add_btn");
    add_btn.product = product;
    add_btn.addEventListener("click", this.On_Click_Add_To_Cart);

    return elems;
  }

  Render()
  {
    Utils.Add_Stylesheet(this);

    const html = `
      <div id="products_elem"></div>
    `;
    const elems = Utils.toDocument(html);
    this.shadowRoot.append(elems);

    Utils.Set_Id_Shortcuts(this.shadowRoot, this);
  }
}

export default De_Product_Gallery;