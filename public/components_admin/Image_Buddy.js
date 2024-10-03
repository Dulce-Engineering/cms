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
    this.image_ids = [];
    this.deleted_ids = [];
    this.image_files = [];
    this.id_prefix = "";
    Utils.Bind(this, "On_");
    this.attachShadow({mode: 'open'});
  }

  connectedCallback()
  {
    this.Render();
  }

  set files(image_files)
  {
    this.image_files = image_files || [];
    this.Render_Images();

    const change = new Event("change");
    this.dispatchEvent(change);
  }

  get files()
  {
    return this.image_files;
  }

  set value(ids)
  {
    this.image_ids = ids || [];
    // get related images from storage bucket
    //this.Render_Images();
  }

  get value()
  {
    return this.image_files ? this.image_files.map(f => f.id): this.image_ids;
  }

  Add_Ids(input_images)
  {
    const prefix = Date.now();
    let idx = 0;
    for (const input_image of input_images)
    {
      input_image.id = this.id_prefix + "-" + prefix + "-" + idx;
      input_image.url = URL.createObjectURL(input_image);
      input_image.is_new = true;
      idx++;
    }
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
    this.Add_Ids(input_images.files);
    this.image_files = [...this.image_files, ...input_images.files];
    this.Render_Images();

    const change = new Event("change");
    this.dispatchEvent(change);
  }

  On_Click_Del_Btn(event)
  {
    const file = event.target.file;

    if (!file.is_new)
    {
      this.deleted_ids.push(file.id);
    }
    this.image_files = this.image_files.filter(i => i != file);
    this.Render_Images();
    
    const change = new Event("change");
    this.dispatchEvent(change);
  }

  // rendering ====================================================================================

  Render_Images()
  {
    this.image_list.replaceChildren();
    for (let file of this.image_files)
    {
      this.Render_Image(file);
    }
  }

  Render_Image(file)
  {
    const image_item = document.createElement('li');
    this.image_list.appendChild(image_item);

    const del_btn = document.createElement("button");
    del_btn.addEventListener("click", this.On_Click_Del_Btn);
    del_btn.innerText = "Delete";
    del_btn.file = file;
    image_item.appendChild(del_btn);

    const img = document.createElement('img');
    img.src = file.url;
    img.height = 100;
    image_item.appendChild(img);
  }

  Render()
  {
    this.shadowRoot.replaceChildren();
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