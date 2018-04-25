
function transferColor(){
	var divColor = document.getElementsByTagName("div");
	var buttonColor = document.getElementsByTagName("button");
	var pColor = document.getElementsByTagName("p");

	buttonColor[0].onclick = function() {
		if (divColor[0].getAttribute("class") == "color")
		{
		divColor[0].setAttribute("class","active");
		pColor[0].setAttribute("class","active");
		}
		else if (divColor[0].getAttribute("class") == "active")
		{
		divColor[0].setAttribute("class","color");
		pColor[0].setAttribute("class","color");
		}

	}
}
	
window.onload = function() {
	transferColor();
}