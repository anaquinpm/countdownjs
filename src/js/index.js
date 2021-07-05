document.addEventListener('DOMContentLoaded', () => {
  // TODO: input and save in to storage the event day
  const trunc = (x) => Math.trunc(diffDate / x);
  const sustMillis = (s) => { diffDate = diffDate % s };
  const positiveNumber = (x) => x > 0;
  
  function timer(milliseconds) {
    let intTime = trunc(milliseconds);
    sustMillis(milliseconds);
    return intTime;
  }
  
  function sustNextDigit(index) {
    let gratherIndex = remainingTime.findIndex(positiveNumber);
    if (gratherIndex != -1) {
      for (index -= 1; remainingTime[index] === 0; index--) {
        remainingTime[index] = 59;
      }
      remainingTime[index] -= 1;
      remainingTime[indexSeg] = 59;
    } else {
      clearInterval(idInterval);
    }
  }
  
  function countDown() {
    (remainingTime[indexSeg] > 0) ? remainingTime[indexSeg] -= 1 : sustNextDigit(indexSeg);
    
    console.log(`${remainingTime[0]} ${remainingTime[1]} ${remainingTime[2]} ${remainingTime[3]}`);
  }
  
  // Seteo manual de tiempo para el contador
  // !Date.UTC para poder cargar con numeros el día del evento -> mes del 0-11
  // const eventDay = new Date(Date.UTC(2021, 6, 6, 0, 58, 10));  //para seteo manual

  // * Pruebas de tiempo
  const eventDay = new Date();
  // eventDay.setTime(eventDay.getTime() + 8.64e7*14 + 1000*3)  // 14d:0h:0m:3s
  // eventDay.setTime(eventDay.getTime() + 3.6e6*1 + 1000*3)    // 1h:0m:3s
  eventDay.setTime(eventDay.getTime() + 1000 * 3)            // 3seg

  const now = new Date();

  let idInterval;
  let diffDate = eventDay - now;
  let remainingTime = [timer(8.64e7), timer(3.6e6), timer(6e4), timer(1000)]
  let indexSeg = remainingTime.length - 1;

  idInterval = setInterval(countDown, 1000);
})