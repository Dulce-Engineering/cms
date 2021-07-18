import De_Db_Firestore from "../lib/De_Db_Firestore.js";

class Project
{
  static async Select_By_Key(db, key)
  {
    const fn = db.fns.httpsCallable('De_Project_Select_By_Key');
    const result = await fn({key});
    return result.data;
  }
}

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

  async connectedCallback()
  {
    if (this.key)
    {
      this.project = await Project.Select_By_Key(this.db, this.key);
      if (this.project)
      {
        this.dispatchEvent(this.connected_event);
      }
    }
  }

  disconnectedCallback()
  {

  }

  adoptedCallback()
  {

  }

  attributeChangedCallback(attr_name, old_value, new_value)
  {
    if (attr_name == "key")
    {
      this.key = new_value;
    }
  }

  static get observedAttributes()
  {
    return ["key"];
  }
}

export default De_Project;