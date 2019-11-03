"use strict";

const log = console.log;

const signupButton = document.querySelector("#signupButton");
signupButton.addEventListener("click", checkSignUpValid);


function checkSignUpValid(e){
	e.preventDefault()

	if(document.getElementById("email").value === null || document.getElementById("email").value === ""){
		alert("Please enter your email address");
		return false;
	}
	var signupemail = document.getElementById("email").value;

	if(document.getElementById("pw").value === null || document.getElementById("pw").value === ""){
		alert("Please enter your password");
		return false;
	}
	var signuppassword = document.getElementById("pw").value;

	if(document.getElementById("cpw").value === null || document.getElementById("cpw").value === ""){
		alert("Please enter your confirm password");
		return false;
	}
	var confirmpw = document.getElementById("cpw").value;

	if(document.getElementById("name").value === null || document.getElementById("name").value === ""){
		alert("Please enter your name");
		return false;
	}
	var name = document.getElementById("name").value;

	if(document.getElementById("phone") === null || document.getElementById("phone") === ""){
		alert("Please enter your phone number");
		return false;
	}
	var phone = document.getElementById("phone").value;

	if(document.getElementById("company").value === null || document.getElementById("company").value === ""){
		alert("Please enter your company");
		return false;
	}
	var company = document.getElementById("company").value;

	if(document.querySelector('#selectPosition').value === "none"){
		alert("Please select your position");
		return false;
	}
	var position = document.querySelector('#selectPosition').value;

	//password not match
	if(signuppassword != confirmpw){
		document.getElementById("pw").value = "";
		document.getElementById("cpw").value = "";
		alert("Please make sure your password and confirm password are matching");
		return false;
	}

	//email address not valid
	if(signupemail.indexOf('@') == -1){
		document.getElementById("email").value = "";
		alert("Please enter valid email address");
		return false;
	}

	//otherwise is valide sign up
	alert("Sign Up Successfully")
	//point to the log in page
	window.location = "index.html";
}

function checkCompanyExist()