// Image Generator
	//Variables
const picsumUrl = "https://picsum.photos/400?random=";
const imageRandomContainer = document.querySelector(".random-image-container");
const assignButton = document.getElementById("image-gen-button");

var randomImg = document.createElement('img');
var assignedImage = null

var emailDropdown = document.getElementById("email-dropdown");
var assignedImageContainer = document.getElementById("assigned-image-container")
var errorBox = document.getElementById("error-banner")

	//Dictionary for image/email groups
var emailImagePairDict = {};


	//generate an image on page load
randomImg.addEventListener('load', gen_image());

	//generate an image on button click
assignButton.addEventListener('click',() => {    
     remove_old_image();
     gen_image();    
});

	//fires when an image needs to be generated
async function gen_image() {
	randomImg = document.createElement("img")
	randomImg.src = picsumUrl + new Date().getTime()
	imageRandomContainer.appendChild(randomImg)
	assignedImage = randomImg.src
};
	//removes the old images
async function remove_old_image() {
	imageRandomContainer.removeChild(randomImg)
};




// Form validation
function validateForm() {
	var form = document.forms["email-form"]["email-input"].value;
	var regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
	if (form == "") {
		message_box(0)
		document.getElementById("email-input").focus();
		return false;
	} else if (!regex.test(form)){
		message_box(1)
		document.getElementById("email-input").focus();
		return false
	} else {
		message_box(3)
		email_image_group_thing(form)
		push_image_into_array(emailImagePairDict[form], assignedImage)
		//clear_input()
		email_selected()
		return false
		
	}
} 

//Assign image to email
	//Constructor for image/email group object
function email_image_group(email){
	this.email = email;
	this.images = [];
};

	//Put the images into the array
function push_image_into_array(email_image_pair, image){
	if (!(email_image_pair.images.includes(image))){
		email_image_pair.images.push(image);
		errorBox.classList.remove("error-banner-displayed");
	} else {
		message_box(2)
		return
	}
};

	//add a new option to the drop-down
function email_image_group_thing(email, email_image_pair_dict=emailImagePairDict){
	if (!(email in email_image_pair_dict)){
		var newOption = document.createElement("option");
		email_image_pair_dict[email] = new email_image_group(email)
		newOption.text = email
		emailDropdown.add(newOption)
		console.log(email_image_pair_dict)
	};
};
	//event listener for drop-down selection
emailDropdown.addEventListener("change", email_selected)

	//fires when you select an email
function email_selected() {
	var emailSelected = emailDropdown.value;
	document.forms["email-form"]["email-input"].value = emailSelected
	clear_images()
	document.getElementById("assigned-image-heading").innerHTML = "Images assigned to " + emailSelected;
	emailImagePairDict[emailSelected].images.forEach(populate_images)
}
	//Populates the image container with the contents of the array
function populate_images(value){
	var image = document.createElement("img");
	image.src = value
	image.classList.add("assigned-image")
	assignedImageContainer.appendChild(image)
	console.log("wooo" + " " + value)
}
	//Clears the image container
function clear_images(){
  while (assignedImageContainer.firstChild) {
    assignedImageContainer.removeChild(assignedImageContainer.lastChild);
  }
}
 //clears the input field
function clear_input(){
	if (document.forms["email-form"]["email-input"].value !== ""){
		document.forms["email-form"]["email-input"].value = ""
	}
}
//shows the error box
//0 = empty email
//1 = invalid email
//2 = pair already exists
//3 = success
function message_box(message_case){
	if (message_case === 0) {
		errorBox.classList.remove("error-banner-displayed");
		errorBox.classList.add("error-banner-displayed");
		errorBox.innerHTML = "<h1 class ='error-heading'>Email must not be empty</h1>"
	} else if (message_case === 1) {
		errorBox.classList.remove("error-banner-displayed");
		errorBox.classList.add("error-banner-displayed");
		errorBox.innerHTML = "<h1 class ='error-heading'>Email address is invalid</h1>"
	} else if (message_case === 2) {
		errorBox.classList.remove("error-banner-displayed");
		errorBox.classList.add("error-banner-displayed");
		errorBox.innerHTML = "<h1 class ='error-heading'>You have already assigned this image to your email address</h1>"
	} else if (message_case === 3) {
		errorBox.classList.remove("error-banner-displayed");
		errorBox.classList.add("error-banner-displayed");
		errorBox.innerHTML = "<h1 class ='error-heading'>Successfully assigned image</h1>"
	} else {
		console.log("Message case out of range")
	}
}

// Title Animation
	//Variables
const textToAnimate = document.querySelector(".anim-text");
const textStr = textToAnimate.textContent;
const textSplit = textStr.split("");
	//Hide original
textToAnimate.textContent = "";
	//Add spans
for (var i = 0; i < textSplit.length; i++) {
	textToAnimate.innerHTML += "<span>" + textSplit[i] + "</span>"
};
	//Timer
let animChar = 0;
let animTimer = setInterval(on_tick, 50);
	//Add class to animate
function on_tick() {
	const span = textToAnimate.querySelectorAll("span")[animChar];
	span.classList.add('text-anim');
	animChar++
	if(animChar === textSplit.length){
		end_anim();
		return;
	}
};
	//Finish
function end_anim(){
	clearInterval(animTimer);
	animTimer = null;
};