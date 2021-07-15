class De_Comp extends HTMLElement 
{
  constructor() 
  {
    super();

    this.attachShadow({mode: 'open'});
    const rootElem = this.render();
    this.shadowRoot.append(rootElem);
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

  static get observedAttributes()
  {
    return ['a1', "a2", "a3"];
  }

  render()
  {
    console.log("nxComp.render()");
    const div = document.createElement("div");
    div.append("Hasta la vista React!!!");

    return div;
  }
}

export default De_Comp;