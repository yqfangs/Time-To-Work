'use strict';

function modifySideBar(user){
  if(user instanceof Employee){
    const schedule = document.querySelector('#scheduling')
    const scheduleA = schedule.firstElementChild
    scheduleA.removeAttribute('href');
    schedule.className = 'disabled';

  }else if(user instanceof Employer){
    
    const time = document.querySelector('#timeavail');
    const timeA = time.firstElementChild
    timeA.removeAttribute('href');
    time.className = 'disabled';

    const trade = document.querySelector('#tradeshift');
    const tradeA = trade.firstElementChild
    tradeA.removeAttribute('href');
    trade.className = 'disabled';

        const message = document.querySelector('#message');
    const messageA = message.firstElementChild;
    messageA.removeAttribute('href');
    message.className = 'disabled';
  }

}