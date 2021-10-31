import De_Db_Firestore from "../lib/De_Db_Firestore.js";
import Project from "../lib/De_Project.js";

class De_Project extends HTMLElement 
{
  constructor() 
  {
    super();

    this.key = null;
    this.project = null;

    this.db = new De_Db_Firestore();
    this.connected_event = new Event("connected");
  }

  static observedAttributes = ["key"];
  attributeChangedCallback(attr_name, old_value, new_value)
  {
    if (attr_name == "key")
    {
      this.key = new_value;
    }
  }

  async connectedCallback()
  {
    if (this.key)
    {
      const firestore_app = firebase.app("de-cms");
      const firestore_auth = firebase.auth(firestore_app);
      await firestore_auth.signInAnonymously();

      this.project = await Project.Select_By_Key(this.db, this.key);
      if (this.project)
      {
        this.dispatchEvent(this.connected_event);
      }
    }
  }
}

export default De_Project;