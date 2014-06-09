$(function() {

	var target  = $('section.portfolio figure');

	function calc_tallest(h){
		thisHeight = 0;

		h.each(function(){
			$(this).css('height','');
			thisHeight = $(this).height();
			if (thisHeight > tallest) {
				tallest = thisHeight;
			}
		});
	}

	function make_them_all_the_same_size(h){
		h.each(function(){
			$(this).height(tallest);
		});
	}

	$(window).on("load resize",function(){
		tallest = 0;
    calc_tallest(target);
		make_them_all_the_same_size(target);
	});

});