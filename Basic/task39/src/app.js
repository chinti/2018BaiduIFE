import './styles/index.css';
import "./scripts/ife31data.js";
import {addLoadEvent} from "./scripts/global.js";		//用于追加启动函数
import {prepareCheckBox,checkboxlist,clickCheckBox} from "./scripts/checkbox.js";
import {prepareSVG,prepareSVGEvent} from './scripts/bar.js'
import {prepareCanvas}from'./scripts/line.js'
import {prepareTableAllEvent} from './scripts/table.js'
import {prepareStorageButton} from './scripts/storage.js'

//准备图表的位置
addLoadEvent(prepareCanvas());
addLoadEvent(prepareSVG());

//准备checkboxlist
addLoadEvent(prepareCheckBox(checkboxlist,'region'));
addLoadEvent(prepareCheckBox(checkboxlist,'product'));
addLoadEvent(clickCheckBox());
//准备表格事件
addLoadEvent(prepareTableAllEvent());
addLoadEvent(prepareStorageButton());

addLoadEvent(prepareSVGEvent());

