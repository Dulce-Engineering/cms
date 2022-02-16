//import De_Comp from './De_Comp.js';
import De_Text from './De_Text.js';
import De_Html from './De_Html.js';
import De_Project from './De_Project.js';
import De_Product_Gallery from "./De_Product_Gallery.js";
//import De_Table_Project from './De_Table_Project.js';
//import De_Table_Component from './De_Table_Component.js';
//import De_Header from './De_Header.js';
//import Nx_Popup from './De_Dropdown.js';
//import De_Dialog from './De_Dialog.js';
//import De_Dialog_Cols from './De_Dialog_Cols.js';
import Fb_Config from "./config.js";

firebase.initializeApp(Fb_Config, "de-cms");

//customElements.define('de-comp', De_Comp);
customElements.define('de-text', De_Text);
customElements.define('de-html', De_Html);
customElements.define(De_Project.tname, De_Project);
customElements.define(De_Product_Gallery.tname, De_Product_Gallery);
//customElements.define('de-table-project', De_Table_Project);
//customElements.define('de-table-component', De_Table_Component);
//customElements.define('de-header', De_Header);
//customElements.define('de-popup', Nx_Popup);
//customElements.define('de-dialog', De_Dialog);
//customElements.define('de-dialog-cols', De_Dialog_Cols);
