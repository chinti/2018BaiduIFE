 $(document).ready(function() {
	lottie.loadAnimation({
		container:		$(".stage")[0],
		renderer:		'svg',
		loop:			true,
		autoplay:		true,
		path:			'./assets/data1.json',
	}); 
	var ani = lottie.loadAnimation({
		container:		$(".stage")[1],
		renderer:		'svg',
		loop:			false,
		autoplay:		false,
		path:			'./assets/data2.json',
	}); 
	
	$(".rectangle").mouseenter(function(){
		ani.play();
	});
	$(".rectangle").mouseleave(function(){
		ani.stop();
	});
	
});



