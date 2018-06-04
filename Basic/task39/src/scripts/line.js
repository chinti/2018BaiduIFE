function prepareCanvas() {
	var line_wrapper = document.querySelector('#app #line-wrapper');
	line_wrapper.innerHTML = "<canvas width = 800px height = '250'></canvas>";
	line_wrapper.style.height = "250px";
	var can = line_wrapper.querySelector('canvas');
}

let color = ['#60ACFC','#32D3EB','#5BC49F','#FEB64D','#ff7c7c','#9287e7','#7Fb6FF','#12B3DB','#4bb48f'];

function drawLine(data) {
	var canvas = document.querySelector('#app #line-wrapper canvas');
	var max = 0,t = 1;
	for (let j = 0 ;j<data.length ;j++) {
		for(let i in data[j]['sale']) {
			if(max < data[j]['sale'][i]) {
				max = data[j]['sale'][i];
			}
		}
	}
	t = 200/max;
	if(canvas.getContext != null) {
		var ctx = canvas.getContext('2d');
		createNewAxis(ctx,max,t);		//建立坐标轴
		for(let j = 0 ; j < data.length ; j ++) {
			for (let i in data[j]['sale']) {
				if(i == 0 ) {
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(27,(225-data[j]['sale'][i]*t),2,0,2*Math.PI,true);
					ctx.fillStyle = color[j];
					ctx.fill();
					ctx.font = "15px Verdana"
					ctx.fillText(data[j]['product']+','+data[j]['region'],700,40+j*20)
					ctx.beginPath();
					ctx.strokeStyle = color[j];
					ctx.moveTo(27,(225-data[j]['sale'][i]*t));
				}else {
					ctx.lineTo(27+55*i,(225-data[j]['sale'][i]*t));
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(27+55*i,(225-data[j]['sale'][i]*t),2,0,2*Math.PI,true);
					ctx.fillStyle = color[j];
					ctx.fill();
					ctx.beginPath();
					ctx.moveTo(27+55*i,(225-data[j]['sale'][i]*t));
				}
			}	
		}
		ctx.stroke();	
		ctx.closePath();
	}
}

function createNewAxis(ctx,max,t) {
		ctx.clearRect(0,0,800,250);
		ctx.beginPath();
		ctx.moveTo(25,25);
		ctx.lineTo(25,225);
		ctx.moveTo(20,225);
		ctx.lineTo(660,225);
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.beginPath();
		//console.log(max.length)
		var max_line = Math.floor(max/Math.pow(10,max.toString().length-1))*Math.pow(10,max.toString().length-1);
		var line_add = Math.floor(parseInt(max/3)/Math.pow(10,parseInt(max/3).toString().length-1))*Math.pow(10,parseInt(max/3).toString().length-1);
		//console.log(line_add);
		for(let i = line_add; i*t < 200 ; i+=line_add){
			ctx.moveTo(26,225-i*t);
			ctx.lineTo(660,225-i*t);
			ctx.font = "8px Verdana"
			ctx.fillStyle = '#AAA';
			ctx.fillText(i,5,225-i*t)
		}
		for(let i = 0 ; i< 12;i++) {
			ctx.fillText((i+1)+'月',26+55*i,240);
		}
		ctx.strokeStyle = '#AAA';
		ctx.stroke();
		ctx.beginPath();
}


export{prepareCanvas,drawLine}