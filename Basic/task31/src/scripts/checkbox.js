import {addLoadEvent} from "./global.js"
import {sourceData} from "./ife31data.js";

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
	var result = '<input type = "checkbox" name = "'+index+'" value = "全选"  checkbox-type = "all"><label>全选</label>';
	for (let i in arr) {
		result += '<input type = "checkbox" name = "'+index+'" value = "'+arr[i]+'"><label>'+arr[i]+'</label>';
	}
	var wrapper = document.querySelector('#app2 #'+id);
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
	var wrapper = document.querySelector("#app2 #"+id+"-radio-wrapper");
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

function showCheckboxTable(arr){
	//console.log(arr);
	var checkbox1 = document.querySelectorAll('#app2 #region-radio-wrapper input:checked');
	var checkbox2 = document.querySelectorAll('#app2 #product-radio-wrapper input:checked');
	var table = document.querySelector('#app2 #table-wrapper2');
	var thead = "<thead><tr>";
	
	var tbody = "<tbody>";
	if(checkbox1.length == 1 && checkbox2.length == 1) {
		thead += '<th>商品</th><th>地区</th>';
		tbody += '<tr><td>'+arr[0]['product']+'</td><td>'+arr[0]['region']+'</td>';
		for(var i in arr[0]['sale']) {
				tbody   += "<td>"+arr[0]['sale'][i]+"</td>";
		}
		tbody += "</tr>";
	} else if (checkbox1.length > 1 && checkbox2.length == 1) {
		thead += '<th>商品</th><th>地区</th>';
		for(let i in arr) {
			tbody += "<tr>";
			if(i==0) {
				tbody += "<td rowspan= '"+arr.length+"'>"+arr[i]['product']+"</td><td>"+arr[i]['region']+"</td>";
			} else {
				tbody += "<td>"+arr[i]['region']+"</td>";
			}
			for(let j in arr[i]['sale']) {
				tbody   += "<td>"+arr[i]['sale'][j]+"</td>";
			}
			tbody += "</tr>";
		}
	} else if (checkbox1.length == 1 && checkbox2.length > 1) {
		thead += '<th>地区</th><th>商品</th>';
		for(let i in arr) {
			tbody += "<tr>";
			if(i==0) {
				tbody += "<td rowspan= '"+arr.length+"'>"+arr[i]['region']+"</td><td>"+arr[i]['product']+"</td>";
			} else {
				tbody += "<td>"+arr[i]['product']+"</td>";
			}
			for(let j in arr[i]['sale']) {
				tbody   += "<td>"+arr[i]['sale'][j]+"</td>";
			}
			tbody += "</tr>";
		}
	} else if (checkbox1.length > 1 && checkbox2.length > 1) {
		thead += '<th>商品</th><th>地区</th>';
		for(let i = 0 ; i < checkbox2.length;i++) {
			let flag = true;
			var l = checkbox1.length;
			if(checkbox1.length == 4) {l = 3;}
			for(let j = 0 ; j < checkbox1.length; j++) {
				//if(checkbox1[j].value == '全选' || checkbox2[i].value == '全选') {continue;}
					tbody += "<tr>";
					for(let k in arr) {
						if(arr[k]['product']==checkbox2[i].value&&arr[k]['region']==checkbox1[j].value) {
							if(flag) {
								flag = false;
								tbody += "<td rowspan= '"+l+"'>"+arr[k]['product']+"</td><td>"+arr[k]['region']+"</td>";
							} else {
								tbody += "<td>"+arr[k]['region']+"</td>";
							}
							for(let z in arr[k]['sale']) {
								tbody   += "<td>"+arr[k]['sale'][z]+"</td>";
							}			
						}
					}
					tbody += "</tr>";
			}
		}
	}
	
	for (let i = 0 ; i<12 ;i++) {
		thead += "<th>"+(i+1)+"月</th>";
	}
	thead += '</tr></thead>';
	tbody += "</tbody>"
	table.innerHTML = "<table>"+thead+tbody+"</table>";
}

export {prepareCheckBox,checkboxlist}


