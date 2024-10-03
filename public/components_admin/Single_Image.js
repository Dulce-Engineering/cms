import Utils from "../lib/Utils.js";

class Single_Image extends HTMLElement 
{
  static tname = "single-image";

  static Define()
  {
    customElements.define(Single_Image.tname, Single_Image);
  }

  constructor() 
  {
    super();
    this.image_value = [];
    Utils.Bind(this, "On_");
    this.attachShadow({mode: 'open'});
  }

  connectedCallback()
  {
    this.Render();
  }

  set value(file)
  {
    this.image_value = file;
    this.Render_Image();
  }

  get value()
  {
    return this.image_value;
  }

  // events =======================================================================================

  On_Click_Add_Image()
  {
    const input_image = document.createElement("input");
    input_image.type = "file";
    input_image.multiple = false;
    input_image.addEventListener("change", this.On_Change_Input_Image);
    input_image.click();
  }

  On_Change_Input_Image(event)
  {
    const input_image = event.target;
    this.image_value = input_image.files[0];
    this.image_value.is_new = true;
    this.Render_Image();

    const change = new Event("change");
    this.dispatchEvent(change);
  }

  On_Click_Del_Btn(event)
  {
    const del_btn = event.target;
    this.image_value = null;
    this.Render_Image();
    
    const change = new Event("change");
    this.dispatchEvent(change);
  }

  // rendering ====================================================================================

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

  Render_Image()
  {
    if (this.image_value)
    {
      if (!this.image_value.obj_url)
      {
        this.image_value.obj_url = URL.createObjectURL(this.image_value);
      }

      this.img.src = this.image_value.obj_url;
    }
    else
    {
      this.img.src = this.Render_Image_Placeholder();
    }
  }

  Render()
  {
    this.shadowRoot.replaceChildren();
    Utils.Add_Stylesheet(this);
    const html = `
      <image id="img" height="100px">
      <div id="btn_bar">
        <button id="add_image_btn">Select</button>
        <button id="del_image_btn">Delete</button>
      </div>
    `;
    const doc = Utils.toDocument(html);

    this.shadowRoot.append(doc);
    Utils.Set_Id_Shortcuts(this.shadowRoot, this);

    this.add_image_btn.addEventListener("click", this.On_Click_Add_Image);
    this.del_image_btn.addEventListener("click", this.On_Click_Del_Btn);
  }
}

export default Single_Image;