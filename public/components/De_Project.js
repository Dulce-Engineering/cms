import Utils from "../lib/Utils.js";

class De_Project_Component extends HTMLElement 
{
  static tname = "de-project";

  constructor() 
  {
    super();

    this.db = null;
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

  async Get_Project()
  {
    const key = this.getAttribute("key");
    const cache_key = "De_Project_Component.Get_Project("+key+")";
    return cache.use(cache_key, () => api.De_Project.Select_By_Key(key));
  }

  async Get_Project_Id()
  {
    const project = await this.Get_Project();
    return project.id;
  }

  static async Get_Firebase()
  {
    const fb_app = await import('/__/firebase/9.4.0/firebase-app.js');
    const fb_auth = await import('/__/firebase/9.4.0/firebase-auth.js');
    const fb_firestore =  await import('/__/firebase/9.4.0/firebase-firestore.js');
    const config = await import("../components/config.js");

    const app = fb_app.initializeApp(config, "de-cms");

    //const auth = fb_auth.getAuth(app);
    const auth = fb_auth.initializeAuth(app, {persistence: fb_auth.browserSessionPersistence,
      popupRedirectResolver: undefined});
    await fb_auth.signInAnonymously(auth);

    const db = fb_firestore.getFirestore(app);

    return {db};
  }
}

export default De_Project_Component;