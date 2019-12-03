'use strict';

//load message on inbox from db

const inboxMessages = document.querySelector('#inbox');
inboxMessages.addEventListener("click", removeInboxMessage);
inboxMessages.addEventListener("click", declineTrade);
inboxMessages.addEventListener("click", accpetTrade);
window.addEventListener("load", loadMessage);

let currentUser = null
const sidebar = document.querySelector('#sidebar');
window.addEventListener("load", modifySideBar(currentUser));

const sentMessage = document.querySelector('#sent');
sentMessage.addEventListener("click", removeSentMessage);

const sendNewMessageButton = document.querySelector('#sendButton');
sendNewMessageButton.addEventListener("click", addSentMessage);

const sentForm = document.querySelector('#sent');

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');


function loadMessage(e){
  // load inbox message from server
    const url = '/api/message/'
    fetch(url)
    .then((res) => {
        if (res.status === 200) {
            return res.json()
        }else{
            alert('could not get user message')
        }
    })
    .then((json) => {
    	//modify side bar
        currentUser = convertToEmployee(json);
        modifySideBar(currentUser);
        log(currentUser)

        //display message DOM
        if(currentUser.messages.length === 0){
        	//do nothing
        	return
        }else{
	        const message = currentUser.messages
	        for(var i = 0; i < message.length; i++){
	        	const currentMessage = message[i];
	        	//regular message display
	        	if(currentMessage.isTrade === false){
	        		//add to inbox
	        		if(currentMessage.to === currentUser.email){

						const email = currentMessage.from;
						const message = currentMessage.message;

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
						titleh5.setAttribute("id", "inBoxFromEmail");
						const nameTextNode = document.createTextNode("From: ");
						const emailTextNode = document.createTextNode(email);
						titleh5.appendChild(nameTextNode);
						titleh5.appendChild(emailTextNode);
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

						inboxMessages.appendChild(listGroup);
	        		}
	        		//add to sent
	        		else if(currentMessage.from === currentUser.email){

						const email = currentMessage.to;
						const message = currentMessage.message;

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
						titleh5.setAttribute("id", "sendBoxToEmail");
						titleh5.setAttribute("value", email);
						const nameTextNode = document.createTextNode("To: ");
						const emailTextNode = document.createTextNode(email);
						titleh5.appendChild(nameTextNode);
						titleh5.appendChild(emailTextNode);
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

						sentMessage.appendChild(listGroup);

	        		}
	        	} 
	        	//trade shift message 
	        	else if(currentMessage.isTrade === true){
	        		//add to inbox
	        		if(currentMessage.to === currentUser.email){
	        			const email = currentMessage.from;
	        			const startTime = currentMessage.tradeTime.start;
	        			const endTime = currentMessage.tradeTime.end;
	        			let dateTime = "";
	        			log(currentMessage.tradeWeekDay)
	        			if(currentMessage.tradeWeekDay === 0){
	        				dateTime = "Monday"
	        			}
	        			else if(currentMessage.tradeWeekDay === 1){
	        				dateTime = "Tuesday"
	        			}
	        			else if(currentMessage.tradeWeekDay === 2){
	        				dateTime = "Wednesday"
	        			}
	        			else if(currentMessage.tradeWeekDay === 3){
	        				dateTime = "Thursday"
	        			}
	        			else if(currentMessage.tradeWeekDay === 4){
	        				dateTime = "Friday"
	        			}
	        			else if(currentMessage.tradeWeekDay === 5){
	        				dateTime = "Saturday"
	        			}
	        			else if(currentMessage.tradeWeekDay === 6){
	        				dateTime = "Sunday"
	        			}

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
						titleh5.setAttribute("id", "inBoxFromEmailTrade");
						const nameTextNode = document.createTextNode("From: ");
						const emailTextNode = document.createTextNode(email);
						titleh5.appendChild(nameTextNode);
						titleh5.appendChild(emailTextNode);
						titleDiv.appendChild(titleh5);
						listA.appendChild(titleDiv);
						const messageP = document.createElement('p');
						messageP.classList.add("mb-1");
						const messageTextNode = document.createTextNode("Changing shifts request:[From: " + startTime + ", To: " + endTime + ", On: " + dateTime + "]");
						messageP.appendChild(messageTextNode);
						listA.appendChild(messageP);
						const buttonSmall = document.createElement('small');
						const button = document.createElement('button');
						button.setAttribute("type", "button");
						button.classList.add("btn");
						button.classList.add("btn-success");
						button.classList.add("accept");
						const buttonTextNode = document.createTextNode("Accept");
						button.appendChild(buttonTextNode);
						buttonSmall.appendChild(button);
						const buttonSmall1 = document.createElement('small');
						const button1 = document.createElement('button');
						button1.setAttribute("type", "button");
						button1.classList.add("btn");
						button1.classList.add("btn-secondary");
						button1.classList.add("decline");
						const buttonTextNode1 = document.createTextNode("Decline");
						button1.appendChild(buttonTextNode1);
						buttonSmall1.appendChild(button1);

						listA.appendChild(buttonSmall);
						listA.appendChild(buttonSmall1);
						listGroup.appendChild(listA);

						inboxMessages.appendChild(listGroup);
	        		}
	        		//add to sent
	        		else if(currentMessage.from === currentUser.email){
	        			const email = currentMessage.to;
	        			const startTime = currentMessage.tradeTime.start;
	        			const endTime = currentMessage.tradeTime.end;
	        			let dateTime = "";
	        			log(currentMessage.tradeWeekDay)
	        			if(currentMessage.tradeWeekDay === 0){
	        				dateTime = "Monday"
	        			}
	        			else if(currentMessage.tradeWeekDay === 1){
	        				dateTime = "Tuesday"
	        			}
	        			else if(currentMessage.tradeWeekDay === 2){
	        				dateTime = "Wednesday"
	        			}
	        			else if(currentMessage.tradeWeekDay === 3){
	        				dateTime = "Thursday"
	        			}
	        			else if(currentMessage.tradeWeekDay === 4){
	        				dateTime = "Friday"
	        			}
	        			else if(currentMessage.tradeWeekDay === 5){
	        				dateTime = "Saturday"
	        			}
	        			else if(currentMessage.tradeWeekDay === 6){
	        				dateTime = "Sunday"
	        			}

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
						titleh5.setAttribute("id", "sentBoxToEmailTrade");
						const nameTextNode = document.createTextNode("To: ");
						const emailTextNode = document.createTextNode(email);
						titleh5.appendChild(nameTextNode);
						titleh5.appendChild(emailTextNode);
						titleDiv.appendChild(titleh5);
						listA.appendChild(titleDiv);
						const messageP = document.createElement('p');
						messageP.classList.add("mb-1");
						const messageTextNode = document.createTextNode("Changing shifts request:[From: " + startTime + ", To: " + endTime + ", On: " + dateTime + "]");
						messageP.appendChild(messageTextNode);
						listA.appendChild(messageP);
						// const buttonSmall = document.createElement('small');
						// const button = document.createElement('button');
						// button.setAttribute("type", "button");
						// button.classList.add("btn");
						// button.classList.add("btn-success");
						// button.classList.add("accept");
						// const buttonTextNode = document.createTextNode("Accept");
						// button.appendChild(buttonTextNode);
						// buttonSmall.appendChild(button);
						// const buttonSmall1 = document.createElement('small');
						// const button1 = document.createElement('button');
						// button1.setAttribute("type", "button");
						// button1.classList.add("btn");
						// button1.classList.add("btn-secondary");
						// button1.classList.add("decline");
						// const buttonTextNode1 = document.createTextNode("Decline");
						// button1.appendChild(buttonTextNode1);
						// buttonSmall1.appendChild(button1);

						// listA.appendChild(buttonSmall);
						// listA.appendChild(buttonSmall1);
						listGroup.appendChild(listA);

						sentMessage.appendChild(listGroup);
	        		}
	        	}
	        }
        }

    }).catch((error) => {
        log(error)
    })
}


