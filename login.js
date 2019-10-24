"use strict";

const log = console.log;

function checkEmailPwMatch(){
	var email = document.getElementById("email").value;
	var password = document.getElementById("pw").value;
	//correcy email and password for user
	if(email == "user" && password == "user"){
		//clear the input box
		document.getElementById("email").value = "";
		document.getElementById("pw").value = "";
		//pop up to notice log in success
		alert("Login Successfully as regular user");
		//point to next page
		window.location = "dashboard.html";
		return true;
	}
	//correcy email and password for admin
	else if(email == "admin" && password == "admin"){
		//clear the input box
		document.getElementById("email").value = "";
		document.getElementById("pw").value = "";
		//pop up to notice log in success
		alert("Login Successfully as Admin User");
		//point to next page
		//window.location = ".html";
		return true;
	}
	//not enter email
	else if(email == null || email == ""){
		alert("Please enter your email address");
		return false;
	}
	//not enter password
	else if(password == null || password == ""){
		alert("Please enter your password");
		return false;
	}
	//email and password not match
	else{
		document.getElementById("email").value = "";
		document.getElementById("pw").value = "";
		alert("Login Fail: email and password are not match, plase try again")
		return false;

	}
}