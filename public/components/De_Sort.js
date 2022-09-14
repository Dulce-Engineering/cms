import Utils from "../lib/Utils.js";

class De_Sort extends HTMLElement 
{
  static tname = "de-sort";

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

  disconnectedCallback()
  {

  }

  adoptedCallback()
  {

  }

  //static observedAttributes = ["attr-name"];
  attributeChangedCallback(attrName, oldValue, newValue)
  {

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

  Get_Field_Item(sort_code)
  {
    return this.field_list.querySelector("[sort-code='" + sort_code + "']");
  }

  Get_Field_Item_Text(sort_code)
  {
    const field_item = this.Get_Field_Item(sort_code);
    return field_item.childNodes[0].textContent;
  }

  Enable_Field_Item(sort_code, enabled)
  {
    const field_item = this.Get_Field_Item(sort_code);
    const btns = field_item.querySelectorAll("button");
    btns[0].disabled = !enabled;
    btns[1].disabled = !enabled;
  }

  Save()
  {
    if (this.id)
    {
      const value_str = JSON.stringify(this.value);
      localStorage.setItem(this.id, value_str);
    }
  }

  Load()
  {
    if (this.id)
    {
      const value_str = localStorage.getItem(this.id);
      this.value = JSON.parse(value_str);
    }
  }

  Add_Sort(sort)
  {
    const sort_item = this.Render_Sort(sort);
    this.sort_list.append(sort_item);
    this.Enable_Field_Item(sort.code, false);
  }

  // events =======================================================================================
  
  On_Click_Add()
  {
    // show field menu
    this.field_list.classList.add(this.add_class);
  }
  
  On_Click_Close()
  {
    // hide field menu
    this.field_list.classList.remove(this.add_class);
  }
  
  On_Click_Sort(e, sort)
  {
    // hide field menu
    this.field_list.classList.remove(this.add_class);

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
      <div class="header">
        Sorted By: 
        <span class="add_banner">
          <button id="add_btn" class="btn add_btn">+</button>
          <ul id="field_list" class="field_list">
            <li class="hdr_item">
              <button id="close_btn" class="btn close_btn">x</button> 
              Sort Options</li>
          </ul>
        </span>
      </div>
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

    field_item.classList.add("field_item");
    field_item.append(asc_btn, desc_btn);
  }

  Render_Sort(sort)
  {
    const remove_btn = document.createElement("button");
    remove_btn.innerText = "x";
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

export default De_Sort;