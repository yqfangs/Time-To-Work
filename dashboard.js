'use strict';
const log = console.log;

function CheckTotalHour(){
	var total = 0;
	if(document.getElementById("MondayHour").innerText != ""){
		total += parseInt(document.getElementById("MondayHour").innerText)
	}
	if(document.getElementById("TuesdayHour").innerText != ""){
		total += parseInt(document.getElementById("TuesdayHour").innerText)
	}
	if(document.getElementById("WednesdayHour").innerText != ""){
		total += parseInt(document.getElementById("WednesdayHour").innerText)
	}
	if(document.getElementById("ThursdayHour").innerText != ""){
		total += parseInt(document.getElementById("ThursdayHour").innerText)
	}
	if(document.getElementById("FridayHour").innerText != ""){
		total += parseInt(document.getElementById("FridayHour").innerText)
	}
	if(document.getElementById("SaturdayHour").innerText != ""){
		total += parseInt(document.getElementById("SaturdayHour").innerText)
	}
	if(document.getElementById("SundayHour").innerText != ""){
		total += parseInt(document.getElementById("SundayHour").innerText)
	}
	document.write(total + "h");
}