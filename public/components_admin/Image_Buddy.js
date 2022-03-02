import Utils from "../lib/Utils.js";

class Image_Buddy extends HTMLElement 
{
  static tname = "image-buddy";
  static Define()
  {
    customElements.define(Image_Buddy.tname, Image_Buddy);
  }

  constructor() 
  {
    super();
    this.images_value = [];
    Utils.Bind(this, "On_");
    this.attachShadow({mode: 'open'});
  }

  connectedCallback()
  {
    this.Render();
  }

  set value(files)
  {
    this.images_value = files || [];
    this.Render_Images();
  }

  get value()
  {
    return this.images_value;
  }

  // events =======================================================================================

  On_Click_Add_Image()
  {
    const input_images = document.createElement("input");
    input_images.type = "file";
    input_images.multiple = true;
    input_images.addEventListener("change", this.On_Change_Input_Image);
    input_images.click();
  }

  On_Change_Input_Image(event)
  {
    const input_images = event.target;
    this.images_value = [...this.images_value, ...input_images.files];
    this.Render_Images();

    const change = new Event("change");
    this.dispatchEvent(change);
  }

  On_Click_Del_Btn(event)
  {
    const del_btn = event.target;
    this.images_value = this.images_value.filter(i => i != del_btn.file);
    this.Render_Images();
    
    const change = new Event("change");
    this.dispatchEvent(change);
  }

  // rendering ====================================================================================

  Render_Images()
  {
    this.image_list.replaceChildren();
    for (let file of this.images_value)
    {
      this.Render_Image(file);
    }
  }

  Render_Image(file)
  {
    if (!file.obj_url)
    {
      file.obj_url = URL.createObjectURL(file);
    }

    const image_item = document.createElement('li');
    this.image_list.appendChild(image_item);

    const del_btn = document.createElement("button");
    del_btn.addEventListener("click", this.On_Click_Del_Btn);
    del_btn.innerText = "Delete";
    del_btn.file = file;
    image_item.appendChild(del_btn);

    const img = document.createElement('img');
    img.src = file.obj_url;
    img.height = 100;
    image_item.appendChild(img);
  }

  Render()
  {
    Utils.Add_Stylesheet(this);
    const html = `
      <button id="add_image_btn">Add</button>
      <ul id="image_list"></ul>
    `;
    const doc = Utils.toDocument(html);

    this.shadowRoot.append(doc);
    Utils.Set_Id_Shortcuts(this.shadowRoot, this);

    this.add_image_btn.addEventListener("click", this.On_Click_Add_Image);
  }
}

export default Image_Buddy;