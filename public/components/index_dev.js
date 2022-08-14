import Client_Cache_Local from '/node_modules/cache-buddy/Client_Cache_Local.js';
import De_Comp from './De_Comp.js';
import De_Html from './De_Html.js';
import De_Project from './De_Project.js';
import De_Text from './De_Text.js';
import config from "./config.js";

const api = await import(config.get().api_client_url);
api.default.De_Project.server_host = config.get().api_server_host;
api.default.De_Component.server_host = config.get().api_server_host;
window.api = api.default;

window.cache = new Client_Cache_Local();
window.cache.expiryMillis = 86400000; // a day
window.cache.forceRefresh = true;

customElements.define('de-comp', De_Comp);
customElements.define('de-text', De_Text);
customElements.define('de-html', De_Html);
customElements.define(De_Project.tname, De_Project);
