import Utils from "./Utils.js";
import De_Component from "./De_Component.js";
//const Utils = require('./Utils.js');
//const De_Component = require('./De_Component.js');

class De_Component_Link extends De_Component
{
  constructor(data)
  {
    super(data);
    this.url = this.url == undefined ? null : this.url;
    this.content_type = "link";
  }

  static async Select_Contents(db, project_id, key)
  {
    let res = null;
    const where =
    [
      {field: "key", op: "==", value: key},
      {field: "project_id", op: "==", value: project_id}
    ];
    const links = await db.Select_Objs("component", De_Component_Link, where);
    if (!Utils.isEmpty(links))
    {
      res = links.map(l => {return {url: l.url, content: l.content};});
    }

    //console.log("De_Component_Link.Select_Contents(): res =", res);
    return res;
  }
}

export default De_Component_Link;
//module.exports = De_Component_Link;