import '/__/firebase/9.4.0/firebase-app-compat.js';
import '/__/firebase/9.4.0/firebase-functions-compat.js';
import '/__/firebase/9.4.0/firebase-analytics-compat.js';
import '/__/firebase/9.4.0/firebase-auth-compat.js';
import '/__/firebase/9.4.0/firebase-firestore-compat.js';
import '/__/firebase/9.4.0/firebase-storage-compat.js';
//import '/__/firebase/init.js?useEmulator=true';
import '/__/firebase/init.js';
import Db from "./De_Db_Firestore.js";
//import Client_Cache_Local from "../node_modules/cache-buddy/Client_Cache_Local.js";

class Context
{
  constructor(Header_Signed_In, Header_Signed_Out)
  {
    this.fb_app = firebase.app();
    this.fb_anl = firebase.analytics();
    this.fb_fns = firebase.functions();
    this.fb_auth = firebase.auth();
    this.fb_db = firebase.firestore();
    this.fb_strg = firebase.storage();
    this.db = new Db(this.fb_db);
    //this.cache = new Client_Cache_Local();

    this.Init(Header_Signed_In, Header_Signed_Out)
  }

  Init(Header_Signed_In, Header_Signed_Out)
  {
    Context.Set_Id_Shortcuts(document, window);

    const m =
    {
      title: "deCMS",
      class_name: "menu",
      options: 
      [
        {title: "Projects", on_click_fn: () => window.open("projects.html", "_self")}, 
        {title: "CMS Components", on_click_fn: () => window.open("components.html", "_self")}, 
        {title: "Products", on_click_fn: () => window.open("products.html", "_self")}, 
      ]
    };
    header_elem.Init(this, Header_Signed_In, Header_Signed_Out, null, m);
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

  static Toast_Show(msg, style_class)
  {
    const div = document.createElement("div");
    div.style.position = "fixed";
    div.style.left = "20%";
    div.style.top = "10px";
    div.style.textAlign = "center";
    div.style.padding = "10px";
    div.style.backgroundColor = "#f004";
    div.style.right = "20%";
    div.innerText = msg;
    div.classList.add(style_class);
    document.body.append(div);
    setTimeout(() => Context.Hide_Toast(div), 5000);
  }

  static Hide_Toast(toast_elem)
  {
    toast_elem.remove();
  }
}

export default Context;