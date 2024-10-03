import Utils from "./Utils.js";
//const Utils = require('./Utils.js');
import De_Brand from "./De_Brand.js";

class De_Product
{
  static table_name = "product";

  constructor(data)
  {
    this.id = null;
    this.name = null;
    this.price = null;
    this.project_id = null;
    this.brand_id = null;
    this.image_ids = null;
    this.tags = null;
    this.main_image_id = null;

    Utils.To_Class_Obj(data, this);
  }

  static New()
  {
    return new De_Product();
  }

  To_Db_Obj()
  {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      project_id: this.project_id,
      brand_id: this.brand_id,
      image_ids: this.image_ids,
      main_image_id: this.main_image_id,
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
  
    return db.Select_Objs(De_Product.table_name, De_Product, where);
  }

  static Select_By_Project(db, project_id)
  {
    const where = [{field: "project_id", op: "==", value: project_id}];
    return db.Select_Objs(De_Product.table_name, De_Product, where);
  }

  Get_Tag(db, tag_id)
  {
    const where = 
    [
      {field: "product_id", op: "==", value: this.id},
      {field: "tag_id", op: "==", value: tag_id}
    ];
    return db.Select_Row("product_tag", where);
  }

  Get_Tag_Data(db, tag_id)
  {
    const where = 
    [
      {field: "product_id", op: "==", value: this.id},
      {field: "tag_id", op: "==", value: tag_id}
    ];
    return db.Select_Value("product_tag", "data", where);
  }

  Get_Brand_Name(db)
  {
    return De_Brand.Get_Brand_Name(db, this.brand_id);
  }

  static async Select_By_Id(db, id)
  {
    return db.Select_Obj_By_Id(id, De_Product.table_name, De_Product);
  }

  static async Select_By_Id_With_Details(db, id)
  {
    let product = null;

    try
    {
      product = await De_Product.Select_By_Id(db, id);
      //product.images = await De_Product_Image.Get_URLs_By_Product(db, db_strg, id);
      product.tags = await De_Product.Select_Tags_By_Product(db, id);
    }
    catch (e)
    {
      console.error(e);
    }

    return product;
  }

  static async Select_Tags_By_Product(db, product_id)
  {
    let res;
    const where = [{field: "product_id", op: "==", value: product_id}];
    const product_tags = await db.Select("product_tag", where);
    if (!Utils.isEmpty(product_tags))
    {
      res = [];
      for (const product_tag of product_tags)
      {
        const label = await db.Select_Value_By_Id(product_tag.tag_id, "tag", "label");
        const tag = 
        {
          id: product_tag.tag_id,
          label,
          data: product_tag.data
        };
        res.push(tag);
      }
    }

    return res;
  }

  static Select_Text_Contents(db, project_id, key)
  {
    const where =
    [
      {field: "key", op: "==", value: key},
      {field: "content_type", op: "==", value: "text"},
      {field: "project_id", op: "==", value: project_id}
    ];
    return db.Select_Values("content", De_Product.table_name, where);
  }

  Save(db)
  {
    return db.Save(this, De_Product.table_name);
  }

  static async Save(db, obj)
  {
    let res = true;

    const product = new De_Product(obj);
    res = res && await product.Save(db);
    res = res && await De_Product.Save_Tags_By_Product(db, product.id, product.tags);
    //res = res && await De_Product_Image.Delete_By_Product(db, db_strg, id);

    return res;
  }

  static async Delete(db, id)
  {
    let res = true;

    res = res && await db.Delete(De_Product.table_name, id);
    res = res && await De_Product.Delete_Tags_By_Product(db, id);
    //res = res && await De_Product_Image.Delete_By_Product(db, db_strg, id);

    return res;
  }

  static async Save_Tags_By_Product(db, product_id, tags)
  {
    let res = true;

    if (product_id && tags)
    {
    const where = [{field: "product_id", op: "==", value: product_id}];
    const prev_tags = await db.Select("product_tag", where);
    res = res && await db.Delete_Objs("product_tag", prev_tags);

    const new_tags = tags.map(t => ({data: t.data, product_id, tag_id: t.id}));
    res = res && await db.Insert_Rows(new_tags, "product_tag");
    }

    return res;
  }

  static async Delete_Tags_By_Product(db, product_id)
  {
    const where = [{field: "product_id", op: "==", value: product_id}];
    const tags = await db.Select("product_tag", where);
    return db.Delete_Objs("product_tag", tags);
  }
}

export default De_Product;
//module.exports = De_Product;