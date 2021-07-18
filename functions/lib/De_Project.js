const Utils = require("./Utils.js");

class De_Project
{
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
    return db.Select_Objs("project", De_Project);
  }

  static Select_All_By_User(db)
  {
    let res;

    if (db.auth.currentUser)
    {
      const uid = db.auth.currentUser.uid;
      const where = [{field: "uids", op: "array-contains", value: uid}];
      res = db.Select_Objs("project", De_Project, where);  
    }

    return res;
  }

  static Select_By_Id(db, id)
  {
    return db.Select_Obj_By_Id(id, "project", De_Project);
  }

  static Select_By_Key(db, key)
  {
    return db.Select_Obj("project", De_Project, [{field: "key", op: "==", value: key}]);
  }

  Save(db)
  {
    let res;

    if (db.auth.currentUser)
    {
      const uid = db.auth.currentUser.uid;
      this.uids = [uid];
      res = db.Save(this, "project");
    }

    return res;
  }

  static Delete(db, id)
  {
    return db.Delete("project", id);
  }
}

module.exports = De_Project;