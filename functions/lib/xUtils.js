class Utils
{
  static MILLIS_SECOND = 1000;
  static MILLIS_MINUTE = Utils.MILLIS_SECOND * 60;
  static MILLIS_HOUR = Utils.MILLIS_MINUTE * 60;
  static MILLIS_DAY = Utils.MILLIS_HOUR * 24;
  static MILLIS_WEEK = Utils.MILLIS_DAY * 7;
  static MILLIS_MONTH = Utils.MILLIS_WEEK * 4;
  static MILLIS_YEAR = Utils.MILLIS_MONTH * 12;

  static appendParam(params, paramName, paramValue)
  {
    return Utils.appendStr(params, paramName + "=" + paramValue, "&");
  }

  static Add_Param(url, param_name, param_Value)
  {
    if (param_Value)
    {
      let sep = "&";

      if (!url.includes("?"))
      {
        sep = "?";
      }
      url = Utils.appendStr(url, param_name + "=" + param_Value, sep);
    }

    return url;
  }

  static appendStr(a, b, sep)
  {
    let res = null;

    if (sep == null || sep == undefined)
    {
      sep = "";
    }
    if (a && b && a.length > 0 && b.length > 0)
    {
      res = a + sep + b;
    } else if (a && !b && a.length > 0)
    {
      res = a;
    } else if (!a && b && b.length > 0)
    {
      res = b;
    }

    return res;
  }

  static toArray(str)
  {
    let res = null;

    if (str)
    {
      const strObj = JSON.parse(str);
      if (strObj && Array.isArray(strObj) && strObj.length > 0)
      {
        res = strObj;
      }
    }

    return res;
  }

  static toValueArray(str)
  {
    let res = null;
    const strArray = Utils.toArray(str);

    if (strArray)
    {
      res = strArray.map(item => item.value);
    }

    return res;
  }

  static toJSONArray(obj)
  {
    let res;

    if (obj)
    {
      res = JSON.stringify(obj);
    }

    return res;
  }
  
  static fetchPostJson(url, xApiKey, bodyObj, auth)
  {
    let body;

    if (bodyObj)
    {
      body = JSON.stringify(bodyObj);
    }

    return Utils.fetchJson(url, "POST", xApiKey, body, auth);
  }
  
  static fetchGetJson(url, xApiKey)
  {
    return Utils.fetchJson(url, "GET", xApiKey);
  }
  
  static async fetchJson(url, method, xApiKey, body, auth)
  {
    let res = null;
    const options =
    {
      method,
      headers: 
      {
        'Content-Type': 'application/json',
        'x-api-key': xApiKey
      }
    };

    if (body)
    {
      options.body = body;
    }
    if (auth)
    {
      options.headers.Authorization = auth;
    }
    
    const httpRes = await fetch(url, options);
    if (httpRes)
    {
      const textRes = await httpRes.text();
      res = JSON.parse(textRes);
    }

    return res;
  }
  
  static async fetch(url, method, xApiKey, body)
  {
    let res = null;
    const options =
    {
      method,
      headers: 
      {
        'Content-Type': 'application/json',
        'x-api-key': xApiKey
      }
    };

    if (body)
    {
      options.body = body;
    }
    
    const httpRes = await fetch(url, options);
    if (httpRes)
    {
      res = await httpRes.text();
    }

    return res;
  }

  static toDateStr(date)
  {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateStr = year + "-" + Utils.to2DigitStr(month) + "-" + Utils.to2DigitStr(day);

    return dateStr;
  }

  static to2DigitStr(number)
  {
    let res;

    if (number < 10)
    {
      res = "0" + number;
    }
    else
    {
      res = "" + number;
    }

    return res;
  }

  static addDays(date, days)
  {
    const res = new Date(date);
    res.setDate(res.getDate() + days);

    return res;
  }

  static nullIfEmpty(items)
  {
    let res = items;

    if (Utils.isEmpty(items))
    {
      res = null;
    }

    return res;
  }

  static isEmpty(items)
  {
    let res = false;
    const typeOfItems = typeof items;

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
    else if (typeOfItems == "string")
    {
      const str = items.trim();
      if (str.length == 0 || str == "")
      {
        res = true;
      }
    }
    else if (typeOfItems == "object")
    {
      res = Utils.isEmptyObj(items);
    }
    else if (items.length == 0)
    {
      res = true;
    }

    return res;
  }

  static toBoolean(valStr)
  {
    let res = false;

    if (valStr)
    {
      valStr = valStr.toLowerCase();
      if (valStr == "true" || valStr == "yes" || valStr == "t")
      {
        res = true;
      }
    }

    return res;
  }

  static toDocument(html) 
  {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content;
  }

  static toElement(html) 
  {
    return Utils.toDocument(html).firstChild;
  }

  static toElements(html) 
  {
    return Utils.toDocument(html).childNodes;
  }

  static getFromLocalStorgeInt(key, defaultValue)
  {
    return parseInt(Utils.getFromLocalStorge(key, defaultValue));
  }

  static getFromLocalStorgeJson(key, defaultValue)
  {
    return JSON.parse(Utils.getFromLocalStorge(key, defaultValue));
  }

  static getFromLocalStorge(key, defaultValue)
  {
    let res = defaultValue;

    const storageStr = localStorage.getItem(key);
    if (!Utils.isEmpty(storageStr))
    {
      res = storageStr;
    }

    return res;
  }

  static toEmptyStr(value)
  {
    let res = value;
    
    if (value == null || value == undefined)
    {
      res = "";
    }

    return res;
  }
  
  static Show(id, parent_elem)
  {
    if (!parent_elem)
    {
      parent_elem = document;
    }

    const elem = parent_elem.querySelector("#" + id);
    if (elem)
    {
      elem.style.removeProperty("display");
      const def_display = getComputedStyle(elem).getPropertyValue("--def-display");
      if (def_display)
      {
        elem.style.display = def_display;
      }
    }
  }

  static Hide(id, parent_elem)
  {
    if (!parent_elem)
    {
      parent_elem = document;
    }

    const elem = parent_elem.querySelector("#" + id);
    if (elem)
    {
      elem.style.display = "none";
    }
  }

  static Disable(id)
  {
    const elem = document.getElementById(id);
    if (elem)
    {
      elem.disabled = true;
    }
  }

  static Get_Param(param_name)
  {
    const urlParams = new URLSearchParams(window.location.search);
    const res = urlParams.get(param_name);
    return res;
  }

  static To_Class_Obj(obj, class_obj)
  {
    if (obj)
    {
      for (const key in obj)
      {
        class_obj[key] = obj[key];
      }
    }
  }

  static To_Obj(class_obj)
  {
    const obj = {};

    for (const key in class_obj)
    {
      obj[key] = class_obj[key];
    }

    return obj;
  }

  static Handle_Errors(db)
  {
    if (db.last_error)
    {
      if (db.last_error.code == "permission-denied")
      {
        alert("You do not have permission.");
      }
      else
      {
        alert("There was a problem.");
      }
    }
    else
    {
      alert("There was a problem.");
    }
  }
  
  static hasValue(data)
  {
    let res = true;
    
    if (data == undefined || data == null)
    {
      res = false;
    }

    return res;
  }

  static Abbreviate(str)
  {
    const MAX_LENGTH = 200;
    let res;

    if (!Utils.isEmpty(str))
    {
      if (str.length > MAX_LENGTH)
      {
        res = str.substring(0, MAX_LENGTH) + "...";
      }
      else
      {
        res = str;
      }
    }

    return res;
  }

  static Set_Id_Shortcuts(src_elem, dest_elem)
  {
    const elems = src_elem.querySelectorAll("[id]");
    for (const elem of elems)
    {
      const id = elem.id;
      dest_elem[id] = elem;
    }
  }

  static To_AUD(num)
  {
    const fixed = Number.parseFloat(num).toFixed(2);
    return "$" + fixed;
  }

  static Add_Stylesheet(elem, attrib_name = "style-src")
  {
    if (elem.hasAttribute(attrib_name))
    {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = elem.getAttribute(attrib_name);
      elem.shadowRoot.append(link);
    }
  }

  static Bind(obj, fn_prefix)
  {
    const members = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
    for (const member of members)
    {
      if (typeof obj[member] == "function" && member.startsWith(fn_prefix))
      {
        obj[member] = obj[member].bind(obj);
      }
    }
  }

  static Get_Attr_Def(elem, name, def)
  {
    const attr_val = elem.getAttribute(name);
    return Utils.hasValue(attr_val) ? attr_val : def;
  }

  static async Calc_Values(objs, obj_field, calc_fn)
  {
    if (objs && objs.length >0)
    {
      for (const obj of objs)
      {
        obj[obj_field] = await calc_fn(obj);
      }
    }
  }
}

export default Utils;
