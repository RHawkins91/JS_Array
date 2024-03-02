// Image Generator
	//Variables
const picsumUrl = "https://picsum.photos/400?random=";
const imageRandomContainer = document.querySelector(".random-image-container");
const assignButton = document.getElementById("image-gen-button");

var randomImg = document.createElement('img');
var assignedImage = null

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
	let form = document.forms["email-form"]["email-input"].value;
	let regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
	if (form == "") {
		alert("Email must not be empty");
		document.getElementById("email-input").focus();
		return false;
	} else if (!regex.test(form)){
		alert ("Invalid Email")
		document.getElementById("email-input").focus();
		return false
	} else {
		alert ("Good job!")
		return false
	}
} 

//Assign image to email
//Dictionary
var emailImagePairDict = {};
//Constructor
function email_image_group(email, image, email_dict=emailImagePairDict){
	this.email = email;
	this.images = [];
	this.images = this.images.push(image);
	if (email in email_dict){
		console.log(email_dict[this.email])
		console.log(email_dict[this.email].images)
		email_dict[this.email].images.push(image);
		return;
	} else {
	email_dict[this.email] = this;
	}
};
//Object 
// const emailImageGroup = {
// 	email: "",
// 	images: []
// };


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