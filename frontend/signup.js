"use strict";

const log = console.log;

const signupButton = document.querySelector("#signupButton");
signupButton.addEventListener("click", checkSignUpValid);

let currentCompany;
let newUser;


function checkSignUpValid(e){
	e.preventDefault()

	if(document.getElementById("email").value === null || document.getElementById("email").value === ""){
		alert("Please enter your email address");
		return false;
	}
	let signupemail = document.getElementById("email").value;

	if(document.getElementById("pw").value === null || document.getElementById("pw").value === ""){
		alert("Please enter your password");
		return false;
	}
	let signuppassword = document.getElementById("pw").value;

	if(document.getElementById("cpw").value === null || document.getElementById("cpw").value === ""){
		alert("Please enter your confirm password");
		return false;
	}
	let confirmpw = document.getElementById("cpw").value;

	if(document.getElementById("name").value === null || document.getElementById("name").value === ""){
		alert("Please enter your name");
		return false;
	}
	let name = document.getElementById("name").value;

	if(document.getElementById("phone") === null || document.getElementById("phone") === ""){
		alert("Please enter your phone number");
		return false;
	}
	let phone = document.getElementById("phone").value;

	if(document.getElementById("company").value === null || document.getElementById("company").value === ""){
		alert("Please enter your company");
		return false;
	}
	let company = document.getElementById("company").value;

	if(document.querySelector('#selectPosition').value === "none"){
		alert("Please select your position");
		return false;
	}
	let position = document.querySelector('#selectPosition').value;

	//company not exist
	if(!checkCompanyExist(allCompanies)){
		document.getElementById("company").value = "";
		alert("Please enter corret company, the company your enter is not exist")
		return false;
	}

	//password not match
	if(signuppassword != confirmpw){
		document.getElementById("pw").value = "";
		document.getElementById("cpw").value = "";
		alert("Please make sure your password and confirm password are matching");
		return false;
	}

	// //email address not valid
	// if(signupemail.indexOf('@') === -1){
	// 	document.getElementById("email").value = "";
	// 	alert("Please enter valid email address");
	// 	return false;
	// }

	// newUser = new Employee(name, signuppassword, signupemail, position, phone, company);
	// allEmployees.push(newUser)
	//otherwise is valide sign up
	alert(`Sign Up Successfully as Employee.\nName: ${newUser.name}\nEmail: ${newUser.email}\nuserID: ${newUser.userID}\nCompany: ${newUser.companyName}\nPosition: ${newUser.position}`)
	//point to the log in page
	//window.location = "index.html";
}


/*
  This function return false if user want to sign up and enter the company name which 
  is not on the company list; and return true if the company is exists.
  Also this function will get data companyList from server, but now we get data from MockData.js
*/
function checkCompanyExist(companyList){

	if(document.getElementById("company").value === null || document.getElementById("company").value === ""){
		return false;
	}

	let company = document.getElementById("company").value
	for(let i=0; i<companyList.length; i++){
		if(companyList[i].name === company){
			currentCompany = companyList[i];
			return true;
		}
	}

	return false;
}