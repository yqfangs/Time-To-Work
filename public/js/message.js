'use strict';

//load message on inbox from db
window.addEventListener("load", loadMessage);

const inboxMessages = document.querySelector('#inbox');
inboxMessages.addEventListener("click", removeInboxMessage);
inboxMessages.addEventListener("click", declineTrade);
inboxMessages.addEventListener("click", acceptTrade);

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
						messageP.setAttribute("id", "inBoxRugularMes");
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
						const nameTextNode = document.createTextNode("To: ");
						const emailTextNode = document.createTextNode(email);
						titleh5.appendChild(nameTextNode);
						titleh5.appendChild(emailTextNode);
						titleDiv.appendChild(titleh5);
						listA.appendChild(titleDiv);
						const messageP = document.createElement('p');
						messageP.classList.add("mb-1");
						messageP.setAttribute("id", "sendBoxRugularMes");
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
						messageP.setAttribute("id", "inBoxTradeMes");
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

						const trade_message = document.getElementById("inBoxTradeMes").textContent;
						currentMessage.message = trade_message
	        		}
	        		//add to sent
	        		else if(currentMessage.from === currentUser.email){
	        			const email = currentMessage.to;
	        			const startTime = currentMessage.tradeTime.start;
	        			const endTime = currentMessage.tradeTime.end;
	        			let dateTime = "";
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
						messageP.setAttribute("id", "sentBoxTradeMes");
						const messageTextNode = document.createTextNode("Changing shifts request:[From: " + startTime + ", To: " + endTime + ", On: " + dateTime + "]");
						messageP.appendChild(messageTextNode);
						listA.appendChild(messageP);
						//<span class="badge badge-primary">Waiting for response</span>
						//<span class="badge badge-success">Accpeted</span>
						//<span class="badge badge-secondary">Declined</span>
						const span = document.createElement('span');
						span.classList.add("badge")
						let badgeTextNode = document.createTextNode("");
						if(currentMessage.tradeResponse === 'W'){
							span.classList.add("badge-primary")
							badgeTextNode = document.createTextNode("Waiting for response");
						}
						if(currentMessage.tradeResponse === 'A'){
							span.classList.add("badge-success")
							badgeTextNode = document.createTextNode("Accpetec");
						}
						if(currentMessage.tradeResponse === 'D'){
							span.classList.add("badge-secondary")
							badgeTextNode = document.createTextNode("Declined");
						}
						span.appendChild(badgeTextNode);
						listA.appendChild(span);
						listGroup.appendChild(listA);

						sentMessage.appendChild(listGroup);

						const trade_message = document.getElementById("sentBoxTradeMes").textContent;
						currentMessage.message = trade_message
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
		const message = document.getElementById("inBoxRugularMes").textContent;
		inboxMessages.removeChild(messageToRemove);

		//DB remove
		const current_email = currentUser.email;
		const url = '/api/message/employees/inbox/' + current_email + '/' + from_email + '/' + message;

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
		const message = document.getElementById("sendBoxRugularMes").textContent;
		sentMessage.removeChild(messageToRemove);

		//DB remove
		const current_email = currentUser.email;
		const url = '/api/message/employees/sent/' + current_email + '/' + to_email + '/' + message;

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
		const message = document.getElementById("inBoxTradeMes").textContent;
		inboxMessages.removeChild(messageToRemove);

		//DB remove
		const current_email = currentUser.email;
		const url = '/api/message/employees/inbox/trade/decline/' + current_email + '/' + from_email + '/' + message;

        const request = new Request(url, {method: 'delete',         
        	headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },});

        fetch(request).then(alert("Declined the trading request!")).catch((error) => log(error))
	}
}

function acceptTrade(e){
	e.preventDefault();

	if(e.target.classList.contains('accept')){
		//DOM remove
		const messageToRemove = e.target.parentElement.parentElement.parentElement;
		const title = document.getElementById("inBoxFromEmailTrade").textContent;
		const from_email = title.slice(6, title.length);
		const message = document.getElementById("inBoxTradeMes").textContent;
		inboxMessages.removeChild(messageToRemove);

		//DB remove
		const current_email = currentUser.email;
		const url = '/api/message/employees/inbox/trade/accept/' + current_email + '/' + from_email + '/' + message;

        const request = new Request(url, {method: 'delete',         
        	headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },});

        fetch(request).then(alert("Accept the trading request!")).catch((error) => log(error))
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

	if(recipientEmail === currentUser.email){
		document.getElementById("email").value = "";
		alert("You can not sent message to yourself");
		return false;
	}

	// if(!checkEmailExist(recipientEmail)){
	// 	log(checkEmailExist(recipientEmail))
	// 	document.getElementById("email").value = "";
	// 	alert("Employee not exist by the email your enter");
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
		titleh5.setAttribute("id", "sendBoxToEmail");
		const nameTextNode = document.createTextNode("To: ");
		const emailTextNode = document.createTextNode(email);
		titleh5.appendChild(nameTextNode);
		titleh5.appendChild(emailTextNode);
		titleDiv.appendChild(titleh5);
		listA.appendChild(titleDiv);
		const messageP = document.createElement('p');
		messageP.classList.add("mb-1");
		messageP.setAttribute("id", "sendBoxRugularMes");
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

		sentForm.appendChild(listGroup);

		// now let's send to server

		// the URL for the request
	    const url = '/api/message/employees/newRegularMessage'

	    // The data we are going to send in our request
	    let data = {
	      from: currentUser.email,
	      to: email,
	      message: message,
	    }

	    // Create our request constructor with all the parameters we need
	    const request = new Request(url, {
	      method: 'post',
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
	      	document.getElementById("messageText").value = "";
			document.getElementById("email").value = "";
	        alert("Message Send!")
	      }
	      else {
	        return Promise.reject()
	      }
	    }).catch((error) => {log(error)})

	    return true;
}

function checkEmailExist(rec_email) {
	const url = '/api/message/employees/';
	fetch(url).then((result) => {
		if(result.status === 200){
			return result.json()
		}else{
			log('error')
		}
	}).then((json) => {
		const result = json.filter(d => {d.email === rec_email ; log(d.email)})
		log(result)
		return(result)
	}).catch((error) => {log(error)})
}

