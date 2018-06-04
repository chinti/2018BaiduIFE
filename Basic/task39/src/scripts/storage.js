function prepareStorageButton() {				//准备存储数据的按钮
	var button = document.querySelector('#app #save_button');
	button.onclick = function(e) {
		document.querySelector('body').click();
		var tr = document.querySelectorAll('#app #table-wrapper tbody tr');
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
		//showCheckboxTable(getDataList())
		alert('存储成功');
		//console.log(tr);
		//localStorage.removeItem('BasicSourceData')
		//console.log(fdata);
		//console.log(sourceData)
	}
}

//下面是用于存储State状态


function getState() {
	var state = history.state;
	return state;
}
function pushCheckboxtoState(list,cp,cr) {				//将改变的checkbox的值写入url中
	var text = getState();
	var t1 = [0,0,0],t2 = [0,0,0];
	for(let i = 0 ; i<list['product'].length;i++) {
			if(cp.indexOf(list['product'][i]) != -1) {
				t1[i] = 1;
			}
	}
	for(let i = 0 ; i<list['region'].length;i++) {
			if(cr.indexOf(list['region'][i]) != -1) {
				t2[i] = 1;
			}
	}
	t1 = t1.join('');
	t2 = t2.join('');
	history.replaceState('#'+t1+'2'+t2,null,'#'+t1+'2'+t2);	
	//window.onpopstate();
}
export {prepareStorageButton,getState,pushCheckboxtoState}