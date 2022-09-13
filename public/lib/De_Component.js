import Utils from "./Utils.js";

class De_Component
{
  constructor(data)
  {
    this.content = null;
    this.content_type = null;
    this.id = null;
    this.key = null;
    this.project_id = null;
    this.title = null;
    this.parent_id = null;

    Utils.To_Class_Obj(data, this);
  }

  static async Select_All(db, sorts, filters)
  {
    const where = db.To_Db_Where(filters,
    [
      {code: "WHERE_PROJECT", field: "project_id", op: "=="},
      {code: "WHERE_PARENT", field: "parent_id", op: "==", use_null: true}
    ]);
    const objs = await db.Select_Objs("component", De_Component, where);

    const order_by = db.To_Db_Order_By(sorts, 
    [
      {code: "ORDERBY_CONTENT",    field: "content"},
      {code: "ORDERBY_TYPE",       field: "content_type"},
      {code: "ORDERBY_ID",         field: "id"},
      {code: "ORDERBY_KEY",        field: "key"},
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

  static Select_By_Id(db, id)
  {
    return db.Select_Obj_By_Id(id, "component", De_Component);
  }

  static Select_Text_Contents(db, project_id, key)
  {
    const where =
    [
      {field: "key", op: "==", value: key},
      {field: "content_type", op: "==", value: "text"},
      {field: "project_id", op: "==", value: project_id}
    ];
    //return db.Select_Values("content", "component", where);
    const id = `De_Component.Select_Text_Contents(${project_id}, ${key})`;
    return db.cache.use(id, () => db.Select_Values("content", "component", where));
  }

  static Select_HTML_Contents(db, project_id, key)
  {
    const where =
    [
      {field: "key", op: "==", value: key},
      {field: "content_type", op: "==", value: "html"},
      {field: "project_id", op: "==", value: project_id}
    ];
    return db.Select_Values("content", "component", where);
  }

  Save(db)
  {
    return db.Save(this, "component");
  }

  static Delete(db, id)
  {
    return db.Delete("component", id);
  }
}

export default De_Component;