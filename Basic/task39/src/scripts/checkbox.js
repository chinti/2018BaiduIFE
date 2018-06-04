import {sourceData} from"./ife31data.js";
import {showTable,prepareTableAllEvent} from"./table.js";
import {pushCheckboxtoState} from"./storage.js";

let checkboxlist = {					//定义checkbox列表
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
	
function prepareCheckBox(list,index) {					//生成某组checkbox和准备它的事件
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
		showTable(getDataList());	
		prepareTableAllEvent();
		pushCheckboxtoState(checkboxlist,getCheckValue('product'),getCheckValue('region'))
	}
}
function clickCheckBox() {				//用于在checkbox准备好之后，按照state值初始化checkbox
	var product = document.querySelector('#product-radio-wrapper');
	var region = document.querySelector('#region-radio-wrapper');
	if(history.state != null&&history.state.length==8&&history.state.indexOf('000')==-1) {
		var result = history.state.slice(1,8).split(2);
		var prod = result[0].split('');
		var regi = result[1].split('');
		for(let i = 0 ;i< prod.length ;i++) {
			if(prod[i] == 1) {
				product.childNodes[i+1].click();	
			}
		}
		for(let i = 0 ;i< regi.length ;i++) {
			if(regi[i] == 1) {
				region.childNodes[i+1].click();	
			}
		}
	}else{
		product.childNodes[0].click();	
		region.childNodes[0].click();	
	}
}


function check(obj) {						//检查有多少个checkbox被勾选
	var j = 0;
	for(let i = 1 ; i < obj.length ; i++  ) {
		if(obj[i].checked == true) {
			j++;
		}
	}
	return j;
}

function getCheckValue(id) {				//获取某列checkbox被勾选的项
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

function getDataList() {				//获取来自源数据或者本地数据（localStorage）的值
	var list = new Array();
	var x = getCheckValue('region');
	var y = getCheckValue('product');
	var fdata = JSON.parse(localStorage.getItem('BasicSourceData'));
	for(let i in sourceData) {
		if(fdata != null) {
			if(x.indexOf(fdata[i]['region'])!=-1&&y.indexOf(fdata[i]['product'])!= -1&&fdata[i]['sale'][0]!= null) {
				list.push(fdata[i]);
			}else if(x.indexOf(sourceData[i]['region'])!=-1&&y.indexOf(sourceData[i]['product'])!= -1&&fdata[i]['sale'][0]== null) {
				list.push(sourceData[i]);
			}
		} else {
			if(x.indexOf(sourceData[i]['region'])!=-1&&y.indexOf(sourceData[i]['product'])!= -1) {
				list.push(sourceData[i]);
			}
		}
			
	}
	return list;
}




//将准备checkbox项函数和列表项函数输出给app.js，将getDataList输出给Table.js用来构建table
export {prepareCheckBox,checkboxlist,getDataList,clickCheckBox} 
