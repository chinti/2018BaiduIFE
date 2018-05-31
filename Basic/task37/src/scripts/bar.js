import {sourceData} from "./ife31data.js";

let color = ['#60ACFC','#32D3EB','#5BC49F','#FEB64D','#ff7c7c','#9287e7','#68b6FF','#22C3DB','#4bb48f'];
function getHDSJData() {
	var data = new Array();
	for(let i in sourceData) {
		if(sourceData[i]['region'] == '华东' && sourceData[i]['product'] == '手机') {
			data.push(sourceData[i]);
		}
	}
	//console.log(data);
	return data;
}


function drawBar(data) {
	var bar_wrapper = document.querySelector('#app #bar-wrapper');
	bar_wrapper.style.height = "250px";
	var bar_width = 30,space_width = 10,bar_color = '#1C86EE';
	var max = 0,t = 1;
	for(let i in data[0]['sale']) {
		if(max < data[0]['sale'][i]) {
			max = data[0]['sale'][i];
		}
	}
	t = 200/max;
	var d = data[0]['sale'];
	var svg_in = '<svg width="558px" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">';
	svg_in += "<line x1 = '50' y1 = '25' x2 = '50' y2 = '225' style = 'stroke: black; stroke-width:1'/>";
	svg_in += "<line x1 = '45' y1 = '225' x2 = '100%' y2 = '225' style = 'stroke: black ; stroke-width:1'/>";
	for(let i in d) {
		svg_in += "<rect width = '25' height = "+ (d[i]*t)+" fill = "+bar_color+" x ="+((bar_width+space_width)*i+space_width+50)
		+" y="+(224-d[i]*t) +"></rect>";
		svg_in += "<line x1 = "+(73+40*i)+" y1 = '225' x2 = "+(73+40*i)+" y2 = '230' style = 'stroke:black;stroke-width:1'/>"
	}
	svg_in += '</svg>';
	bar_wrapper.innerHTML = svg_in;
}

function drawManyBar(data) {
	var bar_wrapper = document.querySelector('#app #bar-wrapper');
	bar_wrapper.style.height = "250px";
	var bar_width = 30/data.length,space_width = 10,bar_color = '#1C86EE';
	var max = 0,t = 1;
	var prod = new Array();
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
	//console.log(prod);
	t = 200/max;
	var svg_in = '<svg width="558px" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">';
	svg_in += "<line x1 = '50' y1 = '25' x2 = '50' y2 = '225' style = 'stroke: black; stroke-width:1'/>";
	svg_in += "<line x1 = '45' y1 = '225' x2 = '100%' y2 = '225' style = 'stroke: black ; stroke-width:1'/>";
	for (let j = 0 ; j < data.length ; j++) {
		for(let i in data[j]['sale']) {
			for(let x in prod) {if(data[j]['product']==prod[x]){bar_color = color[x];}}
			svg_in += "<rect width = '"+bar_width+"' height = "+ (data[j]['sale'][i]*t)+" fill = "+bar_color+" x ="+((30+space_width)*i+bar_width*j+space_width+50)
			+" y="+(224-data[j]['sale'][i]*t) +"></rect>";
		}
	}
	if(data.length > 0) {
		for(let i in data[0]['sale']) {
			svg_in += "<line x1 = "+(73+40*i)+" y1 = '225' x2 = "+(73+40*i)+" y2 = '230' style = 'stroke:black;stroke-width:1'/>"
		}
	}
	bar_wrapper.innerHTML = svg_in;
}

export {drawBar,getHDSJData,drawManyBar};

