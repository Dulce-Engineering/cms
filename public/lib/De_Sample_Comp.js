import Utils from "./Utils.js";

class De_Component
{
  constructor(data)
  {
    this.id = null;
    // set other object fields to null
    // ...

    Utils.To_Class_Obj(data, this);
  }

  // return only object ids that match filters with given sort orders
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

  // return whole object by id
  static Select_By_Id(db, id)
  {
    //return db.Select_Obj_By_Id(id, "component", De_Component);
    //return db.cache.use(id, () => db.Select_Obj_By_Id(id, "component", De_Component));
  }

  // return calculated field

  Save(db)
  {
    //return db.Save(this, "component");
  }

  static Delete(db, id)
  {
    //return db.Delete("component", id);
  }
}

export default De_Component;