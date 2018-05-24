import './styles/index.css';
import {sourceData} from "./scripts/ife31data.js";
import {addLoadEvent} from "./scripts/global.js";
import {showTable,getSelectValue } from "./scripts/select.js";
import {prepareCheckBox,checkboxlist} from "./scripts/checkbox.js";


//console.log(sourceData[1]);

addLoadEvent(showTable(getSelectValue()));
addLoadEvent(prepareCheckBox(checkboxlist,'region'));
addLoadEvent(prepareCheckBox(checkboxlist,'product'));
