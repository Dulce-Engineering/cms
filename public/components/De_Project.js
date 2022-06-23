import Db from "../lib/De_Db_Firestore_Cache.js";
import Project from "../lib/De_Project.js";

class De_Project extends HTMLElement 
{
  static tname = "de-project";

  constructor() 
  {
    super();

    this.db = new Db();
    this.cms_project = null;
    this.connected_event = new Event("connected");
  }

  //static observedAttributes = ["key"];
  attributeChangedCallback(attr_name, old_value, new_value)
  {
  }

  async connectedCallback()
  {
    this.dispatchEvent(this.connected_event);
  }

  async Get_Project_Id()
  {
    const key = "De_Project.Get_Project_Id()";
    return this.db.cache.use(key, () => this.Get_Project_Id_No_Cache());
  }

  async Get_Project_Id_No_Cache()
  {
    if (!this.cms_project)
    {
      const key = this.getAttribute("key");
      if (key)
      {
        const firestore_app = firebase.app("de-cms");
        const firestore_auth = firebase.auth(firestore_app);
        await firestore_auth.signInAnonymously();
  
        this.cms_project = await Project.Select_By_Key(this.db, key);
      }
    }

    return this.cms_project.id;
  }
}

export default De_Project;