function removeInboxMessage(e){
	e.preventDefault();

	if(e.target.classList.contains('delete')){
		//DOM remove
		const messageToRemove = e.target.parentElement.parentElement.parentElement;
		const title = document.getElementById("inBoxFromEmail").textContent;
		const from_email = title.slice(6, title.length);
		inboxMessages.removeChild(messageToRemove);

		//DB remove
		const current_email = currentUser.email;
		const url = '/api/message/employees/inbox/' + current_email + '/' + from_email;

        const request = new Request(url, {method: 'delete',         
        	headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },});

        fetch(request).then(alert("Deleted!")).catch((error) => log(error))

	}
}

function removeSentMessage(e){
	e.preventDefault();

	if(e.target.classList.contains('delete')){
		//DOM remove
		const messageToRemove = e.target.parentElement.parentElement.parentElement;
		const title = document.getElementById("sendBoxToEmail").textContent;
		const to_email = title.slice(4, title.length);
		sentMessage.removeChild(messageToRemove);

		//DB remove
		const current_email = currentUser.email;
		const url = '/api/message/employees/sent/' + current_email + '/' + to_email;

        const request = new Request(url, {method: 'delete',         
        	headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },});

        fetch(request).then(alert("Deleted!")).catch((error) => log(error))
	}
}

