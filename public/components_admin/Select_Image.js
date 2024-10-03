import Utils from "../lib/Utils.js";

class Select_Image extends HTMLElement 
{
  static tname = "select-image";
  static Define()
  {
    customElements.define(Select_Image.tname, Select_Image);
  }

  constructor() 
  {
    super();
    this.image_value = null;
    this.image_files = null;
    this.image_placeholder = this.Render_Image_Placeholder();
    Utils.Bind(this, "On_");
    this.Get_Image_URL_By_Id = this.Get_Image_URL_By_Id.bind(this);
    this.attachShadow({mode: 'open'});
  }

  connectedCallback()
  {
    this.Render();
  }

  set value(id)
  {
    this.image_value = id;
    this.Render_Image();
  }

  get value()
  {
    return this.image_value;
  }

  set images(files)
  {
    this.image_files = files;
    this.Render_Menu();

    if (!this.Has_Image_By_Id())
    {
      this.value = null;
    }
    else
    {
      this.Render_Image();
    }
  }

  Has_Image_By_Id()
  {
    const image = this.image_files?.find(i => i.id == this.image_value);
    return image != undefined;
  }

  Get_Image_URL_By_Id()
  {
    const image = this.image_files?.find(i => i.id == this.image_value);
    return image ? image.url: null;
  }
  
  // events =======================================================================================

  On_Option_Click(event, option)
  {
    if (option && option.id == "OPTION_NONE")
    {
      this.value = null;
    }
    else
    {
      this.value = event.target.image_file.id;
    }
    this.menu_elem.menu_buddy.Hide();
  }

  // rendering ====================================================================================

  Render_Image()
  {
    if (this.image_value)
    {
      this.image_elem.src = this.Get_Image_URL_By_Id();
    }
    else
    {
      this.image_elem.src = this.image_placeholder;
    }
    this.image_elem.height = 100;
  }

  Render_Image_Placeholder()
  {
    const str = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <rect width="100" height="100" stroke="#eee" stroke-width="4" fill="none" />
        <line x1="0" y1="0" x2="100" y2="100" stroke="#eee" stroke-width="3" />
        <line x1="0" y1="100" x2="100" y2="0" stroke="#eee" stroke-width="3" />
        <!--text fill="#bbb" font-size="16px" dy="4" x="50%" y="50%" text-anchor="middle">None</text-->
      </svg>
    `;

    const cleaned = str
      .replace(/[\t\n\r]/gim, '') // Strip newlines and tabs
      .replace(/\s\s+/g, ' ') // Condense multiple spaces
      .replace(/'/gim, '\\i'); // Normalize quotes

    const encoded = encodeURIComponent(cleaned)
      .replace(/\(/g, '%28') // Encode brackets
      .replace(/\)/g, '%29');

    return `data:image/svg+xml;charset=UTF-8,${encoded}`;
  }

  Render_Menu()
  {
    const menu =
    {
      title: "Images",
      class_name: "menu",
      options:
      [
        {
          id: "OPTION_NONE",
          title: "None",
          on_click_fn: this.On_Option_Click
        }
      ]
    };

    for (const file of this.image_files)
    {
      const img_elem = document.createElement("img");
      img_elem.src = file.url;
      img_elem.image_file = file;
      img_elem.addEventListener("click", this.On_Option_Click);

      const img_cont = document.createElement("div");
      img_cont.classList.add("img_cont");
      img_cont.append(img_elem);

      const option = {title: img_cont};
      menu.options.push(option);
    }

    this.menu_elem.menu = menu;
  }

  Render()
  {
    this.shadowRoot.replaceChildren();
    Utils.Add_Stylesheet(this);
    const menu_btn_style = this.getAttribute("style-src-menu-btn");
    const menu_style = this.getAttribute("style-src-menu");

    const html = `
      <img id="image_elem">
      <menu-buddy-btn id="menu_elem" 
        btn-style-src="${menu_btn_style}"
        menu-style-src="${menu_style}">
        Select
      </menu-buddy-btn>
    `;
    const doc = Utils.toDocument(html);

    this.shadowRoot.append(doc);
    Utils.Set_Id_Shortcuts(this.shadowRoot, this);
  }
}

export default Select_Image;