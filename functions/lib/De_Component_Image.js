import Utils from "./Utils.js";
import De_Component from "./De_Component.js";
//const Utils = require('./Utils.js');
//const De_Component = require('./De_Component.js');

class De_Component_Image extends De_Component
{
  constructor(data)
  {
    super(data);
  }

  Init()
  {
    super.Init();
    this.content_type = "image";
    this.description = null;
    this.url = null;
  }

  static New()
  {
    return new De_Component_Image();
  }

  static async Select_Contents(db, project_id, key)
  {
    //console.log("De_Component_Link.Select_Contents()");
    let res = null;
    const where =
    [
      {field: "key", op: "==", value: key},
      {field: "project_id", op: "==", value: project_id}
    ];
    const links = await db.Select_Objs("component", De_Component_Image, where);
    if (!Utils.isEmpty(links))
    {
      res = links.map(l => {return {url: l.url, description: l.description};});
    }

    //console.log("De_Component_Link.Select_Contents(): res =", res);
    return res;
  }
}

export default De_Component_Image;
//module.exports = De_Component_Image;