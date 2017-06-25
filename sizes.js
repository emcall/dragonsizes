
var setup = function(){
	console.log("setup");
var canvas = document.getElementById("canvas");
canvas.addEventListener('mouseup', drop);
}


//create new dragon
var newDragon = function(event){
	//getting the input values
	var d_breed = document.getElementById("breed").value;
	var d_length = document.getElementById("length").value;
	var d_wingspan = document.getElementById("wingspan").value;
	var d_name = document.getElementById("name").value;
	
	console.log("Creating dragon. Breed: +" + d_breed + ", Length: " + d_length + ", Width:" + d_wingspan + ", Name:" + d_name);
	
		
	//make sure all values are filled (name is optional)
	if(!d_length || !d_breed || !d_wingspan){
		alert("Please fill in length, width, and breed!");
		console.log("Dragon creation failed: One or more fields left blank");
		return;
	}
	
	//increase the size of everything so that it reflects the actual pixel size that will display
	d_length = d_length * 50;
	d_wingspan = d_wingspan * 50;

	
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
	dragon.style.zIndex = 1;
	
	//add image
	var dragonImage = document.createElement("img");
	dragonImage.src = "images/" + d_breed + "_body.png";	
	dragonImage.height = d_length; 
	dragonImage.zIndex = 1;
	dragon.appendChild(dragonImage);
	
	//event listener
	dragonImage.addEventListener('mousedown', move);
	dragonImage.addEventListener('mouseup', dropBody);
	
	//wing div
	var wings = document.createElement('div');
	wings.className = "wings";
	//position the wing to center. d-length is taking into account how big the dragon image is (they're approximately 1/6th the width as the length)
	//bogsneaks are thicker so they only get 1/5th
	
	if(d_breed !="bogsneak"){
		wings.style.left = -d_wingspan/2 + d_length/6;
	}
	
	else {
		wings.style.left = -d_wingspan/2 + d_length/5;
	}
	//this pushes the wings down to hit the shoulders
	//i think i need to take into account the size of the wings compared to the body size
	//the problem is different breeds have different shoulder locations
	
	wings.style.top = d_length/8;
	
	
	var wingImage = document.createElement("img");
	wingImage.src = "images/" + d_breed + "_wings.png";	
	wingImage.width = d_wingspan; 
	wingImage.style.zIndex = "-1";
	wings.appendChild(wingImage);	
	dragon.appendChild(wings);
	

	//this adds the text
	
	var label = document.createElement("p");
	label.textContent = d_name;
	label.className = "label";
	label.style.top = d_length/4;
	label.style.width = d_wingspan;
	label.style.zIndex= 2;
	
	wings.appendChild(label);
	

//add the event listener
	wingImage.addEventListener('mousedown', moveWing);
	label.addEventListener('mousedown', moveWing);
	wingImage.addEventListener('mouseup', dropWing);
	label.addEventListener('mouseup', dropWing);	
	
	
	dragon.appendChild(wings);
	
	
	//remove the normal drag function
	dragon.ondragstart = function() { return false };
	
	//add div to display box
	document.getElementById('displayBox').appendChild(dragon);
}//end newDragon

//click and drag a dragon on the screen
var move = function(event){
	var selection = this;
	console.log("Dragon clicked on. Initial position:" + event.pageX + "," + event.pageY);
	
	document.onmousemove = function(event){	
		//change the top and left vals of the div to match
		selection.parentNode.style.top = event.pageY-(selection.height/3);
		selection.parentNode.style.left = event.pageX-(selection.width/2);
		
	}//end document mousemove
	/*

	this.onmouseup = function(event){
		console.log("Mouse button lifted. Current position:" + event.pageX + "," + event.pageY);
		//check if its on the delete box
		if(event.pageY >= window.innerHeight-100 && event.pageX <= 100){
			console.log("Dragon removed");
			this.parentNode.remove();
		}
		
		//clear the mousemove function until we trigger move again	
		document.onmousemove = null;
	}//end div mouseup
	*/
}//end move



//if the wing image is clicked on, move needs to function a little differently
//We need to move the dragon div (the parent(dragon) of the parent(wing))
var moveWing = function(event){
	
	console.log("Dragon wing clicked on. Initial position:" + event.pageX + "," + event.pageY);
	var selection = this;
	var dragonbody = this.parentNode.parentNode;
	document.onmousemove = function(event){
		dragonbody.style.top = event.pageY-selection.width/2;
		dragonbody.style.left = event.pageX-selection.height/2;
		
	}//end document mousemove
	
/*	
	this.onmouseup = function(event){
		console.log("Mouse button lifted. Current position:" + event.pageX + "," + event.pageY);
		//check if its on the delete box
		if(event.pageY >= window.innerHeight-100 && event.pageX <= 100){	
			console.log("Dragon removed.");
			this.parentNode.parentNode.remove();
		}	
		//clear the mousemove function until we trigger move again	
		document.onmousemove = null;
	}//end div mouseup
	*/
}//end moveWing

//drop the image
var dropBody = function(event){
			console.log("Mouse button lifted. Current position:" + event.pageX + "," + event.pageY);
		//check if its on the delete box
		if(event.pageY >= window.innerHeight-100 && event.pageX <= 100){
			console.log("Dragon removed");
			this.parentNode.remove();
		}
		
		//clear the mousemove function until we trigger move again	
		document.onmousemove = null;
}

var dropWing = function(event){
	
		console.log("Mouse button lifted. Current position:" + event.pageX + "," + event.pageY);
		//check if its on the delete box
		if(event.pageY >= window.innerHeight-100 && event.pageX <= 100){	
			console.log("Dragon removed.");
			this.parentNode.parentNode.remove();
		}	
		//clear the mousemove function until we trigger move again	
		document.onmousemove = null;
	
}

var drop = function(event){
	console.log("triggered drop");
//When the mouse is lifted this needs to execute to make sure the dragon is put down
		document.onmousemove = null;
}



var changeBG = function(event){
	var color = document.getElementById("color").value;
	if(color[0] != "#")
		color = "#" + color;	
	document.body.style.background = color;	
	console.log("Background color changed to " + color);
} //end changeBG



//show/hide create dragon menu
var toggleForm = function(event){
	var form = document.getElementById("form");
	if(form.style.display === "block"){
		form.style.display = "none";
		console.log("form hidden");
	}
	else{
		form.style.display = "block";
		document.getElementById("notes").style.display = "none";
		console.log("Form displayed");
	}
}

//show/hide create dragon menu
var toggleNotes = function(event){
	var notes = document.getElementById("notes");
	if(notes.style.display === "block"){
		notes.style.display = "none";
		console.log("notes hidden");
	}
	else{
		notes.style.display = "block";
		document.getElementById("form").style.display = "none";
		console.log("notes displayed");
	}
}
