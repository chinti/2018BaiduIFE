import {sourceData} from "./ife31data.js";
import {drawALine,prepareCanvas,drawManyLine} from './line.js'
import {addLoadEvent} from "./global.js";
import {drawBar,drawManyBar} from './bar.js'
import {getDataList,checkboxlist} from "./checkbox.js";



function showCheckboxTable(arr){
	var checkbox1 = document.querySelectorAll('#app #region-radio-wrapper input:checked');
	var checkbox2 = document.querySelectorAll('#app #product-radio-wrapper input:checked');
	var table = document.querySelector('#app #table-wrapper2');
	var thead = "<thead><tr>";
	
	var tbody = "<tbody>";
	if(checkbox1.length == 1 && checkbox2.length == 1) {
		thead += '<th>商品</th><th>地区</th>';
		tbody += '<tr mycheck = "'+arr[0]['product']+','+arr[0]['region']+'"><td rowspan = "1">'+arr[0]['product']+'</td><td>'+arr[0]['region']+'</td>';
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
	drawManyBar(getDataList());
}
function prepareTableOver() {
	let editNowFlag = false;
	var table = document.querySelector('#app #table-wrapper2 table tbody');
	var body = document.querySelector('body');
	body.onclick = function(e) {
		
		var td_input  = table.querySelector('input[value="取消"]');
		if(td_input!=null&&e.target&&e.target.nodeName.toLowerCase()!='input') {
			td_input.click();
		}	
	}
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
		drawManyBar(getDataList());
	}
	table.onclick = function(e) {
		
		if(e.target&&e.target.nodeName.toLowerCase()=='td'){
			if(!isNaN(e.target.innerHTML)&&(editNowFlag == false)) {
				var text = e.target.innerText;
				var td = e.target;
				td.innerHTML = "<input type = 'text' placeholder="+text+"></input><input type = 'button' value = '确认'></input><input type = 'button' value = '取消'></input>"
				td.setAttribute('id','edit');
				editNowFlag = true;
				var text = td.querySelector('input[type="text"]');
				text.focus();
				e.stopPropagation();
			}
		}
		if(e.target&&e.target.nodeName.toLowerCase()=='input') {
			var td = e.target.parentNode;
			var text = td.querySelector('input[type="text"]');
			switch(e.target.value) {
				case '确认':
					if(text.value == text.placeholder || text.value == '') {
						td.innerText = text.placeholder;
					} else if(text.value != text.placeholder && text.value != '' && !isNaN(text.value)){
						td.innerText = text.value;
					} else {
						alert('不能含有非数字');
						break;
					}
					editNowFlag = false;
					td.setAttribute('id','');
					break;
				case '取消':
					td.innerText = text.placeholder;
					editNowFlag = false;
					td.setAttribute('id','');
					break;
			}
		} 
	}
	table.onkeydown = function(e) {
		switch(e.keyCode) {
			case 27:
				var input = table.querySelector('input[value="取消"]');
				input.click();
				break;
			case 13:
				var input = table.querySelector('input[value="确认"]');
				input.click();
				break;
		}
	}
	prepareStorageButton();
}

function getMouseOverTableData(data) {
	var dat = new Array();
	var fdata = JSON.parse(localStorage.getItem('BasicSourceData'));
	var x = data[1],y = data[0];
	for(let i in sourceData) {
		if(fdata != null) {
			if(x.indexOf(fdata[i]['region'])!=-1&&y.indexOf(fdata[i]['product'])!= -1&&fdata[i]['sale'][0]!= null) {
				//console.log('test');
				dat.push(fdata[i]);
			}else if(x.indexOf(sourceData[i]['region'])!=-1&&y.indexOf(sourceData[i]['product'])!= -1&&fdata[i]['sale'][0]== null) {
				dat.push(sourceData[i]);
			}
		} else {
			if(x.indexOf(sourceData[i]['region'])!=-1&&y.indexOf(sourceData[i]['product'])!= -1) {
				dat.push(sourceData[i]);
			}
		}
	}
	//console.log(dat);
	return dat;
}
function prepareStorageButton() {
	var button = document.querySelector('#app #save_button');
	button.onclick = function(e) {
		document.querySelector('body').click();
		var tr = document.querySelectorAll('#app #table-wrapper2 tbody tr');
		var fdata = JSON.parse(localStorage.getItem('BasicSourceData'));		//获取local的数组
		//console.log(fdata);
		if(fdata == null || fdata[0]['product'] != '手机') {					//说明没有数组
			var fdata = new Array();							//搞个没有数据的
			let k = 0;
			for(let i in checkboxlist['product']) {
				for(let j in checkboxlist['region']) {
					fdata[k] = new Object();
					fdata[k]['product'] = checkboxlist['product'][i];
					fdata[k]['region'] = checkboxlist['region'][j];
					fdata[k]['sale'] = new Array();
					k++;
					
				}
			}
		}
		for(let i = 0 ; i< tr.length ;i ++) {							//把当前列表的塞进去
			var check = tr[i].getAttribute('mycheck').split(',');
			var td = tr[i].querySelectorAll('td');
			for(let j = 0 ; j < fdata.length ; j++) {
				if(fdata[j]['product'] == check[0] && fdata[j]['region'] == check[1]) {
					fdata[j]['sale']=new Array();
					for(let k in td) {
						if(isNaN(td[k].innerText)) {
							continue;
						} else {
							fdata[j]['sale'].push(Number(td[k].innerText));
						}
					}
				}
			}				
		}
		localStorage.setItem('BasicSourceData',JSON.stringify(fdata));
		showCheckboxTable(getDataList())
		
		//console.log(tr);
		//localStorage.removeItem('BasicSourceData')
		//console.log(fdata);
		//console.log(sourceData)
	}
}

export {showCheckboxTable,prepareTableOver}