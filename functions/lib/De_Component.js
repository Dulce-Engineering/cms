import Utils from "./Utils.js";

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
    const db_where = db.To_Db_Where(filters,
    [
      {code: "WHERE_TYPE",    field: "content_type", op: "=="},
      {code: "WHERE_PROJECT", field: "project_id", op: "=="},
      {code: "WHERE_PARENT", field: "parent_id", op: "==", use_null: true}
    ]);
    let objs = await db.Select_Objs(De_Component.table_name, De_Component, db_where);
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
      {code: "ORDERBY_TITLE#",      field: "title_numeric"},
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
    return De_Component.To_Number(this.key);
  }

  get title_numeric()
  {
    return De_Component.To_Number(this.title);
  }

  static To_Number(str_val)
  {
    const digit_str = str_val.replace(/\D/g,'');
    const num = Number(digit_str);
    return num == NaN ? 0 : num;
  }

  static async Add_Children(db, objs, open_ids, sort_by, filter_by)
  {

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

  // tree

  static async Get_Child_Ids(db, id, project_id)
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

  static async Has_Children(db, id, project_id)
  {
    const where = [{field: "parent_id", op: "==", value: id}];
    if (project_id)
    {
      where.push({field: "project_id", op: "==", value: project_id});
    }
    const query_res = await db.Select_Query(De_Component.table_name, where);
    return (query_res && !query_res.empty);
  }

  static async Get_Title(db, id)
  {
    return db.Select_Value_By_Id(id, De_Component.table_name, "title");
  }

  static async Get_Path(db, id)
  {
    let label = "";

    if (id)
    {
      const component = await De_Component.Select_By_Id(db, id);
      if (component)
      {
        const parent_label = await De_Component.Get_Path(db, component.parent_id);
        label = Utils.appendStr(parent_label, component.title, " / ");  
      }
    }

    return label;
  }

  static Get_Parent_Id(db, id)
  {
    return db.Select_Value_By_Id(id, De_Component.table_name, "parent_id");
  }
}

export default De_Component;
