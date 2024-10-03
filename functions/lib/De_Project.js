import Utils from "./Utils.js";

class De_Project
{
  static table_name = "project";

  constructor(data)
  {
    this.id = null;
    this.key = null;
    this.title = null;
    this.url = null;
    this.uids = null;

    Utils.To_Class_Obj(data, this);
  }

  static Select_All(db)
  {
    return db.Select_Objs(De_Project.table_name, De_Project);
  }

  static Select_All_By_User(db, uid)
  {
    let res;

    if (uid)
    {
      const where = [{field: "uids", op: "array-contains", value: uid}];
      res = db.Select_Objs(De_Project.table_name, De_Project, where);  
    }

    return res;
  }

  static Select_By_Id(db, id)
  {
    return db.Select_Obj_By_Id(id, De_Project.table_name, De_Project);
  }

  static Select_By_Key(db, key)
  {
    return db.Select_Obj(De_Project.table_name, De_Project, [{field: "key", op: "==", value: key}]);
  }

  static async Select_As_Options(db)
  {
    const order_by = [{field: "title", dir: "asc"}];
    const projects = await db.Select_Objs(De_Project.table_name, De_Project, null, order_by);
    const options = projects.map(p => {return {value: p.id, text: p.title}});

    return options;
  }

  Save(db, uid)
  {
    let res;

    if (uid)
    {
      this.uids = [uid];
      res = db.Save(this, De_Project.table_name);
    }

    return res;
  }

  static Save(db, obj, uid)
  {
    const project = new De_Project(obj);
    return project.Save(db, uid);
  }

  static Delete(db, id)
  {
    return db.Delete(De_Project.table_name, id);
  }
}

export default De_Project;