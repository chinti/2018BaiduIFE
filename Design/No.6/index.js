function showPic() {
	var choose = document.getElementsByClassName("choBox");
	var show = document.getElementsByClassName("show");
	for (var i = 0 ; i< show.length ; i++) {
		(function() {
			var temp = i;
			choose[temp].onclick = function() {
				for(let j = 0 ; j < show.length ; j++) {
					
					show[j].setAttribute('class','show');
				}
				show[temp].setAttribute('class','show active'+(temp+1));
			}
		})();

	}
}

window.onload = function() {
	showPic();	
};