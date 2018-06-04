import {getAllTableList} from './table.js'
let color = ['#60ACFC','#32D3EB','#5BC49F'];
function prepareSVG() {
	var bar_wrapper = document.querySelector('#app #bar-wrapper');
	bar_wrapper.style.height = "400px";
	//bar_wrapper.style.position = "relative";
	var svg = '<svg width="100%" height="400px" version="1.1" xmlns="http://www.w3.org/2000/svg">';
	svg+= '</svg><div>';
	for(let i = 0 ; i<12 ; i++) {
		svg+='<div class = "bar-cover"></div>';
	}
	svg+= '</div><div id = "bar-list"></div>'
	bar_wrapper.innerHTML = svg;
}



function drawBar(data) {
	var svg = document.querySelector('#app #bar-wrapper svg');
	var bar_width = 60/12/data.length,bar_color = '#1C86EE';
	var max = 0,t = 1;
	var prod = new Array();			//存放数据中产品有哪些
	for (let j = 0 ;j<data.length ;j++) {
		for(let i in data[j]['sale']) {
			if(max < data[j]['sale'][i]) {
				max = data[j]['sale'][i];
			}
		}
		if(prod.indexOf(data[j]['product'])==-1) {
			prod.push(data[j]['product']);
		}
	}
	t = 90/max;
	var axis = createAxis(max,t);
	var rect = '';
	for (let j = 0 ; j < data.length ; j++) {
		for(let i in data[j]['sale']) {
			for(let x in prod) {if(data[j]['product']==prod[x]){bar_color = color[x];}}
			rect += "<rect width = '"+bar_width+'%'+"' height = "+ (data[j]['sale'][i]*t)+'%'+" fill = "+bar_color+" x ="+(7.5*i+bar_width*j+6)+'%'
			+" y="+(95-data[j]['sale'][i]*t)+'%'+"></rect>";
		}
	}
	var product = drawProductColor(prod);
	svg.innerHTML = axis+rect+product;
}

function createAxis(max,t) {
	var svg_in = "<line x1 = '5%' y1 = '5%' x2 = '5%' y2 = '95%' style = 'stroke: black; stroke-width:1'/>";
	svg_in += "<line x1 = '4%' y1 = '95%' x2 = '95%' y2 = '95%' style = 'stroke: black ; stroke-width:1'/>";
	var max_line = Math.floor(max/Math.pow(10,max.toString().length-1))*Math.pow(10,max.toString().length-1);
	var line_add = Math.floor(parseInt(max/3)/Math.pow(10,parseInt(max/3).toString().length-1))*Math.pow(10,parseInt(max/3).toString().length-1);
	for(let i = line_add; i*t < 90 ; i+=line_add){
		svg_in += "<line x1 = '5%' y1 = '"+(95-i*t)+'%'+"' x2 = '95%' y2 = '"+(95-i*t)+'%'+"' style = 'stroke: #AAA ; stroke-width:1'/>";
		svg_in += "<text x='1%' y='"+(95-i*t)+'%'+"' fill='#AAA'>"+i+"</text>"
	}
	for(let i = 0 ; i < 12 ; i++) {
		svg_in+= "<text x = '"+((90/12)*i+7)+'%'+"' y='99%'>"+(i+1)+'月'+"</text>"
	}
	return svg_in;
}
function drawProductColor(prod) {
	var result = '';
	for(let x in prod) {
		result +=	"<text x='"+(10+10*x)+'%'+"' y='4%' fill='"+color[x]+"'>"+prod[x]+"</text>"
	}
	return result;
}

function prepareSVGEvent(data) {			//显示遮罩层和详细信息
	var svg = document.querySelector('#app #bar-wrapper');
	var cover = document.querySelectorAll('#app #bar-wrapper .bar-cover');
	var list = document.querySelector('#app #bar-wrapper #bar-list');
	for(let i = 0;i<cover.length;i++) {		//本来想监听mouseover的，但是实在解决不了鼠标移速过快造成的不响应
		cover[i].style.left =	5+i*7.5+'%';
	}
	svg.onmousemove = function(e) {
		var data = getAllTableList();
		var x = e.pageX;
		var y = e.pageY;
		var show_y = y-svg.offsetTop;
		var show_x = x-svg.offsetLeft;
		var wid = svg.offsetWidth;
		var index = Math.floor(((show_x)-wid*0.05)/(wid*0.9/12));
		var result = '';
		if(index>=0&&index<12) {
			for(let i = 0 ; i < data.length ;i++) {
				result += '<p>'+data[i]['product']+','+data[i]['region']+':'+data[i]['sale'][index]+'</p>'
			}
		}
		list.innerHTML = result;
		if(show_x / wid < 0.5) {
			list.style.left = (show_x+20)+'px';
		} else {
			list.style.left = (show_x-20-150)+'px';
		}
		
		list.style.top = (show_y-data.length*40)+'px';
	}
	svg.onmouseleave = function(e) {
		list.innerHTML = '';
	}
}

export {drawBar,prepareSVG,prepareSVGEvent}