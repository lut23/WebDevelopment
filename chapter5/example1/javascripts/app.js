var main = function(){
	"use strict";
    console.log("Hello World!");
    
	$.getJSON("cards/aceOfSpades.json",function(card){
		var $cardParagraph = $("<p>");
		$cardParagraph.text(card.rank + " of "+ card.suit);
		$("main").append($cardParagraph);
	});
	
	$.getJSON("cards/hand.json", function(hand){
		var $list = $("<ul>");
		console.log("hi");
		hand.forEach(function(card){
			var $card = $("<li>");
			$card.text(card.rank + " of " +card.suit);
			$list.append($card);
			console.log("hey");
		});
		$("main").append($list);
	});
};
$(document).ready(main);