import {getDataList} from "./checkbox.js";
import {drawLine}from'./line.js'
import {drawBar} from './bar.js'

function showTable(arr) {				//显示表格，注意单元格合并，并为每一行的tr加入自定义属性
	var checkbox1 = document.querySelectorAll('#app #region-radio-wrapper input:checked');
	var checkbox2 = document.querySelectorAll('#app #product-radio-wrapper input:checked');
	var table = document.querySelector('#app #table-wrapper');
	var thead = "<thead><tr>";
	var tbody = "<tbody>";
	if(checkbox1.length == 1 && checkbox2.length > 1) {		//当地区为1时，地区为项一
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
	} else if(checkbox1.length > 0 && checkbox2.length > 0){	//其他情况
		thead += '<th>商品</th><th>地区</th>';
		for(let i = 0 ; i < checkbox2.length;i++) {
			let flag = true;
			var l = checkbox1.length;
			if(checkbox1.length == 4) {l = 3;}
			for(let j = 0 ; j < checkbox1.length; j++) {
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
	tbody += "</tbody>";
	table.innerHTML = "<table>"+thead+tbody+"</table>";
	drawLine(getAllTableList());
	drawBar(getAllTableList());
}


function prepareTableAllEvent() {		//用于准备table上的所有事件
	//所有点击到table上的事件
	var tbody = document.querySelector('#app #table-wrapper table tbody');	
	//接受冒泡到body上的未被阻止的事件（这次只有管理取消）
	var body = document.querySelector('body');	
	let editNowFlag = false;			//判断是否正在编辑中
	tbody.onmouseover = function(e) {			//鼠标移入，显示那一个表单
		if(e.target&&e.target.nodeName.toLowerCase()=='td'){
			drawLine(getMouseOverTable(e));
			drawBar(getMouseOverTable(e));
		}
	}
	tbody.onmouseout = function(e) {			//鼠标移出，显示所有展示的Table
		if(e.target&&e.target.nodeName.toLowerCase()=='td'){
			drawLine(getAllTableList());
			drawBar(getAllTableList());
		}
	}
	tbody.onclick = function(e) {				//鼠标点击单元格时，将所有事件都冒泡到tbody执行
		
		if(e.target&&e.target.nodeName.toLowerCase()=='td'){
			if(!isNaN(e.target.innerHTML)&&(editNowFlag == false)) {
				var text = e.target.innerText;
				var td = e.target;
				td.innerHTML = "<input type = 'number' placeholder="+text+"></input><input type = 'button' id = 'check'></input><input type = 'button' id = 'cancel'></input>"
				td.setAttribute('id','edit');
				editNowFlag = true;
				var text = td.querySelector('input[type="number"]');
				text.focus();
				e.stopPropagation();			//阻止冒泡到body
			}
		}
		if(e.target&&e.target.nodeName.toLowerCase()=='input') {
			var td = e.target.parentNode;
			var text = td.querySelector('input[type="number"]');
			switch(e.target.id) {
				case 'check':
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
				case 'cancel':
					td.innerText = text.placeholder;
					editNowFlag = false;
					td.setAttribute('id','');
					break;
			}
		} 
	}
	body.onclick = function(e) {					//非输入单元格点击后取消输入
		
		var td_input  = tbody.querySelector('input[id="cancel"]');
		if(td_input!=null&&e.target&&e.target.nodeName.toLowerCase()!='input') {
			td_input.click();
		}	
	}
	tbody.onkeydown = function(e) {
		switch(e.keyCode) {
			case 27:
				var input = tbody.querySelector('input[id="cancel"]');
				input.click();
				break;
			case 13:
				var input = tbody.querySelector('input[id="check"]');
				input.click();
				break;
		}
	}
}

function getAllTableList() {		//获取table全部数据
	var tbody = document.querySelector('#app #table-wrapper tbody');
	var trs = tbody.childNodes;
	var data = new Array();
	for(let i = 0 ; i<trs.length;i++ ) {
		var trow = trs[i].attributes['mycheck'].nodeValue.split(',');
		data[i] = new Array();
		data[i]['product'] = trow[0];
		data[i]['region'] = trow[1];
		data[i]['sale'] = new Array();
		for(let j = 0;j< trs[i].childNodes.length ; j++ ) {
			if(!isNaN(Number(trs[i].childNodes[j].innerText))){
				data[i]['sale'].push(Number(trs[i].childNodes[j].innerText));
			}
		}
	}
	return data;
}


function getMouseOverTable(event) {			//获取鼠标在table上的数据
	var trow = event.target.parentNode;
	var trow_mycheck = trow.attributes['mycheck'].nodeValue.split(',');
	var data = [{'product':	trow_mycheck[0],'region': trow_mycheck[1],'sale':[]}];
	for(let i = 0;i < trow.childNodes.length;i++) {
		if(!isNaN(Number(trow.childNodes[i].innerText))){
			data[0]['sale'].push(Number(trow.childNodes[i].innerText));
		}
	}
	return data;
}
//将showTable输出到checkbox.js

export {showTable,prepareTableAllEvent,getAllTableList}