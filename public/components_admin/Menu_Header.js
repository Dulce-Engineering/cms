import '../node_modules/header-buddy/Header_Buddy.js';
import "../components_admin/De_Menu.js";
import Utils from "../lib/Utils.js";
import config from "../lib/config.js";

class Menu_Header extends HTMLElement
{
  static tname = "menu-header";
    
  constructor()
  {
    super();
    Utils.Bind(this, "On_");
  }

  connectedCallback()
  {
    this.Render();
  }

  //disconnectedCallback() { }

  //static observedAttributes = ["attr-name1", "attr-name2"];
  //attributeChangedCallback(name, old_value, new_value) { }

  async Start()
  {
    await Utils.Import_API(config.get());
    this.header_elem.Init();
  }

  // public fields ================================================================================

  // public methods ===============================================================================

  // events =======================================================================================

  On_Signed_In()
  {
    this.menu_elem.option_signin.hidden = true;
    this.menu_elem.option_signout.hidden = false;
    this.dispatchEvent(new Event("signedin"));
  }

  On_Signed_Out()
  {
    this.menu_elem.option_signin.hidden = false;
    this.menu_elem.option_signout.hidden = true;
    this.dispatchEvent(new Event("signedout"));
  }

  On_Click_Sign_In()
  {
    menu_elem.Close();
    header_elem.Sign_In();
  }

  On_Click_Sign_Out()
  {
    menu_elem.Close();
    header_elem.Sign_Out();
  }

  // rendering ====================================================================================

  Render()
  {
    let title = "Page Title";
    if (this.hasAttribute("title"))
    {
      title = this.getAttribute("title");
    }

    const html = `
      <header-buddy id="header_elem">
        <de-menu id="menu_elem" slot="menu"></de-menu>
        <div slot="title">
          <a href="index.html" class="logo"><img src="/images/logo.svg"></a>
          <a href="index.html" class="title">deCMS</a> -
          <span class="title">${title}</span>
        </div>
      </header-buddy>
    `;

    const doc = Utils.toDocument(html); // parse html into dom elements
    this.replaceChildren(doc); // insert elements into this component
    Utils.Set_Id_Shortcuts(this, this); // create shortcust to elements by id

    this.menu_elem.option_signin.addEventListener("click", this.On_Click_Sign_In);
    this.menu_elem.option_signout.addEventListener("click", this.On_Click_Sign_Out);

    this.header_elem.addEventListener("signedin", this.On_Signed_In);
    this.header_elem.addEventListener("signedout", this.On_Signed_Out);
  }
}

Utils.Register_Element(Menu_Header);

export default Menu_Header;
