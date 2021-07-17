import Utils from "../lib/Utils.js";

class De_Dialog extends HTMLElement 
{
  constructor() 
  {
    super();

    this.On_Click_Window = this.On_Click_Window.bind(this);
    this.On_Scroll_Window = this.On_Scroll_Window.bind(this);
    this.On_Click_OK = this.On_Click_OK.bind(this);
    this.On_Click_Cancel = this.On_Click_Cancel.bind(this);

    this.Render();
  }

  connectedCallback()
  {

  }

  disconnectedCallback()
  {

  }

  adoptedCallback()
  {

  }

  attributeChangedCallback(attrName, oldValue, newValue)
  {

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

  On_Click_OK(event)
  {
    this.Hide();
  }

  On_Click_Cancel(event)
  {
    this.Hide();
  }

  Show()
  {
    //const this_width = parseInt(this.style.width);
    //const this_height = parseInt(this.style.height);
    //const left = window.innerWidth / 2 - this_width / 2;
    //const top = window.innerHeight / 2 - this_height / 2;
    //this.style.left = left + "px";
    //this.style.top = top + "px";

    this.style.display = "inline-block";
    window.addEventListener("click", this.On_Click_Window);
    window.addEventListener("scroll", this.On_Scroll_Window);
    window.addEventListener("resize", this.On_Scroll_Window);
  }

  Hide()
  {
    window.removeEventListener("click", this.On_Click_Window);
    window.removeEventListener("scroll", this.On_Scroll_Window);
    window.removeEventListener("resize", this.On_Scroll_Window);

    this.style.display = "none";
    this.remove();
  }

  Toggle()
  {
    if (this.style.display == "inline-block")
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
    this.innerHTML = 
      `<div id="title_div" class="de-dialog-header">Dialog Title</div>
      <div id="body_div" class="de-dialog-body"></div>
      <div id="btn_div" class="de-dialog-footer">
        <button id="ok_btn">OK</button>
        <button id="cancel_btn">Cancel</button>
      </div>`;
    this.classList.add("de-dialog");

    const ok_btn = this.querySelector("#ok_btn");
    ok_btn.onclick = this.On_Click_OK;

    const cancel_btn = this.querySelector("#cancel_btn");
    cancel_btn.onclick = this.On_Click_Cancel;
  }
}

export default De_Dialog;