import Utils from "../lib/Utils.js";

class De_Sample_Component extends HTMLElement 
{
  static tname = "de-sample";

  constructor() 
  {
    super();

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

  Render()
  {
    Utils.Add_Stylesheet(this);

    const html = `
      <div id="msg_elem">Hasta la vista React!</div>
    `;
    const doc = Utils.toDocument(html);
    this.shadowRoot.append(doc);

    Utils.Set_Id_Shortcuts(this.shadowRoot, this);
  }
}

export default De_Sample_Component;