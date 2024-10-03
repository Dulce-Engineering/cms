import Utils from "../lib/Utils.js";

class De_Image extends HTMLElement 
{
  static tname = "de-image";

  constructor() 
  {
    super();

    this.project_elem = null;
    this.On_Project_Connected = this.On_Project_Connected.bind(this);
    this.Render_Images = this.Render_Images.bind(this);
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
    const cache_key = "De_Image.Get_Content("+project_id+", "+key+")";
    cache.Use_Update
      (cache_key, () => api.De_Component_Image.Select_Contents(project_id, key), update_fn);
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
      this.Get_Content(project_id, key, this.Render_Images);
    }
    else
    {
      console.warn("De_Image.Render(): No 'key' attribute supplied.");
    }
  }

  Render_Images(images)
  {
    if (api.De_Component_Image.last_rpc?.error)
    {
      const err = api.De_Component_Image.last_rpc.error;
      console.error("De_Image.Render_Images(): Error " + err.code + " - " + err.message);
    }
    else if (!Utils.isEmpty(images))
    {
      this.replaceChildren();
      for (const image of images)
      {
        const image_elem = document.createElement("img");
        image_elem.src = image.url;
        image_elem.alt = image.description;
        this.append(image_elem);
      }
    }
    else
    {
      console.warn("De_Image.Render_Images(): No CMS content found.");
    }
  }
}

export default De_Image;