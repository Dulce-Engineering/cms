import De_Comp from './De_Comp.js';
import De_Html from './De_Html.js';
import De_Project from './De_Project.js';
import De_Text from './De_Text.js';
//import Fb_Config from "./config.js";
import Client_Cache_Local from '../node_modules/cache-buddy/Client_Cache_Local.js';
import api from "http://localhost:5001/decms-6dc54/us-central1/api/rpc-client";

api.De_Project.server_host = "http://localhost:5001/decms-6dc54/us-central1/api";
api.De_Component.server_host = "http://localhost:5001/decms-6dc54/us-central1/api";

window.api = api;
window.cache = new Client_Cache_Local();

customElements.define('de-comp', De_Comp);
customElements.define('de-text', De_Text);
customElements.define('de-html', De_Html);
customElements.define(De_Project.tname, De_Project);
