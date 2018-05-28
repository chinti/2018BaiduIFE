import './styles/index.css';
import {sourceData} from "./scripts/ife31data.js";
import {addLoadEvent} from "./scripts/global.js";
import {prepareCheckBox,checkboxlist} from "./scripts/checkbox.js";
import {drawBar,getHDSJData} from './scripts/bar.js'
import './scripts/line.js'
import {prepareTableOver} from './scripts/table.js'


//console.log(sourceData[1]);


addLoadEvent(prepareCheckBox(checkboxlist,'region'));
addLoadEvent(prepareCheckBox(checkboxlist,'product'));
addLoadEvent(drawBar(getHDSJData()));
addLoadEvent(prepareTableOver());
