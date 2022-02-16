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
    this.render();
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

  static get observedAttributes()
  {
    return ['a1', "a2", "a3"];
  }

  render()
  {
    const div = document.createElement("div");
    div.append("Hasta la vista React!!!");

    this.shadowRoot.append(div);
  }
}

export default De_Sample_Component;