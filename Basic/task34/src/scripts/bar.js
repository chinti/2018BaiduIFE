import {sourceData} from "./ife31data.js";


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
	bar_wrapper.style.height = "300px";
	var bar_width = 30,space_width = 10,bar_color = '#1C86EE';
	var max = 0,t = 1;
	for(let i in data[0]['sale']) {
		if(max < data[0]['sale'][i]) {
			max = data[0]['sale'][i];
		}
	}
	t = 200/max;
	var d = data[0]['sale'];
	var svg_in = '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">';
	svg_in += "<line x1 = '50' y1 = '50' x2 = '50' y2 = '250' style = 'stroke:black ; stroke-width:1'/>";
	svg_in += "<line x1 = '45' y1 = '250' x2 = '100%' y2 = '250' style = 'stroke:black ; stroke-width:1'/>";
	for(let i in d) {
		svg_in += "<rect width = '25' height = "+ (d[i]*t)+" fill = "+bar_color+" x ="+((bar_width+space_width)*i+space_width+50)
		+" y="+(249-d[i]*t) +"></rect>";
		svg_in += "<line x1 = "+(73+40*i)+" y1 = '250' x2 = "+(73+40*i)+" y2 = '255' style = 'stroke:black;stroke-width:1'/>"
	}
	svg_in += '</svg>';
	bar_wrapper.innerHTML = svg_in;
}

export {drawBar,getHDSJData};

