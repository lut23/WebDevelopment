var main = function(toDoObjects){
	"use strict";
	
	var organizedByTag = organizeByTag(toDoObjects);
}

$(document).ready(function (){
	$.getJSON("toDos.json",function(to){
		main(to);
	})
});

function organizeByTag(toDos){
	console.log("organize by tags calls");
	console.log("toDos");
	console.log(toDos);
	var organizedByTag =[];
	toDos.forEach(function(toDo){
		var i,n = 0;
		if(organizedByTag.length === 0){
			if(toDo.tags.length === 1){
	        organizedByTag.push({"tag": toDo.tags[0],"description":[toDo.description]})
			}else{
				for(i=0;i<toDo.tags.length;i++){
					organizedByTag.push({"tag": toDo.tags[i],"description":[toDo.description]})
				}
			}
		}else{
			for(i=0; i < organizedByTag.length; i++){
			    if(toDo.tags === organizedByTag[i].tag){
				    organizedByTag[i].description.push(toDo);
				    n = 1; 
			    }
			}if(n !== 1){
				    organizedByTag.push({"tag": toDo.tags,"description":[toDo.description]});
			    }
		 }
	  });
	console.log(organizedByTag);
	return organizedByTag;
}
