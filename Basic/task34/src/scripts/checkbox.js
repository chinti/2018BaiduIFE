import {sourceData} from "./ife31data.js";
import {showCheckboxTable} from './table.js';

let checkboxlist = {
	region:		[
		"华东",
		"华南",
		"华北"
	],
	product:	[
		"手机",
		"笔记本",
		"智能音箱"
	]};

function prepareCheckBox(list,index) {
	var arr = list[index];
	var id = index + '-radio-wrapper';
	var result = '<label><input type = "checkbox" name = "'+index+'" value = "全选"  checkbox-type = "all">全选</label>';
	for (let i in arr) {
		result += '<label><input type = "checkbox" name = "'+index+'" value = "'+arr[i]+'">'+arr[i]+'</label>';
	}
	var wrapper = document.querySelector('#app #'+id);
	wrapper.innerHTML = result;
	wrapper.onchange = function(e) {
		if(e.target&&e.target.type == "checkbox") {
			var checkbox = wrapper.querySelectorAll("input[type = 'checkbox']");
			if(e.target.value == "全选") {
				if(e.target.checked == true) {
					for(let i = 1 ; i < checkbox.length ; i++  ) {
						checkbox[i].checked = checkbox[0].checked;
					}
				} else if (e.target.checked == false) {
					e.target.checked = true;
				}
			} else {
				if(check(checkbox)== 3) {
					checkbox[0].checked = true;
				} else if(check(checkbox) == 0){
					e.target.checked = true;
				} else {
					checkbox[0].checked = false;
				}
			}
		}
		showCheckboxTable(getDataList());		
	}
	wrapper.childNodes[0].click();
	
}

function check(obj) {
	var j = 0;
	for(let i = 1 ; i < obj.length ; i++  ) {
		if(obj[i].checked == true) {
			j++;
		}
	}
	return j;
}

function getCheckValue(id) {
	var wrapper = document.querySelector("#app #"+id+"-radio-wrapper");
	var checkbox = wrapper.querySelectorAll('input:checked');
	var result = '';
	for(let i = 0 ; i< checkbox.length ; i++) {
		if(checkbox[i].value != "全选") {
			result  += checkbox[i].value + ',';
		}
	}
	return result;
}

function getDataList() {
	var list = new Array();
	var x = getCheckValue('region');
	var y = getCheckValue('product');
	for(let i in sourceData) {
			if(x.indexOf(sourceData[i]['region'])!=-1&&y.indexOf(sourceData[i]['product'])!= -1) {
				list.push(sourceData[i]);
			}
	}
	return list;
}



export {prepareCheckBox,checkboxlist,getDataList}

