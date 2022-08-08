import Utils from "../lib/Utils.js";

class De_Html extends HTMLElement 
{
  constructor() 
  {
    super();

    this.project_elem = null;
    this.On_Project_Connected = this.On_Project_Connected.bind(this);
    this.Render_Contents = this.Render_Contents.bind(this);
  }

  connectedCallback()
  {
    this.Render_Wait();
  }

  disconnectedCallback()
  {
  }

  adoptedCallback()
  {
  }

  static observedAttributes = ["project-id"];
  attributeChangedCallback(attr_name, old_value, new_value)
  {
    if (attr_name == "project-id")
    {
      this.project_elem = document.getElementById(new_value);
      if (this.project_elem)
      {
        this.project_elem.addEventListener("connected", this.On_Project_Connected);
      }
    }
  }

  Get_HTML(project_id, key, update_fn)
  {
    const cache_key = "De_Html.Get_HTML("+project_id+", "+key+")";
    cache.Use_Update
      (cache_key, () => api.De_Component.Select_HTML_Contents(project_id, key), update_fn);
}

  // Events =======================================================================================

  On_Project_Connected(event)
  {
    this.Render();
  }

  // Rendering ====================================================================================

  Render_Wait()
  {
    const wait_elem = document.createElement("span");
    wait_elem.classList.add("wait");
    wait_elem.innerHTML = "&star;";

    this.replaceChildren(wait_elem);
  }

  async Render()
  {
    const key = this.getAttribute("key");
    if (key)
    {
      const project_id = await this.project_elem.Get_Project_Id();
      this.Get_HTML(project_id, key, this.Render_Contents);
    }
    else
    {
      console.warn("De_Html.Render(): No 'key' attribute supplied.");
    }
  }

  Render_Contents(contents)
  {
    if (!Utils.isEmpty(contents))
    {
      for (const content of contents)
      {
        this.innerHTML = content;
      }
    }
    else
    {
      console.warn("De_Html.Render(): No CMS content found.");
    }
  }
}

export default De_Html;