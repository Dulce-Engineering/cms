const Utils = require("./Utils.js");

class De_User
{
  constructor(data)
  {
    this.uid = null;
    this.displayName = null;
    this.email = null;
    //this.password = null;

    Utils.To_Class_Obj(data, this);
  }

  static Select_All(db)
  {
    return db.Select_Objs("user", De_User);
  }

  static async Select_By_Id(db, id)
  {
    const user = await db.Select_Obj_By_Id(id, "user", De_User);
    //db.auth.currentUser;
    user.email = "to do";
    user.password = null;

    return user;
  }

  Save(db)
  {
    delete this.email;
    delete this.password;
    return db.Save(this, "user");
  }

  static Delete(db, id)
  {
    return db.Delete("user", id);
  }
}

module.exports = De_User;