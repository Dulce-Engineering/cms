import Utils from "../lib/Utils.js";

class Tag_Buddy extends HTMLElement 
{
  static tname = "tag-buddy";
  static Define()
  {
    customElements.define(Tag_Buddy.tname, Tag_Buddy);
  }

  constructor() 
  {
    super();
    this.tags_list = [];
    Utils.Bind(this, "On_");
    this.attachShadow({mode: 'open'});
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

  set tags(tags)
  {
    this.tags_list = tags || [];
    this.Update_Tags_List();
  }

  set value(tags) // [{id, label, data}]
  {
    this.Render_Tags(tags);
  }

  get value()
  {
    let values;

    const elems = this.tag_list ? this.tag_list.querySelectorAll("input") : null;
    if (!Utils.isEmpty(elems))
    {
      values = [];
      for (const elem of elems)
      {
        const value =
        {
          id: elem.getAttribute("tag-id"),
          label: elem.getAttribute("tag-label"),
          data: elem.value
        };
        values.push(value);
      }
    }  

    return values;
  }

  Is_Tag_Used(tag_id)
  {
    const item = this.tag_list.querySelector("#" + tag_id + "_item");
    return item != null;
  }

  // events =======================================================================================

  On_Click_Del_Btn(event)
  {
    const tag_elem = event.target.tag_elem;
    tag_elem.remove();
  }

  On_Click_Add_Menu(event, option)
  {
    if (!this.Is_Tag_Used(option.tag.id))
    {
      const tag =
      {
        id: option.tag.id,
        label: option.tag.label,
        data: ""
      };
      this.Render_Tag(tag);
    }
  }

  // rendering ====================================================================================

  Update_Tags_List()
  {
    const options = [];
    for (const tag of this.tags_list)
    {
      const option =
      {
        title: tag.label,
        on_click_fn: this.On_Click_Add_Menu,
        tag
      };
      options.push(option);
    }

    const menu_def =
    {
      title: "Select detail...",
      class_name: "menu",
      options 
    };
    this.add_btn.menu = menu_def;

  }

  Render_Tags(tags)
  {
    this.tag_list.replaceChildren();
    if (!Utils.isEmpty(tags))
    {
      for (const tag of tags)
      {
        this.Render_Tag(tag);
      }
    }
  }

  Render_Tag(tag)
  {
    const html = `
      <li id="${tag.id}_item">
        <label>${tag.label}</label>
        <input id="${tag.id}_data" value="${tag.data}" tag-id="${tag.id}" tag-label="${tag.label}"/>
        <button id="${tag.id}_del_btn">Delete</button>
      </li>
    `;
    const elems = Utils.toDocument(html);

    const del_btn = elems.getElementById(tag.id + "_del_btn");
    del_btn.addEventListener("click", this.On_Click_Del_Btn);
    del_btn.tag_elem = elems.getElementById(tag.id + "_item");

    this.tag_list.append(elems);
  }

  Render()
  {
    this.shadowRoot.replaceChildren();
    Utils.Add_Stylesheet(this);
    const add_btn_style = this.getAttribute("style-src-add-btn");

    const html = `
      <menu-buddy-btn id="add_btn" show-pos="bottom" btn-style-src="${add_btn_style}">Add</menu-buddy-btn>
      <ul id="tag_list"></ul>
    `;
    const elems = Utils.toDocument(html);
    this.shadowRoot.append(elems);

    Utils.Set_Id_Shortcuts(this.shadowRoot, this);
  }
}

export default Tag_Buddy;