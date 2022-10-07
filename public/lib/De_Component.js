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

  To_Db_Obj()
  {
    return {
      content: this.content,
      content_type: this.content_type,
      id: this.id,
      key: this.key,
      project_id: this.project_id,
      title: this.title,
      parent_id: this.parent_id,
    };
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
    else
    {
      class_obj = new this(db_obj);
    }

    return class_obj;
  }

  static async Select_All(db, sorts, filters)
  {
    const db_where = db.To_Db_Where(filters,
    [
      {code: "WHERE_TYPE",    field: "content_type", op: "=="},
      {code: "WHERE_PROJECT", field: "project_id",   op: "=="},
      {code: "WHERE_PARENT",  field: "parent_id",    op: "==", use_null: true}
    ]);
    let objs = await db.Select_Objs(De_Component.table_name, this.prototype.constructor, db_where);
    const where = db.To_Db_Where(filters,
    [
      {code: "WHERE_CONTENT", field: "content", op: "contains"},
      {code: "WHERE_ID",      field: "id",      op: "contains"},
      {code: "WHERE_KEY",     field: "key",     op: "contains"},
      {code: "WHERE_TITLE",   field: "title",   op: "contains"},
    ]);
    objs = db.Where(objs, where);

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

  static Select_By_Id(db, id)
  {
    return db.Select_Obj_By_Id(id, "component", this);
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

  static async Get_Children(db, id, project_id)
  {
    const where = [{field: "parent_id", op: "==", value: id}];
    if (project_id)
    {
      where.push({field: "project_id", op: "==", value: project_id});
    }

    const order_by = [{field: "title", dir: "asc"}];

    const comps = await db.Select_Values("id", De_Component.table_name, where, order_by);

    return comps;
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
    return db.Save(this, "component");
  }

  Delete(db)
  {
    return db.Delete(De_Component.table_name, this.id);
  }
}

export default De_Component;
//module.exports = De_Component;