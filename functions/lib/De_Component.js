import Utils from "./Utils.js";
//const Utils = require('./Utils.js');

class De_Component
{
  static table_name = "component";

  constructor(data)
  {
    this.Init();
    Utils.To_Class_Obj(data, this);
  }

  static New(data)
  {
    return new De_Component(data);
  }

  Init()
  {
    this.content = null;
    this.content_type = null;
    this.id = null;
    this.key = null;
    this.project_id = null;
    this.title = null;
    this.parent_id = null;
  }

  static async To_Class_Obj(db_obj)
  {
    let class_obj = null;

    if (db_obj.content_type == "image")
    {
      const imprt = await import("./De_Component_Image.js");
      const De_Component_Image = imprt.default;

      class_obj = new De_Component_Image(db_obj);
    }
    else if (db_obj.content_type == "link")
    {
      const imprt = await import("./De_Component_Link.js");
      const De_Component_Link = imprt.default;

      class_obj = new De_Component_Link(db_obj);
    }
    else
    {
      class_obj = new this(db_obj);
    }

    return class_obj;
  }

  static async Select_All(db, sorts, filters)
  {
    const where = db.To_Db_Where(filters,
    [
      {code: "WHERE_PROJECT", field: "project_id", op: "=="},
      {code: "WHERE_PARENT", field: "parent_id", op: "==", use_null: true}
    ]);
    //const objs = await db.Select_Objs("component", De_Component, where);
    const objs = await db.Select_Objs("component", this.prototype.constructor, where);

    const order_by = db.To_Db_Order_By(sorts, 
    [
      {code: "ORDERBY_CONTENT",    field: "content"},
      {code: "ORDERBY_TYPE",       field: "content_type"},
      {code: "ORDERBY_ID",         field: "id"},
      {code: "ORDERBY_KEY",        field: "key"},
      {code: "ORDERBY_KEY#",       field: "key_numeric"},
      {code: "ORDERBY_PROJECT",    field: "project_title"},
      {code: "ORDERBY_TITLE",      field: "title"},
      {code: "ORDERBY_PARENT_ID",  field: "parent_id"},
    ]);
    if (sorts?.some(o => o.code == "ORDERBY_PROJECT"))
    {
      await Utils.Calc_Values
        (objs, "project_title", (o) => db.Select_Value_By_Id(o.project_id, "project", "title"));
    }
    db.Order_By(objs, order_by);
  
    return objs;
  }

  static Select_By_Id(db, id, class_type)
  {
    if (!class_type)
    {
      class_type = De_Component;
    }
    return db.Select_Obj_By_Id(id, "component", class_type);
  }

  get key_numeric()
  {
    const key_digit_str = this.key.replace(/\D/g,'');
    const key_num = Number(key_digit_str);
    return key_num == NaN ? 0 : key_num;
  }

  static async Add_Children(db, objs, open_ids, sort_by, filter_by)
  {

  }

  static async Has_Children(db, id, project_id)
  {
    const where = [{field: "parent_id", op: "==", value: id}];
    if (project_id)
    {
      where.push({field: "project_id", op: "==", value: project_id});
    }
    const query_res = await db.Select_Query("component", where);
    return (query_res && !query_res.empty);
  }

  static Get_Children(db, id, project_id)
  {
    const where = [{field: "parent_id", op: "==", value: id}];
    if (project_id)
    {
      where.push({field: "project_id", op: "==", value: project_id});
    }
    return db.Select_Values("id", "component", where);
  }

  static async Get_Title(db, id)
  {
    const component = await De_Component.Select_By_Id(db, id);
    return component?.title;
  }

  static Select_Contents(db, project_id, key)
  {
    //console.log("De_Component.Select_Contents()");
    const where =
    [
      {field: "key", op: "==", value: key},
      {field: "project_id", op: "==", value: project_id}
    ];
    return db.Select_Values("content", De_Component.table_name, where);
    //const id = `De_Component.Select_Contents(${project_id}, ${key})`;
    //return db.cache.use(id, () => db.Select_Values("content", "component", where));
  }

  Save(db)
  {
    return db.Save(this, De_Component.table_name);
  }

  static Save(db, obj, class_type)
  {
    if (!class_type)
    {
      class_type = De_Component;
    }
    const component = new class_type(obj);
    return component.Save(db);
  }

  Delete(db)
  {
    return db.Delete(De_Component.table_name, this.id);
  }
}

export default De_Component;
//module.exports = De_Component;