function declineTrade(e){
	e.preventDefault();

	if(e.target.classList.contains('decline')){
		//DOM remove
		const messageToRemove = e.target.parentElement.parentElement.parentElement;
		const title = document.getElementById("inBoxFromEmailTrade").textContent;
		const from_email = title.slice(6, title.length);
		inboxMessages.removeChild(messageToRemove);

		//DB remove
		const current_email = currentUser.email;
		const url = '/api/message/employees/inbox/' + current_email + '/' + from_email;

        const request = new Request(url, {method: 'delete',         
        	headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },});

        fetch(request).then(alert("Declined the trading request!")).catch((error) => log(error))
	}
}

function accpetTrade(e){
	e.preventDefault();

	if(e.target.classList.contains('accpet')){
		//DOM remove
		const messageToRemove = e.target.parentElement.parentElement.parentElement;
		const title = document.getElementById("sendBoxToEmail").textContent;
		const to_email = title.slice(4, title.length);
		sentMessage.removeChild(messageToRemove);

		//DB remove
		const current_email = currentUser.email;
		const url = '/api/message/employees/sent/' + current_email + '/' + to_email;

        const request = new Request(url, {method: 'delete',         
        	headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },});

        //fetch(request).then(alert("Deleted!")).catch((error) => log(error))
	}
}

function addSentMessage(e){
	e.preventDefault();

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

	// //email and name not match
	// if(checkRecipientExist(allEmployees, allEmployers) === 0){
	// 	//clear the input box
	// 	document.getElementById("name").value = "";
	// 	//pop up that password not match
	// 	alert("Name not matched email address your enter, please try again");
	// 	return false;
	// }

	// //email not exist
	// if(checkRecipientExist(allEmployees, allEmployers) === -1){
	// 	document.getElementById("email").value = "";
	// 	document.getElementById("name").value = "";
	// 	alert("Recipient not exist please check")
	// 	return false;
	// }

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
		const nameTextNode = document.createTextNode("To: ");
		const emailTextNode = document.createTextNode(email);
		titleh5.appendChild(nameTextNode);
		titleh5.appendChild(emailTextNode);
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

		// now let's send to server

		// the URL for the request
	    const url = '/api/message'

	    // The data we are going to send in our request
	    let data = {
	      from: currentUser.email,
	      to: email,
	      name: name,
	      message: message,
	      isTrade: false

	    }

	    // Create our request constructor with all the parameters we need
	    const request = new Request(url, {
	      method: 'PATCH',
	      body: JSON.stringify(data),
	      headers: {
	            'Accept': 'application/json, text/plain, */*',
	            'Content-Type': 'application/json'
	        },
	    })

	    // Send the request with fetch()
	    fetch(request)
	    .then((res) => {
	      if (res.status === 200) {
		    document.getElementById("name").value = "";
			document.getElementById("email").value = "";
			document.getElementById("message").value = "";
	        alert("Message Send!")
	      }
	      else {
	        return Promise.reject()
	      }
	    })
	    .catch((error) => {
	      alert('sending message is unsuccessful.')
	    })
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
