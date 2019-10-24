"use strict";

const log = console.log;

function checkPwMatch(){
	var signupemail = document.getElementById("email").value;
	var signuppassword = document.getElementById("pw").value;
	var confirmpw = document.getElementById("cpw").value;
	var lastname = document.getElementById("lastname").value;
	var firstname = document.getElementById("firstname").value;

	if(signupemail == null || signupemail == ""){
		alert("Please enter your email address");
		return false;
	}
	if(signuppassword == null || signuppassword == ""){
		alert("Please enter your password");
		return false;
	}
	if(confirmpw == null || confirmpw == ""){
		alert("Please enter your confirm password");
		return false;
	}
	if(lastname == null || lastname == ""){
		alert("Please enter your last name");
		return false;
	}
	if(firstname == null || firstname == ""){
		alert("Please enter your first name");
		return false;
	}
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