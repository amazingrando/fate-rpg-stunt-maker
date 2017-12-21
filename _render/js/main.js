$(function() {

	var when_low = [
			"when attempting something that's your speciality (ex. expert on Languages)",
			"in a specific circumstance (ex. when you're <span class=\"aspect\">On Fire</span>\; when you're <span class=\"aspect\">Surrounded</span>)",
			"once per scene",
			"when you pay a fate point",
			"when doing a specific action (ex. Overcome, Create an Advantage, Attack, Defend)",
			"replacing a boost, optionally, when you succeed with style for a specific action (Attack, Create an Advantage)",
			"when you invoke the aspect related to the stunt (this costs an invoke or fate point, and replaces the +2 bonus)"
		],
		when_high = [
			"once per scene",
			"when you pay a fate point",
			"when you invoke the aspect related to the stunt (this costs an invoke or fate point, and replaces the +2 bonus)",
			"TWO"
		],
		what_low = [
			"Grant +2 to a specific action using a specific skill",
			"Switch one specific skill with another specific skill",
			"Add an action to a skill (ex. you can now Attack; now Defend)",
			"Ignore a simple rule (ex. can't use a skill twice in a challenge)",
			"Add a +2 opposition to a specific thing (ex. block moving; writing in code)",
			"Create an Advantage (no free invoke) that takes a Fair +2 roll to remove",
			"Upgrade a boost to an aspect (with free invoke)",
			"Use a specific skill in a way that lets you ignore one of the laws of physics (ex. Athletics to fly)",
		],
		what_high = [
			"Grant a 2 stress hit",
			"Inflict a mild consequence",
			"Switch ANY skill with a specific skill",
			"Grant +3 to a specific action using a specific skill",
			"Add a +3 opposition to a specific thing (ex. block moving; writing in code)",
			"Create an Advantage (no free invoke) that takes a Good +3 roll to remove",
			"Use a specific skill in a way that lets you ignore multiple laws of physics",
			];

	var add_cards_target = $('.add-cards');
	var additional_classes;
	var template = '<section class="card {{additional_classes}}"><div class="inner"><p>{{content}}</p></div></section>';

	function random_array_item(v, prev){
		if (typeof prev != "undefined") {
			var prev_item_index = v.indexOf(prev);
			v.splice(prev_item_index, 1);
		}
		return v[Math.floor(Math.random()*v.length)];
	}

	function adjust_height() {
		var tallest = 0;

		$('section.card').each(function(){
			$(this).css('height','');
			thisHeight = $(this).innerHeight();
			if (thisHeight > tallest) {
				tallest = thisHeight;
			}
		});

		$('section.card').each(function(){
			$(this).height(tallest);
		});

	}

	function generate_new_cards(){
		$('section.card').remove();

		var i = 0;
		while (i < 4) {
			var when, what, w1, w2, stunt, loop_template;
			var high_or_low = Math.round(Math.random()) ? '0' : '1';

			if(high_or_low === '0') {
				when = when_low;
				what = what_low;
			} else {
				when = when_high;
				what = what_high;
			}

			when = random_array_item(when);
			what = random_array_item(what);

			if (when === 'TWO') {
				// when_low = when_low.pop();
				w1 = random_array_item(when_low);
				do {
					w2 = random_array_item(when_low);
				} while (w1 === w2);
				when = w1 + ", " + w2;
			}

			stunt = what +' '+when;

			if (stunt.length > 150) {
				additional_classes = 'small';
			} else {
				additional_classes = '';
			}
			var loop_template = template.replace('{{content}}', stunt).replace('{{additional_classes}}',additional_classes);

			$(add_cards_target).append(loop_template);

			i++;
		}

		adjust_height();
	}

	generate_new_cards();
	setTimeout(adjust_height, 100);

	$('a.button').click(function(e) {
	  e.preventDefault();
	  generate_new_cards();
	});

	$(window).resize(adjust_height);


});
