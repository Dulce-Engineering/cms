import Utils from "../lib/Utils.js";

class Some_Component extends HTMLElement
{
  static tname = "some-component";
    
  constructor()
  {
    super();
    Utils.Bind(this, "On_"); // bind all event methods, starting with "On_", to this instance
  }

  connectedCallback()
  {
    this.Render();
  }

  disconnectedCallback()
  {
    
  }

  static observedAttributes = ["attr-name1", "attr-name2"];
  attributeChangedCallback(name, old_value, new_value)
  {
  }

  // public fields ================================================================================

  get some_field()
  {
    return this.an_element.innerText;
  }

  set some_field(value)
  {
    this.Some_Method(value);
  }

  // public methods ===============================================================================

  Some_Method(message) // sample method
  {
    this.an_element.innerText = message;
  }

  // events =======================================================================================

  On_Some_Event() // sample event
  {
    this.Some_Method("Something happened!");
  }

  // rendering ====================================================================================

  Render()
  {
    const html = `
      <div id="an_element"></div>
    `;

    const doc = Utils.toDocument(html); // parse html into dom elements
    this.replaceChildren(doc); // insert elements into this component
    Utils.Set_Id_Shortcuts(this, this); // create shortcust to elements by id

    // sample code
    this.an_element.addEventListener("click", this.On_Some_Event);
  }
}

Utils.Register_Element(Some_Component);

export default Some_Component;
