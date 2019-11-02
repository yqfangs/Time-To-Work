'use strict';

function modifySideBar(user){
  console.log('imhere')
  if(user instanceof Employee){
    console.log('employee');
    const schedule = document.querySelector('#scheduling')
    const scheduleA = schedule.firstElementChild
    scheduleA.removeAttribute('href');
    schedule.className = 'disabled';
  }else if(user instanceof Employer){
    console.log('employer');
    const time = document.querySelector('#timeavail');
    const timeA = time.firstElementChild
    timeA.removeAttribute('href');
    time.className = 'disabled';
  }

}