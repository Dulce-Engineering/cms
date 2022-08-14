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

    Utils.To_Class_Obj(data, this);
  }

  static Select_All(db, orderByCode, filters)
  {
    const where = db.To_Db_Where(filters,
    [
      {code: "WHERE_PROJECT", field: "project_id", op: "=="},
      {code: "WHERE_PARENT", field: "parent_id", op: "==", use_null: true}
    ]);

    /*query.sql = Db.appendUIOrderBy(query.sql, orderBy, 
    [
      "ORDERBY_NO_INCIDENTS",  "incident_count",
      "ORDERBY_LAST_INCIDENT", "last_time",
      "ORDERBY_SOURCE",        "source",
      "ORDERBY_ID",            "id"
    ]);*/
  
    return db.Select_Objs("component", De_Component, where);
  }

  static async Has_Children(db, id)
  {
    const where = [{field: "parent_id", op: "==", value: id}];
    const query_res = await db.Select_Query("component", where);
    return (query_res && !query_res.empty);
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