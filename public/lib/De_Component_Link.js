import Utils from "./Utils.js";
import De_Component from "./De_Component.js";

class De_Component_Link extends De_Component
{
  constructor(data)
  {
    super(data);
    this.url = this.url == undefined ? null : this.url;
  }
}

export default De_Component_Link;