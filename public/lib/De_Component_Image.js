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

  To_Db_Obj()
  {
    const obj = super.To_Db_Obj();
    obj.description = this.description;
    obj.url = this.url;

    return obj;
  } 

  static async Select_By_Id_With_Image(db, id)
  {
    const component = await De_Component_Image.Select_By_Id(db, id);
    component.image = await component.Fetch_Image();

    return component;
  }

  async Fetch_Image()
  {
    let file = null;

    if (this.url)
    {
      const response = await fetch(this.url);
      const blob = await response.blob();
      file = new File([blob], this.id);
      file.db_url = this.url;
    }

    return file;
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

  async Save(db, db_strg)
  {
    // save comp first to gen record id
    await db.Save(this, De_Component_Image.table_name);
    return this.Save_Image(db, db_strg);
  }

  async Save_Image(db, db_strg)
  {
    // if comp saved and image provided then save image
    if (this.id)
    {
      if (this.Have_New_Image())
      {
        // component id is used as image id
        const ref = db_strg.ref().child(De_Component_Image.table_name + "/" + this.id);
        await ref.put(this.image);
        this.url = await ref.getDownloadURL();
      }
      else if (this.Have_Redundant_Image())
      {
        const ref = db_strg.ref().child(De_Component_Image.table_name + "/" + this.id);
        await ref.delete();
        this.url = null;
      }
    }
    
    // save comp again to save image url
    return db.Save(this, De_Component_Image.table_name);
  }

  Delete(db, db_strg)
  {
    if (this.Has_Image())
    {
      const ref = db_strg.ref().child(De_Component_Image.table_name + "/" + this.id);
      ref.delete();
    }
    return super.Delete(db);
  }

  Has_Image()
  {
    return Utils.hasValue(this.url);
  }

  Have_New_Image()
  {
    return this.id // indicates component record has been succesfully saved
      && this.image // image supplied
      && this.image.obj_url; // is new image supplied by user
  }

  Have_Redundant_Image()
  {
    return !this.image // no image available
      && this.url; // but url for previous image exists
  }
}

export default De_Component_Image;
//module.exports = De_Component_Image;