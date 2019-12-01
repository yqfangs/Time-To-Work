'use strict';

const inboxMessages = document.querySelector('#inbox');
inboxMessages.addEventListener("click", removeInboxMessage);

const sidebar = document.querySelector('#sidebar');
window.addEventListener('load', modifySideBar(current_user));

const sentMessage = document.querySelector('#sent');
sentMessage.addEventListener("click", removeSentMessage);

const sendNewMessageButton = document.querySelector('#sendButton');
sendNewMessageButton.addEventListener("click", addSentMessage);

const sentForm = document.querySelector('#sent');


function removeInboxMessage(e){
	e.preventDefault();

	if(e.target.classList.contains('delete')){
		const messageToRemove = e.target.parentElement.parentElement.parentElement;
		inboxMessages.removeChild(messageToRemove);
	}
}

function removeSentMessage(e){
	e.preventDefault();

	if(e.target.classList.contains('delete')){
		const messageToRemove = e.target.parentElement.parentElement.parentElement;
		sentMessage.removeChild(messageToRemove);
	}
}

function addSentMessage(e){
	e.preventDefault();

	if(document.getElementById("name").value === null || document.getElementById("name").value === ""){
		alert("Please enter recipient name");
		return false;
	}
	let recipientName = document.getElementById("name").value;
	if(document.getElementById("email").value === null || document.getElementById("email").value === ""){
		alert("Please enter recipient email");
		return false;
	}
	let recipientEmail = document.getElementById("email").value;
	if(document.getElementById("message").value === null || document.getElementById("message").value === ""){
		alert("You can not sent empty message");
		return false;
	}
	let sentMessage = document.getElementById("message").value;

	//not valid email address
	if(recipientEmail.indexOf('@') === -1){
		document.getElementById("email").value = "";
		alert("Please enter valid email address");
		return false;
	}

	//email and name not match
	if(checkRecipientExist(allEmployees, allEmployers) === 0){
		//clear the input box
		document.getElementById("name").value = "";
		//pop up that password not match
		alert("Name not matched email address your enter, please try again");
		return false;
	}

	//email not exist
	if(checkRecipientExist(allEmployees, allEmployers) === -1){
		document.getElementById("email").value = "";
		document.getElementById("name").value = "";
		alert("Recipient not exist please check")
		return false;
	}

	//add message to sent
	const name = document.querySelector('#name').value;
	const email = document.querySelector('#email').value;
	const message = document.querySelector('#message').value;


    //DOM
	const listGroup = document.createElement('div');
	listGroup.classList.add("list-group");
	const listA = document.createElement('a');
	listA.classList.add("list-group-item");
	listA.classList.add("list-group-item-action");
	listA.classList.add("flex-column");
	listA.classList.add("align-items-start");
	const titleDiv = document.createElement('div');
	titleDiv.classList.add("d-flex");
	titleDiv.classList.add("w-100");
	titleDiv.classList.add("justify-content-between");
	const titleh5 = document.createElement('h5');
	titleh5.classList.add("mb-1");
	const nameTextNode = document.createTextNode("To: " + name + " ");
	const titleSmall = document.createElement('small');
	const emailTextNode = document.createTextNode(email);
	titleSmall.appendChild(emailTextNode);
	titleh5.appendChild(nameTextNode);
	titleh5.appendChild(titleSmall);
	titleDiv.appendChild(titleh5);
	listA.appendChild(titleDiv);
	const messageP = document.createElement('p');
	messageP.classList.add("mb-1");
	const messageTextNode = document.createTextNode(message);
	messageP.appendChild(messageTextNode);
	listA.appendChild(messageP);
	const buttonSmall = document.createElement('small');
	const button = document.createElement('button');
	button.setAttribute("type", "button");
	button.classList.add("btn");
	button.classList.add("btn-secondary");
	button.classList.add("delete");
	const buttonTextNode = document.createTextNode("Delete Message");
	button.appendChild(buttonTextNode);
	buttonSmall.appendChild(button);
	listA.appendChild(buttonSmall);
	listGroup.appendChild(listA);

	console.log(listGroup);
	sentForm.appendChild(listGroup);

	document.getElementById("name").value = "";
	document.getElementById("email").value = "";
	document.getElementById("message").value = "";
	alert("Message Send!");

}


/*
  This function return -1 if the input for email and name are not found on the data;
  return 0 if the email and name not match;
  return 1 if the email and name match;
  Also this function will get data from server, but now we get data from MockData.js
*/
function checkRecipientExist(employeeList, employerList){

	let email = document.getElementById("email").value;
	let name = document.getElementById("name").value;

	for(let i=0; i<employeeList.length;i++){
		if(employeeList[i].email === email && employeeList[i].name !== name){
			return 0;
		}
		if(employeeList[i].email === email && employeeList[i].name === name){
			return 1;
		}
	}
	for(let j=0; j<employerList.length; j++){
		if(employerList[j].email === email && employerList[j].name !== name){
			return 0;
		}
		if(employerList[j].email === email && employerList[j].name === name){
			return 1;
		}
	}
	return -1;
}