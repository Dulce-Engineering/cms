import Utils from "../lib/Utils.js";

class De_Text extends HTMLElement 
{
  static tname = "de-text";

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

  Get_Content(project_id, key, update_fn)
  {
    const cache_key = "De_Component.Get_Content("+project_id+", "+key+")";
    cache.Use_Update
      (cache_key, () => api.De_Component.Select_Contents(project_id, key), update_fn);
  }

  // Events =======================================================================================

  On_Project_Connected(event)
  {
    this.Render();
  }

  // Rendering ====================================================================================

  Render_Wait()
  {
    const colour = Utils.Get_Attr_Def(this, "wait-color", "#000");
    const width="4";

    const html = `
    <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
    <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" class="wait">
        <defs>
            <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                <stop stop-color="${colour}" stop-opacity="0" offset="0%"/>
                <stop stop-color="${colour}" stop-opacity=".631" offset="63.146%"/>
                <stop stop-color="${colour}" offset="100%"/>
            </linearGradient>
        </defs>
        <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)">
                <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="${width}">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="0.9s"
                        repeatCount="indefinite" />
                </path>
                <circle fill="${colour}" cx="36" cy="18" r="1">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="0.9s"
                        repeatCount="indefinite" />
                </circle>
            </g>
        </g>
    </svg>
    `;
    this.replaceChildren(Utils.toDocument(html));
  }

  async Render()
  {
    const key = this.getAttribute("key");
    if (key)
    {
      const project_id = await this.project_elem.Get_Project_Id();
      this.Get_Content(project_id, key, this.Render_Contents);
    }
    else
    {
      console.warn("De_Text.Render(): No 'key' attribute supplied.");
    }
  }

  Render_Contents(contents)
  {
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