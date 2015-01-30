var main = function(){
	"use strict";
	var url = "http://api.flickr.com/services/feeds/photos_public.gne?"+
	          "tags=dogs&format=json&jsoncallback=?",
	    photos = [],
	    clicked = false;
	$.getJSON(url,function(flickrResponse){
		flickrResponse.items.forEach(function (photo){
			photos.push(photo.media.m);
		});
	});
	slideShow(0);
	
	$("button").on("click",function(){
		photos =[];
		console.log($("input").val());
		$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags="+$("input").val()+"&format=json&jsoncallback=?",function(flickrResponse){
			flickrResponse.items.forEach(function (photo){
				photos.push(photo.media.m);
			});
		});
		$("input").val("");
		clicked = true;
		setTimeout(function(){
		slideShow(0);
		clicked = false;
		},3001);
	});
	
	function slideShow(photoIndex){
		var $img = $("<img>").hide();
		$img.attr("src",photos[photoIndex]);
		$img.attr("height",300);
		$("main .photos").empty().append($img);
		$img.fadeIn();
		setTimeout(function(){
			if(!clicked){
			photoIndex = (photoIndex+1)%photos.length;
			slideShow(photoIndex,photos);
			}
		},3000);
	}
	/*
	var messages = ["message one","message two","message three","message four"];
	var displayMessage = function(messageIndex){
		var $message = $("<p>").text(messages[messageIndex]).hide();
		$(".message").empty();
		$(".message").append($message);
		$message.fadeIn();
		setTimeout(function (){
			messageIndex = (messageIndex+1)%4;
			displayMessage(messageIndex);
		},3000);
	};
	displayMessage(0);
	*/
}

$(document).ready(main);