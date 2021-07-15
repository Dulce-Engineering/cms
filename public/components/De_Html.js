import De_Component from "../lib/De_Component.js";
import Utils from "../lib/Utils.js";
import De_Db_Firestore from "../lib/De_Db_Firestore.js";

class De_Html extends HTMLElement 
{
  constructor() 
  {
    super();

    this.key = null;
    this.project = null;

    this.db = new De_Db_Firestore();

    this.On_Project_Connected = this.On_Project_Connected.bind(this);
  }

  On_Project_Connected(event)
  {
    this.project = event.target.project;
    this.Render();
  }

  async Render()
  {
    const contents = await De_Component.Select_HTML_Contents(this.db, this.project.id, this.key);
    if (!Utils.isEmpty(contents))
    {
      for (const content of contents)
      {
        this.innerHTML = content;
      }
    }
  }

  // Life-Cycle ===================================================================================

  connectedCallback()
  {
  }

  disconnectedCallback()
  {
  }

  adoptedCallback()
  {
  }

  attributeChangedCallback(attr_name, old_value, new_value)
  {
    if (attr_name == "key")
    {
      this.key = new_value;
    }
    else if (attr_name == "project-id")
    {
      const project_elem = document.getElementById(new_value);
      if (project_elem)
      {
        project_elem.addEventListener("connected", this.On_Project_Connected);
      }
    }
  }

  static get observedAttributes()
  {
    return ["key", "project-id"];
  }
}

export default De_Html;