"use strict";

const log = console.log;

const loginButton = document.querySelector("#loginButton");
const forgetPWlink = document.querySelector("#forgetPWlink");

loginButton.addEventListener("click", checkValid);
forgetPWlink.addEventListener("click", forgetPW);

let currentUser;


/*
  This function return -1 if the input for email and password is empty;
  return 0 if the email and password not match;
  return 1 if the email and password match;
  Also this function will get data from server, but now we get data from MockData.js
*/
function checkValid(employeeList, employerList){

	if(document.getElementById("email").value === null || document.getElementById("email").value === ""){
		alert("Please enter your email address");
		return -1;
	}
	if(document.getElementById("pw").value === null || document.getElementById("pw").value === ""){
		alert("Please enter your password");
		return -1;
	}

	// let email = document.getElementById("email").value;
	// let password = document.getElementById("pw").value;

	// for(let i=0; i<employeeList.length;i++){
	// 	if(employeeList[i].email === email && employeeList[i].password !== password){
	// 		return 0;
	// 	}
	// 	if(employeeList[i].email === email && employeeList[i].password === password){
	// 		currentUser = employeeList[i];
	// 		return 1;
	// 	}
	// }
	// for(let j=0; j<employerList.length; j++){
	// 	if(employerList[j].email === email && employerList[j].password !== password){
	// 		return 0;
	// 	}
	// 	if(employerList[j].email === email && employerList[j].password === password){
	// 		currentUser = employerList[j]
	// 		return 1;
	// 	}
	// }
	// return -1;
}

// function checkEmailPwMatch(e){
// 	e.preventDefault()

// 	//not enter email
// 	if(document.getElementById("email").value === null || document.getElementById("email").value === ""){
// 		alert("Please enter your email address");
// 		return false;
// 	}

// 	//not enter password
// 	if(document.getElementById("pw").value === null || document.getElementById("pw").value === ""){
// 		alert("Please enter your password");
// 		return false;
// 	}

// 	let email = document.getElementById("email").value;
// 	let password = document.getElementById("pw").value;

// 	//correcy email and password for admin
// 	if(email === "admin" && password === "admin"){
// 		//clear the input box
// 		document.getElementById("email").value = "";
// 		document.getElementById("pw").value = "";
// 		//pop up to notice log in success
// 		alert("Login Successfully as Admin User");
// 		//point to next page
// 		window.location = "admin.html";
// 		return true;
// 	}

// 	//correcy email and password for user
// 	if(checkExist(allEmployees, allEmployers) === 1){
// 		//clear the input box
// 		document.getElementById("email").value = "";
// 		document.getElementById("pw").value = "";
// 		//pop up to notice log in success
// 		let userType;
// 		if(currentUser instanceof Employee){
// 			userType = "Employee";
// 		}
// 		if(currentUser instanceof Employer){
// 			userType = "Employer";
// 		}
// 		alert(`Login Successfully as ${userType}.\nName: ${currentUser.name}\nEmail: ${currentUser.email}\nuserID: ${currentUser.userID}\nCompany: ${currentUser.companyName}`);
// 		//point to next page
// 		window.location = "dashboard.html";
// 		return true;
// 	}
// 	//password not match
// 	else if(checkExist(allEmployees, allEmployers) === 0){
// 		//clear the input box
// 		document.getElementById("pw").value = "";
// 		//pop up that password not match
// 		alert("Login Fail: Email and password are not match, plase try again");
// 		return false;
// 	}

// 	//email and password not match
// 	else{
// 		document.getElementById("email").value = "";
// 		document.getElementById("pw").value = "";
// 		alert("Login Fail: Account not existing, plase try again")
// 		return false;
// 	}
// }

function forgetPW(e){
	e.preventDefault()

	if(document.getElementById("email").value === null || document.getElementById("email").value === ""){
		alert("Enter your email first")
		return false;
	}

	let email = document.getElementById("email").value;

	alert(`Password reset request already sent to your email : ${email}`)
	document.getElementById("email").value = "";
	return true;
}