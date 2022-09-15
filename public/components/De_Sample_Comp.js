import Utils from "../lib/Utils.js";

class De_Sample_Component extends HTMLElement 
{
  static tname = "de-sample";

  constructor() 
  {
    super();
    this.attachShadow({mode: 'open'});
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

  // events =======================================================================================
  
  // rendering ====================================================================================

  Render()
  {
    Utils.Add_Stylesheet(this);

    const html = `
      <div id="msg_elem">Hasta la vista React!</div>
    `;
    const elems = Utils.toDocument(html);
    this.shadowRoot.append(elems);

    Utils.Set_Id_Shortcuts(this.shadowRoot, this);
  }
}

export default De_Sample_Component;