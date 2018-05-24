import {addLoadEvent} from "./global.js"
import {sourceData} from "./ife31data.js";

var regionSelect = document.querySelectorAll("#app select");
for(let i = 0 ; i<regionSelect.length ; i++) {
	regionSelect[i].onchange = function() {
		showTable(getSelectValue());
	}
}

function getSelectValue() {
	var select = document.querySelectorAll("#app select");
	var result = new Array();
	var index = select[0].selectedIndex;
	result[0] = select[0].querySelectorAll('option')[index].innerText;
	index = select[1].selectedIndex;
	result[1] = select[1].querySelectorAll('option')[index].innerText;
	return result;
}

function showTable(data) {
	var table = document.querySelector('#app #table-wrapper');
	var thead = "<thead><tr><th>商品</th><th>地区</th>";
	for (let i = 0 ; i<12 ;i++) {
		thead += "<th>"+(i+1)+"月</th>";
	}
	thead += "</tr></thead>";
	var tbody = "<tbody>";
	for(var index in sourceData) {
		if(sourceData[index]['region'] == data[0]&&sourceData[index]['product'] == data[1] ) {
			tbody += "<tr>"+"<td>"+sourceData[index]['product']+"</td>"+"<td>"+sourceData[index]['region']+"</td>";
			for(var j in sourceData[index]['sale']) {
				tbody   += "<td>"+sourceData[index]['sale'][j]+"</td>";
			}
			tbody += "</tr>";
		}
	}
	tbody += "</tbody>";
	table.innerHTML = "<table>"+thead+tbody+"</table>";
}


export {showTable,getSelectValue }