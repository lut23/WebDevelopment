var main = function(toDoObjects){
	"use strict";
	
	
	
	$(".tabs a span").toArray().forEach(function (element){
			$(element).on("click",function(){
				var toDos = toDoObjects.map(function (toDo){
					return toDo.description;
				});
				var $element = $(element),
				    $content;
			    $(".tabs span").removeClass("active");
			    $(element).addClass("active");
			    $("main .content").empty();
			    /*         Oldest Tab         */
			    if($element.parent().is(":nth-child(1)")){
			    	var index,
			    	$content = $("<ul>");
			    	for(index = toDos.length-1; index >=0; index--){
			    		$content.append($("<li>").text(toDos[index]));
			    	}
			    	$("main .content").append($content);
			    	/*        Newest Tab        */
			    } else if ($element.parent().is(":nth-child(2)")) {
			    	$content = $("<ul>");
			    	toDos.forEach(function (todo) {
			    		$content.append($("<li>").text(todo));
			    	});
			    	$("main .content").append($content);
			    	/*        sorted by tags tab        */
			    }else if ($element.parent().is(":nth-child(3)")){
			    	console.log("the tags tab was clicked");
			    	var organizedByTag = organizeByTag(toDoObjects);
			    	
			    	organizedByTag.forEach(function(tag){
			    		var $tagName = $("<h3>").text(tag.name),
			    		$content = $("<ul>");
			    		tag.toDos.forEach(function (description){
			    			var $li = $("<li>").text(description);
			                $content.append($li);
			    		});
			    		$("main .content").append($tagName);
			    		$("main .content").append($content);
			    	});
			    	/*          add Todo tab             */
			    }else if ($element.parent().is(":nth-child(4)")) {
			    	$("main .content").append('<p>Description:</p><input type="text" class ="description"><p>Tags:</p><input type="text" class ="tags"><button>+</button>');
			    	$("button").on("click",function(event){
			    		inputToDo(toDos,toDoObjects);
			    		
			    	});
			    	$("input").on("keypress",function(event){
			    		if(event.keyCode === 13){
			    			inputToDo(toDos,toDoObjects);
			    		}
			    	});
			    }
			    return false;
		});
	});
	$(".tabs a:first-child span").trigger("click");
  }

$(document).ready(function (){
	$.getJSON("toDos.json", function(todoObjects){
		main(todoObjects);
	})
	
});
 /*        Helper Functions         */
function inputToDo(arr,objArr){
	var $toDo = {"description": "","tags":[]};
	console.log($("input.description").val())
	if($("input.description").val() ? true:false || $("input.tags").val()? true:false){
		arr.push($("input.description").val());
		$toDo.description = $("input.description").val();
		$toDo.tags = $("input.tags").val().split(",");
		objArr.push($toDo);
		$("input").val("");
		console.log("inner function completted")
	}else{
		console.log("failed input value")
	}
		
      }
/*
 *Organize To-dos by tag
 */
function organizeByTag(toDoObject){
	var organizedByTag =[];
	toDoObject.forEach(function(toDo){
		if(organizedByTag.length === 0){
				for(var i=0;i<toDo.tags.length;i++){
					organizedByTag.push({"name": toDo.tags[i],"toDos":[toDo.description]})
				}
		}else{
			addToOrganizedByTag(toDo,organizedByTag);
		}
	  });
	console.log(organizedByTag);
	return organizedByTag;
}

function addToOrganizedByTag(toDo, organizedByTag){
	var n=false;
	for(var i=0;i<toDo.tags.length;i++){
	    for(var j=0; j < organizedByTag.length; j++){
	        if(toDo.tags[i] === organizedByTag[j].name){
		        organizedByTag[j].toDos.push(toDo.description);
		        n = true; 
	        }
	    }if(!n){
		      organizedByTag.push({"name": toDo.tags[i],"toDos":[toDo.description]});
	    }
   }
}