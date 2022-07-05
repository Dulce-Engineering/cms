import Utils from "../lib/Utils.js";

class De_Text extends HTMLElement 
{
  constructor() 
  {
    super();

    this.project_elem = null;
    this.On_Project_Connected = this.On_Project_Connected.bind(this);
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

  async Get_Text(project_id, key)
  {
    const cache_key = "De_Text.Get_Text("+project_id+", "+key+")";
    return cache.use(cache_key, () => api.De_Component.Select_Text_Contents(project_id, key));
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
      const contents = await this.Get_Text(project_id, key);
      if (!Utils.isEmpty(contents))
      {
        for (const content of contents)
        {
          let elems;
          const render_type = this.getAttribute("renderType");
          if (render_type && render_type == "text")
          {
            elems = this.Render_As_Text(content);
          }
          else
          {
            elems = this.Render_As_Paras(content);
          }
          this.replaceChildren(...elems);
        }
      }
      else
      {
        console.warn("De_Text.Render(): No CMS content found.");
      }
    }
    else
    {
      console.warn("De_Text.Render(): No 'key' attribute supplied.");
    }
  }

  Render_As_Text(content)
  {
    const res = [];
    const paras = content.split("\n");
    for (const para of paras)
    {
      const para_elem = document.createTextNode(para);
      res.push(para_elem);
      if (para != paras[paras.length-1])
      {
        const newline_elem = document.createElement("br");
        res.push(newline_elem);
      }
    }

    return res;
  }

  Render_As_Paras(content)
  {
    const res = [];
    const paras = content.split("\n");
    for (const para of paras)
    {
      const para_elem = document.createElement("p");
      para_elem.innerText = para;
      res.push(para_elem);
    }

    return res;
  }
}

export default De_Text;