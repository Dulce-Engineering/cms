import De_Text from './De_Text.js';
import De_Html from './De_Html.js';
import De_Project from './De_Project.js';
import De_Product_Gallery from "./De_Product_Gallery.js";
import De_Cart from "./De_Cart.js";
import De_Payment from "./De_Payment.js";
import Fb_Config from "./config.js";

firebase.initializeApp(Fb_Config, "de-cms");

customElements.define('de-text', De_Text);
customElements.define('de-html', De_Html);
customElements.define(De_Project.tname, De_Project);
customElements.define(De_Product_Gallery.tname, De_Product_Gallery);
customElements.define(De_Cart.tname, De_Cart);
customElements.define(De_Payment.tname, De_Payment);
