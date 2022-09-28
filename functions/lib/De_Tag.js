import Utils from "./Utils.js";

class De_Tag
{
  constructor(data)
  {
    this.id = null;
    this.label = null;

    Utils.To_Class_Obj(data, this);
  }

  static Select_All(db)
  {
    return db.Select_Objs("tag", De_Tag);
  }
}

export default De_Tag;