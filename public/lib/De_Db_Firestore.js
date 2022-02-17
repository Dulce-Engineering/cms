import Utils from "./Utils.js";

class De_Db_Firestore
{
  constructor(fb_db)
  {
    if (fb_db)
    {
      this.db = fb_db;
    }
    else if (firebase)
    {
      this.app = firebase.app("de-cms");
      if (this.app)
      {
        this.db = this.app.firestore();
        //this.auth = firebase.auth(this.app);
        //this.fns = firebase.functions(this.app);
      }
    }
    this.last_error = null;
  }
  
  async Select_Value(table_name, field_name, where)
  {
    let res;

    const obj = await this.Select_Row(table_name, where);
    if (obj)
    {
      res = obj[field_name];
    }

    return res;
  }
  
  async Select_Value_By_Id(id, table_name, field_name)
  {
    let res;

    const obj = await this.Select_Row_By_Id(id, table_name);
    if (obj)
    {
      res = obj[field_name];
    }

    return res;
  }

  async Select_Obj(table_name, class_type, where)
  {
    let res;

    const obj = await this.Select_Row(table_name, where);
    if (obj)
    {
      res = new class_type(obj);
    }

    return res;
  }

  async Select_Row(table_name, where)
  {
    let obj;

    const table = this.db.collection(table_name);
    const query = this.Add_Where(table, where).limit(1);
    const query_res = await query.get();
    if (!query_res.empty)
    {
      const row = query_res.docs[0];
      obj = row.data();
      obj.id = row.id;
    }

    return obj;
  }

  async Select_Obj_By_Id(id, table_name, class_type)
  {
    let res;

    const obj = await this.Select_Row_By_Id(id, table_name);
    if (obj)
    {
      res = new class_type(obj);
    }

    return res;
  }

  async Select_Row_By_Id(id, table_name)
  {
    let obj;

    const table = this.db.collection(table_name);
    const query = table.doc(id);
    const query_res = await query.get();
    if (query_res.exists)
    {
      obj = query_res.data();
      obj.id = query_res.id;
    }

    return obj;
  }
  
  async Select_Values(field_name, table_name, where)
  {
    let res;

    const objs = await this.Select(table_name, where);
    if (!De_Db_Firestore.Is_Empty(objs))
    {
      res = [];
      for (const obj of objs)
      {
        res.push(obj[field_name]);
      }
    }

    return res;
  }

  async Select_Objs(table_name, class_type, where)
  {
    let res;

    const objs = await this.Select(table_name, where);
    if (!De_Db_Firestore.Is_Empty(objs))
    {
      res = [];
      for (const obj of objs)
      {
        const class_obj = new class_type(obj);
        res.push(class_obj);
      }
    }

    return res;
  }

  async Select(table_name, where)
  {
    let res, query_res;

    const table = this.db.collection(table_name);
    const query = this.Add_Where(table, where);

    try {query_res = await query.get();}
    catch (e) 
    {
      this.last_error = e;
      throw e;
    }

    if (query_res && !query_res.empty)
    {
      res = [];
      for (const row of query_res.docs)
      {
        const obj = row.data();
        obj.id = row.id;
        res.push(obj);
      }
    }

    return res;
  }

  async Save(class_obj, table_name)
  {
    let res = false;

    if (class_obj.id)
    {
      res = await this.Update(class_obj, table_name);
    }
    else
    {
      res = await this.Insert(class_obj, table_name);
    }

    return res;
  }

  async Insert(class_obj, table_name)
  {
    let res = false;

    const obj = this.To_Obj(class_obj);
    delete obj.id;
    const table = this.db.collection(table_name);

    try 
    {
      const doc_ref = await table.add(obj);
      class_obj.id = doc_ref.id;
      res = true;
    }
    catch (e)
    {
      this.last_error = e;
    }

    return res;
  }

  async Update(class_obj, table_name)
  {
    let res = false;

    const obj = this.To_Obj(class_obj);
    const id = obj.id;
    delete obj.id;
    const table = this.db.collection(table_name);

    try 
    {
      await table.doc(id).set(obj);
      res = true;
    }
    catch (e)
    {
      this.last_error = e;
    }

    return res;
  }

  async Delete(table_name, id)
  {
    let res = false;

    const table = this.db.collection(table_name);
    try
    {
      await table.doc(id).delete();
      res = true;
    }
    catch (e)
    {
      this.last_error = e;
    }

    return res;
  }

  async Exists(table_name, id)
  {
    const table = this.db.collection(table_name);
    const query = table.doc(id);
    const query_res = await query.get();
    const res = query_res.exists;

    return res;
  }

  Add_Where(table, where_filters)
  {
    if (!Utils.isEmpty(where_filters))
    {
      for (const filter of where_filters)
      {
        table = table.where(filter.field, filter.op, filter.value);
      }
    }

    return table;
  }
  
  To_Db_Where(where, conditions)
  {
    let db_where;

    if (!Utils.isEmpty(where))
    {
      db_where = [];

      for (let i = 0; i < conditions.length; i += 3)
      {
        const condition_code = conditions[i];
        const condition_field = conditions[i+1];
        const condition_op = conditions[i+2];
        const condition_map_fn = conditions[i+3];

        let condition_value = where[condition_code];
        if (condition_value)
        {
          if (condition_map_fn)
          {
            condition_value = condition_map_fn(condition_value);
          }

          const filter = {field: condition_field, op: condition_op, value: condition_value};
          db_where.push(filter);
        }
      }
    }

    return db_where;
  }

  To_Obj(class_obj)
  {
    return class_obj.To_Db_Obj ? class_obj.To_Db_Obj(class_obj) : Utils.To_Obj(class_obj);
  }

  static Is_Empty(items)
  {
    let res = false;

    if (items == null || items == undefined)
    {
      res = true;
    }
    else if (Array.isArray(items))
    {
      if (items.length == 0)
      {
        res = true;
      }
    }
    else if (typeof items == "string")
    {
      const str = items.trim();
      if (str.length == 0 || str == "")
      {
        res = true;
      }
    }
    else if (items.length == 0)
    {
      res = true;
    }

    return res;
  }
}

export default De_Db_Firestore;