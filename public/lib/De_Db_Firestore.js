import Utils from "./Utils.js";
//const Utils = require('./Utils.js');

class De_Db_Firestore
{
  constructor(fb_db)
  {
    this.fb_db = fb_db || null;
    this.error = null;
  }
  
  get db()
  {
    return this.fb_db;
  }

  get last_error()
  {
    return this.error;
  }

  set last_error(e)
  {
    this.error = e;
    console.error(e);
  }

  // select =======================================================================================

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
      //res = new class_type(obj);
      res = this.To_Class(obj, class_type);
    }

    return res;
  }

  async Select_Row(table_name, where)
  {
    let obj;

    const query_res = await this.Select_Query(table_name, where, 1)
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
      res = this.To_Class(obj, class_type);
    }

    return res;
  }

  async Select_Row_By_Id(id, table_name)
  {
    let obj = null;

    if (id)
    {
      const table = this.db.collection(table_name);
      const query = table.doc(id);
      const query_res = await query.get();
      if (query_res.exists)
      {
        obj = query_res.data();
        obj.id = query_res.id;
      }
    }

    return obj;
  }
  
  async Select_Values(field_name, table_name, where, order_by)
  {
    let res;

    const objs = await this.Select(table_name, where, order_by);
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

  async Select_Objs(table_name, class_type, where, order_by)
  {
    let res;

    const objs = await this.Select(table_name, where, order_by);
    if (!De_Db_Firestore.Is_Empty(objs))
    {
      res = [];
      for (const obj of objs)
      {
        //const class_obj = new class_type(obj);
        const class_obj = await this.To_Class(obj, class_type);
        res.push(class_obj);
      }
    }

    return res;
  }

  async Select(table_name, where, order_by)
  {
    let res = null;

    const query_res = await this.Select_Query(table_name, where, null, order_by);
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

  async Select_Query(table_name, where, limit, order_by)
  {
    let query_res = null;

    const table = this.db.collection(table_name);
    let query = this.Add_Where(table, where);
    query = this.Add_Order_By(query, order_by);
    query = (limit != null && limit != undefined) ? query.limit(limit): query;

    try {query_res = await query.get();}
    catch (e) 
    {
      this.last_error = e;
      throw e;
    }

    return query_res;
  }

  // save, insert, update =========================================================================

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
    const obj = this.To_Obj(class_obj);
    delete obj.id;

    class_obj.id = await this.Insert_Row(obj, table_name);
    const res = class_obj.id ? true : false;

    return res;
  }

  async Insert_Row(data, table_name)
  {
    const ids = await this.Insert_Rows([data], table_name);
    const res = !Utils.isEmpty(ids) ? ids[0] : null;

    return res;
  }

  async Insert_Rows(rows, table_name)
  {
    let res;

    if (!Utils.isEmpty(rows))
    {
      res = [];
      const table = this.db.collection(table_name);
      try 
      {
        for (const row of rows)
        {
          const doc_ref = await table.add(row);
          res.push(doc_ref.id);
        }
      }
      catch (e)
      {
        this.last_error = e;
      }  
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
      console.error("De_Db_Firestore.Update(): Unable to update data.", e);
    }

    return res;
  }

  // delete =======================================================================================

  Delete(table_name, id)
  {
    return this.Delete_Ids(table_name, [id])
  }

  async Delete_Ids(table_name, ids)
  {
    let res = true;

    const table = this.db.collection(table_name);
    try
    {
      for (const id of ids)
      {
        await table.doc(id).delete();
      }
    }
    catch (e)
    {
      this.last_error = e;
      res = false;
    }

    return res;
  }

  async Delete_Objs(table_name, objs)
  {
    let res = true;

    if (!Utils.isEmpty(objs))
    {
      const ids = objs.map(o => o.id);
      res = await this.Delete_Ids(table_name, ids);
    }

    return res;
  }

  // where, order by ==============================================================================

  Order_By(data, order_bys)
  {
    let res = data;

    if (!De_Db_Firestore.Is_Empty(data) && !De_Db_Firestore.Is_Empty(order_bys))
    {
      res = data.sort((a, b) => Compare(a, b, 0));

      function Compare(a, b, idx)
      {
        let res = 0;

        if (idx < order_bys.length)
        {
          const order_by = order_bys[idx];
          const compare_dir = order_by.dir == "asc" ? 1: -1;

          if (a[order_by.field] > b[order_by.field]) res = compare_dir;
          else if (a[order_by.field] < b[order_by.field]) res = -compare_dir;
          else res = Compare(a, b, idx + 1);
        }

        return res;
      }
    }

    return res;
  }

  Add_Order_By(query, order_bys)
  {
    if (!Utils.isEmpty(order_bys))
    {
      for (const order_by of order_bys)
      {
        query = query.orderBy(order_by.field, order_by.dir);
      }
    }

    return query;
  }

  Where(data, wheres)
  {
    let res = data;

    if (!De_Db_Firestore.Is_Empty(data) && !De_Db_Firestore.Is_Empty(wheres))
    {
      for (const where of wheres)
      {
        if (where.op == "contains")
        {
          res = res.filter(o => o[where.field] && o[where.field].includes(where.value));
        }
      }
    }

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
  
  To_Db_Order_By(order_codes, order_bys)
  {
    let db_order_bys;

    if (!Utils.isEmpty(order_codes))
    {
      db_order_bys = [];

      for (const value of order_codes)
      {
        const order_code = value.code;
        const order_dir = value.dir == "desc" ? "desc": "asc";

        const order_by = order_bys.find(o => o.code == order_code);
        if (order_by)
        {
          const db_order_by = {field: order_by.field, dir: order_dir};
          db_order_bys.push(db_order_by);
        }
      }
    }

    return db_order_bys;
  }
  
  To_Db_Where(values, conditions)
  {
    let db_where;

    if (!Utils.isEmpty(values))
    {
      db_where = [];

      for (const value_name in values)
      {
        const condition = conditions.find(c => c.code == value_name);
        if (condition)
        {
          let value = values[value_name];
          if (value || (condition.use_null && value == null))
          {
            value = condition.map_fn ? condition.map_fn(value): value;

            const filter = {field: condition.field, op: condition.op, value};
            db_where.push(filter);
          }
        }
      }
    }

    return db_where;
  }

  // misc =========================================================================================
  
  async Exists(table_name, id)
  {
    const table = this.db.collection(table_name);
    const query = table.doc(id);
    const query_res = await query.get();
    const res = query_res.exists;

    return res;
  }

  To_Obj(class_obj)
  {
    return class_obj.To_Db_Obj ? class_obj.To_Db_Obj(class_obj) : Utils.To_Obj(class_obj);
  }

  To_Class(db_obj, class_type)
  {
    let class_obj = null;

    if (class_type.To_Class_Obj)
    {
      class_obj = class_type.To_Class_Obj(db_obj);
    }
    else
    {
      class_obj = new class_type(db_obj);
    }

    return class_obj;
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
//module.exports = De_Db_Firestore;