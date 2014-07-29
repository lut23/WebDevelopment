var main = function(){
	"use strict";
	
	var toDos = [
	             "Finish working on this book",
	             "Look at emails",
	             "Take sadie out",
	             "Come up with more random stuff for toDos",
	             "Get Yellow Onions"
	             ];
	
	$(".tabs a span").toArray().forEach(function (element){
			$(element).on("click",function(){
				var $element = $(element),
				    $content;
			    $(".tabs span").removeClass("active");
			    $(element).addClass("active");
			    $("main .content").empty();
			    
			    if($element.parent().is(":nth-child(1)")){
			    	var index,
			    	$content = $("<ul>");
			    	for(index = toDos.length-1; index >=0; index--){
			    		$content.append($("<li>").text(toDos[index]));
			    	}
			    	$("main .content").append($content);
			    } else if ($element.parent().is(":nth-child(2)")) {
			    	$content = $("<ul>");
			    	toDos.forEach(function (todo) {
			    		$content.append($("<li>").text(todo));
			    	});
			    	$("main .content").append($content);
			    }else if ($element.parent().is(":nth-child(3)")) {
			    	$("main .content").append('<input type="text"><button>+</button>');
			    	$("button").on("click",function(event){
			    		console.log("outer function");
			    		inputToDo(toDos);
			    		
			    	});
			    	$("input").on("keypress",function(event){
			    		if(event.keyCode === 13){
			    			console.log("outer function");
			    			inputToDo(toDos);
			    		}
			    	});
			    }
			    return false;
		});
	});
	$(".tabs a:first-child span").trigger("click");
  }

$(document).ready(main);

function inputToDo(arr){
	if($("input").val() ? true:false){
		arr.push($("input").val());
		$("input").val("");
		console.log("inner function completted")
	}else{
		console.log("failed input value")
	}
      }