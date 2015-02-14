
//create new dragon
var newDragon = function(event){
	//getting the input values
	var d_breed = document.getElementById("breed").value;
	var d_length = document.getElementById("length").value;
	var d_wingspan = document.getElementById("wingspan").value;
	var d_name = document.getElementById("name").value;
	
	//make sure all values are filled (name is optional)
	if(!d_length || !d_breed || !d_wingspan){
		return;
	}
	
	//clear the form
	document.getElementById("breed").value = "";
	document.getElementById("length").value = "";
	document.getElementById("wingspan").value = "";
	document.getElementById("name").value = "";
	
	//create the div for the dragon
	var dragon = document.createElement('div');
	dragon.className = "dragonBody";
	
	//initial positioning
	dragon.style.top = "50px";
	dragon.style.left = "500px";
	
	//add image
	var dragonImage = document.createElement("img");
	dragonImage.src = "images/" + d_breed + "_body.png";	
	dragonImage.height = d_length; 
	dragon.appendChild(dragonImage);
	dragonImage.addEventListener('mousedown', move);
	
	//add textxtxt
	var label = document.createElement("p");
	label.textContent = d_name;
	label.className = "label";
	label.style.top = d_length/6;
	
	dragon.appendChild(label);
	
	//wing div
	var wings = document.createElement('div');
	wings.className = "wings";
	//position the wing to center
	
	wings.style.left = -d_wingspan/2 + d_length/6;
	wings.style.zIndex = "-1";
	wings.style.top = 0;
	
	//this pushes the wings down the shoulders
	//i need a better calculation - have to determine the shoulder location
	wings.style.paddingTop = d_length / 8;
	
	var wingImage = document.createElement("img");
	wingImage.src = "images/" + d_breed + "_wings.png";	
	wingImage.width = d_wingspan; 
	wings.appendChild(wingImage);	
	dragon.appendChild(wings);
	
	
	//remove the normal drag function
	dragon.ondragstart = function() { return false };
	
	//add div to display box
	document.getElementById('displayBox').appendChild(dragon);
}//end newDragon

/* YO NOTES ABOUT STUFF FOR LATER ON
	probably we want to change it so that it's the IMAGE that has the listener
	oh and how are we gonna do colors
	might be easier to just have roygbiv images, no sure if i can recolor without saving the image which is dumb
	
	cool stuff 2 add:
	-pull to the top to keep bbs from being buried
	-delete drg
	show/hide add menu
	-stop the jump on clicking - would need to save initial mouse position
*/


//click and drag a dragon on the screen
var move = function(event){
	var selection = this;
	document.onmousemove = function(event){
		//change the top and left vals of the div to match
		selection.parentNode.style.top = event.pageY-(selection.height/3);
		selection.parentNode.style.left = event.pageX-(selection.width/2);
	}//end document mousemove
	

	this.onmouseup = function(event){
		//check if its on the delete box
		if(event.pageY >= window.innerHeight-100 && event.pageX <= 100){			
			this.parentNode.remove();
		}
		
		//clear the mousemove function until we trigger move again	
		document.onmousemove = null;
	}//end div mouseup
	
}//end move


//show/hide create dragon menu
var toggleForm = function(event){
	var form = document.getElementById("form");
	if(form.style.display === "block"){
		form.style.display = "none";

	}
	else{
		form.style.display = "block";

	}
}

