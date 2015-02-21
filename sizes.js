
//create new dragon
var newDragon = function(event){
	//getting the input values
	var d_breed = document.getElementById("breed").value;
	var d_length = document.getElementById("length").value;
	var d_wingspan = document.getElementById("wingspan").value;
	var d_name = document.getElementById("name").value;
	
	console.log("Creating dragon. Breed: +" + d_breed + ", Length: " + d_length + ", Width:" + d_wingspan + ", Name:" + d_name);
	
	d_length = d_length * 50;
	d_wingspan = d_wingspan * 50;
	
	//make sure all values are filled (name is optional)
	if(!d_length || !d_breed || !d_wingspan){
		console.log("Dragon creation failed: One or more fields left blank");
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
	dragon.style.zIndex = 1;
	
	//add image
	var dragonImage = document.createElement("img");
	dragonImage.src = "images/" + d_breed + "_body.png";	
	dragonImage.height = d_length; 
	dragonImage.zIndex = 1;
	dragon.appendChild(dragonImage);
	dragonImage.addEventListener('mousedown', move);
	
	
	//wing div
	var wings = document.createElement('div');
	wings.className = "wings";
	//position the wing to center
	
	wings.style.left = -d_wingspan/2 + d_length/6;
	wings.style.top = 0;
	
	//this pushes the wings down the shoulders
	//i need a better calculation - have to determine the shoulder location
	wings.style.paddingTop = d_length / 8;
	
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
	
	wingImage.addEventListener('mousedown', moveWing);
	label.addEventListener('mousedown', moveWing);
	
	
	
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
	
}//end moveWing


var changeBG = function(event){
	var color = document.getElementById("color").value;
	if(color[0] != "#")
		color = "#" + color;	
	document.body.style.background = color;	
	console.log("Background color changed to " + color);
}





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
