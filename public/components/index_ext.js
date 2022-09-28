import Utils from "../lib/Utils.js";
import Client_Cache_Local from '/node_modules/cache-buddy/Client_Cache_Local.js';
//import De_Comp from './De_Comp.js';
import De_Html from './De_Html.js';
import De_Project from './De_Project.js';
import De_Text from './De_Text.js';
import De_Link from './De_Link.js';
import config from "./config.js";

const config_env = config.get();
console.log("index.config_env =", config_env);
const api = await import(config_env.api_client_url);
api.default.De_Project.server_host = config_env.api_server_host;
api.default.De_Component.server_host = config_env.api_server_host;
api.default.De_Component_Link.server_host = config_env.api_server_host;
window.api = api.default;

window.cache = new Client_Cache_Local();
window.cache.expiryMillis = Utils.MILLIS_WEEK;

//customElements.define('de-comp', De_Comp);
customElements.define(De_Text.tname, De_Text);
customElements.define(De_Html.tname, De_Html);
customElements.define(De_Link.tname, De_Link);
customElements.define(De_Project.tname, De_Project);
