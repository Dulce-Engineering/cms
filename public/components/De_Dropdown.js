import Utils from "../lib/Utils.js";

class De_Dropdown extends HTMLElement 
{
  static tname = "de-dropdown";

  constructor() 
  {
    super();

    this.On_Click_Src_Elem = this.On_Click_Src_Elem.bind(this);
    this.On_Click_Window = this.On_Click_Window.bind(this);
    this.On_Scroll_Window = this.On_Scroll_Window.bind(this);
    this.On_Click_Item = this.On_Click_Item.bind(this);

    this.Render();
  }

  set srcElem(elem)
  {
    this.src_elem = elem;
    elem.addEventListener("click", this.On_Click_Src_Elem);
  }

  set items(items)
  {
    const item_elem = document.createElement("span");
    item_elem.classList.add("de-dropdown-header");
    item_elem.addEventListener("click", this.On_Click_Src_Elem);
    item_elem.innerHTML = "&#215;";
    this.append(item_elem);

    for (const item of items)
    {
      const item_elem = document.createElement("span");
      item_elem.item_data = item.data;
      item_elem.item_action_fn = item.action;
      item_elem.classList.add("de-dropdown-item");
      item_elem.addEventListener("click", this.On_Click_Item);
      item_elem.append(item.label);

      this.append(item_elem);
    }
  }

  On_Click_Item(event)
  {
    if (event.target.item_action_fn)
      event.target.item_action_fn(event);
    this.Hide();
  }

  On_Click_Window(event)
  {
    const elems = event.composedPath();
    const is_menu_click = elems.includes(this);
    if (!is_menu_click)
    {
      this.Hide();
    }
  }

  On_Scroll_Window(event)
  {
    this.Hide();
  }

  On_Click_Src_Elem(event)
  {
    this.Toggle();
    event.stopPropagation();
  }

  Show()
  {
    let x, y;

    const padding = 10;
    const thisWidth = parseInt(this.style.width);
    const docRect = window.document.body.getBoundingClientRect();
    const rect = this.src_elem.getBoundingClientRect();
    if (docRect.width - rect.left < thisWidth + padding)
    {
      x = docRect.width - thisWidth - padding;
      y = rect.bottom;
    }
    else
    {
      x = rect.left;
      y = rect.bottom;
    }

    if (!Utils.isEmpty(window.ptDropdowns))
    {
      for (const ptDropdown of window.ptDropdowns)
      {
        ptDropdown.Hide();
      }
    }

    if (!Utils.hasValue(window.ptDropdowns))
    {
      window.ptDropdowns = [];
    }
    window.ptDropdowns.push(this);

    this.style.left = x + "px";
    this.style.top = y + "px";
    this.style.display = "flex";
    window.addEventListener("click", this.On_Click_Window);
    window.addEventListener("scroll", this.On_Scroll_Window);
    window.addEventListener("resize", this.On_Scroll_Window);
  }

  Hide()
  {
    this.style.display = "none";
    window.removeEventListener("click", this.On_Click_Window);
    window.removeEventListener("scroll", this.On_Scroll_Window);
    window.removeEventListener("resize", this.On_Scroll_Window);
  }

  Toggle()
  {
    if (this.style.display == "flex")
    {
      this.Hide();
    }
    else
    {
      this.Show();
    }
  }

  Render()
  {
    this.classList.add("de-dropdown");
  }
}

export default De_Dropdown;