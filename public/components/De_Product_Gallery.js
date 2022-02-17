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
    this.render();
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
      this.shadowRoot.replaceChildren();
      for (const product of products)
      {
        const prod_html = await this.Render_Product(product);
        this.shadowRoot.append(prod_html);
      }
    }
  }

  async Render_Product(product)
  {
    const product_elem = document.createElement("div");

    // is_on_sale
    const on_sale_tag = await product.Get_Tag(this.db, "TAG_ONSALE");
    if (on_sale_tag)
    {
      // on sale
      const on_sale_elem = document.createElement("div");
      on_sale_elem.innerText = "On Sale!";
      product_elem.append(on_sale_elem);
      // original_price
      const original_price_elem = document.createElement("div");
      original_price_elem.innerText = on_sale_tag.data;
      product_elem.append(original_price_elem);
    }
    // brand name
    const brand_elem = document.createElement("div");
    brand_elem.innerText = await product.Get_Brand_Name(this.db);
    product_elem.append(brand_elem);
    // name
    const name_elem = document.createElement("div");
    name_elem.innerText = product.name;
    product_elem.append(name_elem);
    // price
    const price_elem = document.createElement("div");
    price_elem.innerText = product.price;
    product_elem.append(price_elem);
    // image
    const image_elem = document.createElement("img");
    image_elem.src = product.image_url;
    image_elem.width = 300;
    product_elem.append(image_elem);
    // add to cart
    const btn_elem = document.createElement("button");
    btn_elem.product = product;
    btn_elem.addEventListener("click", this.On_Click_Add_To_Cart);
    btn_elem.innerText = "Add to Cart";
    product_elem.append(btn_elem);

    return product_elem;
  }

  render()
  {
    const div = document.createElement("div");
    div.append("Hasta la vista React!!!");

    this.shadowRoot.append(div);
  }
}

export default De_Product_Gallery;