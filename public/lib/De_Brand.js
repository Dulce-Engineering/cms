import Utils from "./Utils.js";
//const Utils = require('./Utils.js');

class De_Brand
{
  static table_name = "brand";

  constructor(data)
  {
    this.id = null;
    this.name = null;

    Utils.To_Class_Obj(data, this);
  }

  To_Db_Obj()
  {
    return {
      id: this.id,
      name: this.name,
    };
  } 

  static Select_All(db, orderByCode, filters)
  {
    const where = db.To_Db_Where(filters,
    [
      "WHERE_PROJECT", "project_id", "==", null
    ]);

    /*query.sql = Db.appendUIOrderBy(query.sql, orderBy, 
    [
      "ORDERBY_NO_INCIDENTS",  "incident_count",
      "ORDERBY_LAST_INCIDENT", "last_time",
      "ORDERBY_SOURCE",        "source",
      "ORDERBY_ID",            "id"
    ]);*/
  
    return db.Select_Objs(De_Brand.table_name, De_Brand, where);
  }

  static Select_By_Project(db, project_id)
  {
    const where = [{field: "project_id", op: "==", value: project_id}];
    return db.Select_Objs(De_Brand.table_name, De_Brand, where);
  }

  static Get_Brand_Name(db, brand_id)
  {
    return db.Select_Value_By_Id(brand_id, "brand", "name");
  }
}

export default De_Brand;
//module.exports = De_Product;