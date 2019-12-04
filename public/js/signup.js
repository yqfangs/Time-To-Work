"use strict";

const log = console.log;

const signupButton = document.querySelector("#signupButton");
signupButton.addEventListener("click", checkSignUpValid);

// let currentCompany;
// let newUser;


function checkSignUpValid(){
	//e.preventDefault()

	if(document.getElementById("email").value === null || document.getElementById("email").value === ""){
		alert("Please enter your email address");
		return false;
	}
	let signupemail = document.getElementById("email").value;

	if(checkExists(signupemail)){
		alert("The email is registered in the system, please log in, or use another email.")
		return false
	}

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
	//let position = document.querySelector('#selectPosition').value;

	//email address not valid
	if(signupemail.indexOf('@') === -1){
		document.getElementById("email").value = "";
		alert("Please enter valid email address");
		return false;
	}

	//password not match
	if(signuppassword != confirmpw){
		document.getElementById("pw").value = "";
		document.getElementById("cpw").value = "";
		alert("Please make sure your password and confirm password are matching");
		return false;
	}

}

function checkExists(email){

	log("imhere")
	const url = '/api/employees'

	fetch(url)
	.then((res) => {
        if(res.status === 200){
           	return res.json()
        }else{
            return Promise.reject()
        }
    })
    .then((json) =>{
    	const employees = json.filter((employee)=> employee.email === email)
    	if(employees.length > 0){
    		return true
    	}
    	return false
    })
    .catch((error)=>{
    	log(error)
    })
}