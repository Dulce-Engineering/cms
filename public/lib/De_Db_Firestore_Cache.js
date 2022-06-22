import De_Db_Firestore from "./De_Db_Firestore.js";
import Client_Cache_Local from '/node_modules/cache-buddy/Client_Cache_Local.js';

class De_Db_Firestore_Cache extends De_Db_Firestore
{
  constructor(fb_db)
  {
    super();
    this.cache = new Client_Cache_Local();
  }
}

export default De_Db_Firestore_Cache;