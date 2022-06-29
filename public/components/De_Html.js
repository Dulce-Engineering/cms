import Utils from "../lib/Utils.js";

class De_Html extends HTMLElement 
{
  constructor() 
  {
    super();

    this.project_elem = null;
    this.On_Project_Connected = this.On_Project_Connected.bind(this);
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

  async Get_HTML(project_id, key)
  {
    const cache_key = "De_Html.Get_HTML("+project_id+", "+key+")";
    return cache.use(cache_key, () => api.De_Component.Select_HTML_Contents(project_id, key));
  }

  // Events =======================================================================================

  On_Project_Connected(event)
  {
    this.Render();
  }

  // Rendering ====================================================================================

  async Render()
  {
    const key = this.getAttribute("key");
    if (key)
    {
      const project_id = await this.project_elem.Get_Project_Id();
      const contents = await this.Get_HTML(project_id, key);
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
    else
    {
      console.warn("De_Html.Render(): No 'key' attribute supplied.");
    }
  }
}

export default De_Html;