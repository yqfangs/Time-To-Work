"use strict";

const log = console.log;

function forgetPW(){
	var email = document.getElementById("email").value;
	if(email == null || email == ""){
		alert("Enter your email first")
		return false;
	}
	alert(`Password reset request already sent to your email : ${email}`)
	document.getElementById("email").value = "";
	return true;
}
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
		window.location = "admin.html";
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