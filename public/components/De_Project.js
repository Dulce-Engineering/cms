import Utils from "../lib/Utils.js";

class De_Project_Component extends HTMLElement 
{
  static tname = "de-project";

  constructor() 
  {
    super();

    this.connected_event = new Event("connected");
  }

  //static observedAttributes = ["key"];
  attributeChangedCallback(attr_name, old_value, new_value)
  {
  }

  async connectedCallback()
  {
    await this.Get_Project();
    this.dispatchEvent(this.connected_event);
  }

  async Get_Project()
  {
    const key = this.getAttribute("key");
    const cache_key = "De_Project_Component.Get_Project("+key+")";
    return cache.use(cache_key, () => api.De_Project.Select_By_Key(key), Utils.MILLIS_MONTH);
  }

  async Get_Project_Id()
  {
    const project = await this.Get_Project();
    return project.id;
  }
}

export default De_Project_Component;