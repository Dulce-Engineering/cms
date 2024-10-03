import '/__/firebase/9.4.0/firebase-app-compat.js';
import '/__/firebase/9.4.0/firebase-functions-compat.js';
import '/__/firebase/9.4.0/firebase-analytics-compat.js';
import '/__/firebase/9.4.0/firebase-auth-compat.js';
import '/__/firebase/9.4.0/firebase-firestore-compat.js';
import '/__/firebase/9.4.0/firebase-storage-compat.js';
import '/__/firebase/init.js?useEmulator=true';
//import '/__/firebase/init.js';
import Db from "./De_Db_Firestore.js";
//import Client_Cache_Local from "../node_modules/cache-buddy/Client_Cache_Local.js";
import Utils from "./Utils.js";
import config from "./config.js";

class Context
{
  constructor()
  {
    this.fb_app = firebase.app();
    this.fb_anl = firebase.analytics();
    this.fb_fns = firebase.functions();
    this.fb_auth = firebase.auth();
    this.fb_db = firebase.firestore();
    this.fb_strg = firebase.storage();
    this.db = new Db(this.fb_db);
    //this.cache = new Client_Cache_Local();
  }

  async Init(Header_Signed_In, Header_Signed_Out, id_dest)
  {
    await Utils.Import_API(config.get());

    id_dest = id_dest || window;
    Context.Set_Id_Shortcuts(document, id_dest);

    id_dest.header_elem.Init(this, Header_Signed_In, Header_Signed_Out);
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

  Toast_Show(msg, style_class)
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