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
    this.images = null;
    this.tags = null;
    this.image_url = null;
    this.main_image = null;

    Utils.To_Class_Obj(data, this);
  }

  To_Db_Obj()
  {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      project_id: this.project_id,
      brand_id: this.brand_id,
      image_url: this.image_url
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

  static async Select_By_Id_With_Images(db, db_strg, id)
  {
    const product = await De_Product.Select_By_Id(db, id);
    product.images = await De_Product_Image.Get_Images_By_Product(db, db_strg, id);
    product.tags = await De_Product.Select_Tags_By_Product(db, id);
    product.main_image = De_Product_Image.Find_By_URL(product.images, product.image_url);

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

  async Save(db, db_strg)
  {
    await db.Save(this, De_Product.table_name);
    await De_Product_Image.Save_By_Product(db, db_strg, this.id, this.images);
    await De_Product.Save_Tags_By_Product(db, this.id, this.tags);
    this.image_url = this.main_image.url;
    await db.Save(this, De_Product.table_name);

    return true;
  }

  static async Save_Tags_By_Product(db, product_id, tags)
  {
    const where = [{field: "product_id", op: "==", value: product_id}];
    const prev_tags = await db.Select("product_tag", where);
    await db.Delete_Objs("product_tag", prev_tags);

    const new_tags = tags.map(t => ({data: t.data, product_id, tag_id: t.id}));
    await db.Insert_Rows(new_tags, "product_tag");
  }

  static async Delete_Tags_By_Product(db, product_id)
  {
    const where = [{field: "product_id", op: "==", value: product_id}];
    const tags = await db.Select("product_tag", where);
    return db.Delete_Objs("product_tag", tags);
  }

  static async Delete(db, db_strg, id)
  {
    let res = true;

    res = res && await db.Delete(De_Product.table_name, id);
    res = res && await De_Product.Delete_Tags_By_Product(db, id);
    res = res && await De_Product_Image.Delete_By_Product(db, db_strg, id);

    return res;
  }
}

class De_Product_Image
{
  static table_name = "product_image";

  constructor(data)
  {
    this.id = null;
    this.product_id = null;
    this.image = null;

    Utils.To_Class_Obj(data, this);
  }

  To_Db_Obj()
  {
    return {
      id: this.id,
      product_id: this.product_id
    };
  } 

  static Select_By_Product(db, product_id)
  {
    const where = [{field: "product_id", op: "==", value: product_id}];
    return db.Select_Objs(De_Product_Image.table_name, De_Product_Image, where);
  }

  static async Get_Images_By_Product(db, db_strg, product_id)
  {
    let files;
    const where = [{field: "product_id", op: "==", value: product_id}];
    const image_ids = await db.Select_Values("id", De_Product_Image.table_name, where);

    files = [];
    for (const image_id of image_ids)
    {
      const ref = db_strg.ref().child(De_Product_Image.table_name + "/" + image_id);
      const url = await ref.getDownloadURL();
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], image_id);
      file.url = url;
      files.push(file);
    }

    return files;
  }

  static async Save_By_Product(db, db_strg, product_id, files)
  {
    await De_Product_Image.Delete_Missing(db, db_strg, files, product_id);
    await De_Product_Image.Insert_New(db, db_strg, files, product_id);
  }

  static async Delete_Missing(db, db_strg, files, product_id)
  {
    const prod_images = await De_Product_Image.Select_By_Product(db, product_id);
    if (!Utils.isEmpty(prod_images))
    {
      for (const prod_image of prod_images)
      {
        const image_exists = files.find(f => f.name == prod_image.id);
        if (!image_exists)
        {
          await prod_image.Delete(db, db_strg);
        }
      }
    }
  }

  static async Delete_By_Product(db, db_strg, product_id)
  {
    let res = true;

    const prod_images = await De_Product_Image.Select_By_Product(db, product_id);
    if (!Utils.isEmpty(prod_images))
    {
      for (const prod_image of prod_images)
      {
        res = res && await prod_image.Delete(db, db_strg);
      }
    }

    return res;
  }

  static async Insert_New(db, db_strg, files, product_id)
  {
    if (!Utils.isEmpty(files))
    {
      for (const file of files)
      {
        const image_exists = await db.Exists(De_Product_Image.table_name, file.name);
        if (!image_exists)
        {
          const prod_image = new De_Product_Image();
          prod_image.product_id = product_id;
          prod_image.image = file;
          await prod_image.Save(db, db_strg);  
        }
      }
    }
  }

  async Save(db, db_strg)
  {
    await db.Save(this, De_Product_Image.table_name);
    if (this.image)
    {
      //this.image.new_id = this.id;
      const ref = db_strg.ref().child(De_Product_Image.table_name + "/" + this.id);
      if (!await this.Image_Exists(db_strg))
      {
        await ref.put(this.image);
        this.image.url = await ref.getDownloadURL();
      }
    }
  }

  async Delete(db, db_strg)
  {
    await db_strg.ref().child(De_Product_Image.table_name + "/" + this.id).delete();
    return db.Delete(De_Product_Image.table_name, this.id);
  }

  async Image_Exists(db)
  {
    let res = true;

    const ref = db.ref().child(De_Product_Image.table_name + "/" + this.id);
    try {const url = await ref.getDownloadURL();}
    catch (error)
    {
      res = false;
    }

    return res;
  }

  static Find_By_URL(images, url)
  {
    let res;

    if (!Utils.isEmpty(images))
    {
      res = images.find(i => i.url == url);
    }

    return res;
  }
}

export default De_Product;
//module.exports = De_Product;