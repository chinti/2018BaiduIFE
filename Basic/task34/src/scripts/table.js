import {sourceData} from "./ife31data.js";
import {drawALine,prepareCanvas,drawManyLine} from './line.js'
import {addLoadEvent} from "./global.js";
import {drawBar} from './bar.js'
import {getDataList} from "./checkbox.js";

function showCheckboxTable(arr){
	var checkbox1 = document.querySelectorAll('#app #region-radio-wrapper input:checked');
	var checkbox2 = document.querySelectorAll('#app #product-radio-wrapper input:checked');
	var table = document.querySelector('#app #table-wrapper2');
	var thead = "<thead><tr>";
	
	var tbody = "<tbody>";
	if(checkbox1.length == 1 && checkbox2.length == 1) {
		thead += '<th>商品</th><th>地区</th>';
		tbody += '<tr mycheck = "'+arr[0]['product']+','+arr[0]['region']+'"><td>'+arr[0]['product']+'</td><td>'+arr[0]['region']+'</td>';
		for(var i in arr[0]['sale']) {
				tbody   += "<td>"+arr[0]['sale'][i]+"</td>";
		}
		tbody += "</tr>";
	} else if (checkbox1.length > 1 && checkbox2.length == 1) {
		thead += '<th>商品</th><th>地区</th>';
		for(let i in arr) {
			tbody += '<tr mycheck = "'+arr[i]['product']+','+arr[i]['region']+'">';
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
			tbody += '<tr mycheck = "'+arr[i]['product']+','+arr[i]['region']+'">';
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
					for(let k in arr) {
						if(arr[k]['product']==checkbox2[i].value&&arr[k]['region']==checkbox1[j].value) {
							tbody += '<tr mycheck = "'+arr[k]['product']+','+arr[k]['region']+'">';
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
	prepareTableOver();
	drawManyLine(getDataList());
}
function prepareTableOver() {
	var table = document.querySelector('#app #table-wrapper2 table tbody');
	table.onmouseover = function(e) {
		if(e.target&&e.target.nodeName.toLowerCase()=='td'){
			var trow = e.target.parentNode.attributes['mycheck'].nodeValue;
			trow = trow.split(',');
		drawALine(getMouseOverTableData(trow));
		drawBar(getMouseOverTableData(trow));
		}
	}
	table.onmouseout = function(e) {
		drawManyLine(getDataList());
	}
}

function getMouseOverTableData(data) {
	var dat = new Array();
	for(let i in sourceData) {
		if(sourceData[i]['region'] == data[1] && sourceData[i]['product'] == data[0]) {
			dat.push(sourceData[i]);
		}
	}
	//console.log(data);
	return dat;
}
export {showCheckboxTable,prepareTableOver}