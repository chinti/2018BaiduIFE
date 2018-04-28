$(".form__input").blur(function(){
	if ($(".form__input")[0].value && $(".form__input")[1].value) {
		$(".btn").addClass("animated infinite pulse");
	}
	else {
		$(".btn").removeClass("animated infinite pulse");
	}
		
	if ($(this).val()) {
		$(this).next().children(".form__label__content").addClass("after");
	}
	else {
		$(this).next().children(".form__label__content").removeClass("after");
	}
	
});