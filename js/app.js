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


//Dictionary
var emailImagePairDict = {};


	//Event Listeners
randomImg.addEventListener('load', gen_image());

assignButton.addEventListener('click',() => {    
     remove_old_image();
     gen_image();    
});

	//Functions
async function gen_image() {
	randomImg = document.createElement("img")
	randomImg.src = picsumUrl + new Date().getTime()
	imageRandomContainer.appendChild(randomImg)
	assignedImage = randomImg.src
};
async function remove_old_image() {
	imageRandomContainer.removeChild(randomImg)
};




// Form validation
function validateForm() {
	var form = document.forms["email-form"]["email-input"].value;
	var regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
	if (form == "") {
		errorBox.classList.add("error-banner-displayed");
		errorBox.innerHTML = "<h1 class ='error-heading'>Email must not be empty</h1>"
		document.getElementById("email-input").focus();
		return false;
	} else if (!regex.test(form)){
		errorBox.classList.add("error-banner-displayed");
		errorBox.innerHTML = "<h1 class ='error-heading'>Email address is invalid</h1>"
		document.getElementById("email-input").focus();
		return false
	} else {
		errorBox.classList.remove("error-banner-displayed");
		email_image_group_thing(form)
		push_image_into_array(emailImagePairDict[form], assignedImage)
		email_selected()
		remove_old_image()
		gen_image()
		return false
		
	}
} 

//Assign image to email

//Constructor
function email_image_group(email){
	this.email = email;
	this.images = [];
};

function push_image_into_array(email_image_pair, image){
	if (!(email_image_pair.images.includes(image))){
		email_image_pair.images.push(image);
		errorBox.classList.remove("error-banner-displayed");
	} else {
		errorBox.classList.add("error-banner-displayed");
		errorBox.innerHTML = "<h1 class ='error-heading'>You have already assigned this image to your email address</h1>";
		return
	}
};

function email_image_group_thing(email, email_image_pair_dict=emailImagePairDict){
	if (!(email in email_image_pair_dict)){
		var newOption = document.createElement("option");
		email_image_pair_dict[email] = new email_image_group(email)
		newOption.text = email
		emailDropdown.add(newOption)
		console.log(email_image_pair_dict)
	};
};

emailDropdown.addEventListener("change", email_selected)

function email_selected() {
	var emailSelected = emailDropdown.value;
	document.forms["email-form"]["email-input"].value = emailSelected
	clear_images()
	document.getElementById("assigned-image-heading").innerHTML = emailSelected;
	emailImagePairDict[emailSelected].images.forEach(populate_images)
	// console.log("new email selected" + emailSelected);
}

function populate_images(value){
	var image = document.createElement("img");
	image.src = value
	image.classList.add("assigned-image")
	assignedImageContainer.appendChild(image)
	console.log("wooo" + " " + value)
}
function clear_images(){
  while (assignedImageContainer.firstChild) {
    assignedImageContainer.removeChild(assignedImageContainer.lastChild);
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