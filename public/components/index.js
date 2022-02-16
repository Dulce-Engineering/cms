import De_Comp from './De_Comp.js';
import De_Html from './De_Html.js';
import De_Project from './De_Project.js';
import De_Text from './De_Text.js';
import Fb_Config from "./config.js";

firebase.initializeApp(Fb_Config, "de-cms");

customElements.define('de-comp', De_Comp);
customElements.define('de-text', De_Text);
customElements.define('de-html', De_Html);
customElements.define('de-project', De_Project);
