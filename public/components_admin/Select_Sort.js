import Utils from "../lib/Utils.js";

class Select_Sort extends HTMLElement 
{
  static tname = "select-sort";

  constructor() 
  {
    super();

    this.add_class = "add_sort";
    this.sort_event = new Event('sort');

    Utils.Bind(this, "On_");
  }

  connectedCallback()
  {
    this.Render();
  }

  get value()
  {
    let sort_items = null;

    if (this?.sort_list?.children && this?.sort_list?.children.length > 0)
    {
      sort_items = [];
      for (const sort_item of this.sort_list.children)
      {
        sort_items.push(sort_item.sort);
      }
    }

    return sort_items;
  }

  set value(sort_items)
  {
    if (sort_items && sort_items.length > 0)
    {
      this.sort_list.replaceChildren();
      for (const sort of sort_items)
      {
        this.Add_Sort(sort);
      }
      this.dispatchEvent(this.sort_event);
    }
  }

  get visible()
  {
    return this.style.display != "none"; 
  }

  set visible(value)
  {
    if (value)
    {
      Utils.Show(this.id);
    }
    else
    {
      Utils.Hide(this.id);
    }
  }

  Get_Storage_Dir(sort_code)
  {
    let res = null;

    if (this.id && sort_code)
    {
      const storage_str = localStorage.getItem(this.id);
      const storage_data = JSON.parse(storage_str);

      if (storage_data?.value)
      {
        const sort = storage_data.value.find(s => s.code == sort_code);
        if (sort)
        {
          res = sort.dir;
        }
      }
    }

    return res;
  }

  Get_Field_Item(sort_code)
  {
    return this.field_list.querySelector("[sort-code='" + sort_code + "']");
  }

  Get_Field_Item_Text(sort_code)
  {
    let res = null;
    const field_item = this.Get_Field_Item(sort_code);
    if (field_item)
    {
      res = field_item.childNodes[0].textContent;
    }

    return res;
  }

  Enable_Field_Item(sort_code, enabled)
  {
    let res = null;

    const field_item = this.Get_Field_Item(sort_code);
    if (field_item)
    {
      const btns = field_item.querySelectorAll("button");
      btns[0].disabled = !enabled;
      btns[1].disabled = !enabled;
    }

    return res;
  }

  Save()
  {
    if (this.id)
    {
      const storage_data =
      {
        value: this.value,
        visible: this.visible
      }

      const storage_str = JSON.stringify(storage_data);
      localStorage.setItem(this.id, storage_str);
    }
  }

  Load()
  {
    if (this.id)
    {
      const storage_str = localStorage.getItem(this.id);
      const storage_data = JSON.parse(storage_str);

      this.value = storage_data?.value ? storage_data.value : null;
      this.visible = storage_data?.visible ? storage_data.visible : false;
    }
  }

  Add_Sort(sort)
  {
    const sort_item = this.Render_Sort(sort);
    this.sort_list.append(sort_item);
    this.Enable_Field_Item(sort.code, false);
  }

  // events =======================================================================================
  
  On_Render_Title(title, code)
  {
    const dir = this.Get_Storage_Dir(code);

    const icon_up = document.createElement("i");
    icon_up.classList.add("icon_font-sort-up");
    icon_up.hidden = dir != "asc";

    const icon_down = document.createElement("i");
    icon_down.classList.add("icon_font-sort-down");
    icon_down.hidden = dir != "desc";

    const hdr_elem = document.createElement("div");
    hdr_elem.classList.add("title");
    hdr_elem.append(title, icon_up, icon_down);
    hdr_elem.addEventListener("click", () => this.On_Click_Title(code));

    return hdr_elem;
  }

  On_Click_Title(code)
  {
    const dir = this.Get_Storage_Dir(code) != "asc" ? "asc" : "desc";
    this.value = [{ code, dir }];
    this.Save();
  }

  On_Toggle_Display()
  {
    this.visible = !this.visible;
    this.Save();
  }
  
  On_Click_Add()
  {
    // show field menu
    this.field_list_dlg.showModal();
  }
  
  On_Click_Close()
  {
    // hide field menu
    this.field_list_dlg.close();
  }
  
  On_Click_Sort(e, sort)
  {
    // hide field menu
    //this.field_list_dlg.close();

    this.Add_Sort(sort);
    this.Save();
    this.dispatchEvent(this.sort_event);
  }
  
  On_Click_Remove(e, sort_item, sort)
  {
    sort_item.remove();

    this.Enable_Field_Item(sort.code, true);
    this.Save();

    this.dispatchEvent(this.sort_event);
  }

  // rendering ====================================================================================

  Render()
  {
    const field_items = this.children;
    for (const field_item of field_items)
      this.Render_Field_Item(field_item);

    const html = `
      <dialog id="field_list_dlg">
        <div class="dialog_header">
          <button id="close_btn" class="btn close_btn">
            <img src="/images/close_cross.svg">
          </button> 
          Sort Options
      </div>
        <div class="dialog_body">
          <ul id="field_list" class="field_list"></ul>
        </div>
      </dialog>

      <button id="add_btn" class="btn add_btn">
        Add Sort
        <img src="/images/add_plus.svg">
      </button>
      <ul id="sort_list" class="sort_list"></ul>
    `;
    const elems = Utils.toDocument(html);
    elems.getElementById("field_list").append(...field_items);
    this.append(elems);

    Utils.Set_Id_Shortcuts(this, this);

    this.add_btn.addEventListener("click", this.On_Click_Add);
    this.close_btn.addEventListener("click", this.On_Click_Close);
  }

  Render_Field_Item(field_item)
  {
    const code = field_item.getAttribute("sort-code");

    const asc_btn = document.createElement("button");
    asc_btn.innerHTML = "▲";
    asc_btn.classList.add("btn");
    asc_btn.classList.add("sort_btn");
    asc_btn.addEventListener("click", e => this.On_Click_Sort(e, {code, dir: "asc"}));

    const desc_btn = document.createElement("button");
    desc_btn.innerHTML = "▼";
    desc_btn.classList.add("btn");
    desc_btn.classList.add("sort_btn");
    desc_btn.addEventListener("click", e => this.On_Click_Sort(e, {code, dir: "desc"}));

    const btns = document.createElement("span");
    btns.classList.add("field_btns");
    btns.append(asc_btn, desc_btn);

    field_item.classList.add("field_item");
    field_item.append(btns);
  }

  Render_Sort(sort)
  {
    const remove_btn = document.createElement("button");
    remove_btn.innerHTML = "<img src=\"/images/close_cross_red.svg\">";
    remove_btn.classList.add("btn");
    remove_btn.classList.add("remove_btn");
    remove_btn.addEventListener("click", e => this.On_Click_Remove(e, sort_item, sort));

    const dir = sort.dir == "asc" ? "▲": "▼";
    const sort_item = document.createElement("li");
    sort_item.innerText = this.Get_Field_Item_Text(sort.code) + " " + dir;
    sort_item.classList.add("sort_item");
    sort_item.sort = sort;
    sort_item.append(remove_btn);

    return sort_item;
  }
}

Utils.Register_Element(Select_Sort);

export default Select_Sort;