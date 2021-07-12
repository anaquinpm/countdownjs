window.$ = document.querySelector.bind(document);

document.addEventListener('DOMContentLoaded', () => {
  const timeDom = [$('.main__day'), $('.main__hour'), $('.main__min'), $('.main__sec')];

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
        (index===1) ? remainingTime[index] = 23 : remainingTime[index] = 59;
      }
      remainingTime[index] -= 1;
      remainingTime[indexSeg] = 59;
    } else {
      clearInterval(idInterval);
    }
  }

  function countDown() {
    (remainingTime[indexSeg] > 0) ? remainingTime[indexSeg] -= 1 : sustNextDigit(indexSeg);
    timeDom.forEach((digit, i) =>
      (remainingTime[i] > 9) ? digit.innerHTML = remainingTime[i] : digit.innerHTML = '0' + remainingTime[i]);
  }
  //
  // TODO: crear modal para cargar los datos o resetear el existente -> Borrar pruebas de tiempo
  // TODO: input and save in to storage the event day -> LocalStorage

  // Cargado de la fecha mediante prompt
  // const promptFecha = prompt('Ingrese la fecha del evento: AAAA-MM-DD', 'AAAA-MM-DD').split('-');
  // const promptHora = prompt('Ingrese el horarios del evento: HH-MM', 'HH-MM').split('-');
  // let datePrompt = [...promptFecha, ... promptHora];
  // // !Date.UTC para poder cargar con numeros el día del evento -> mes del 0-11
  // datePrompt[1]--;
  // const eventDay = new Date(...datePrompt);



  // * Pruebas de tiempo
  const eventDay = new Date();
  eventDay.setTime(eventDay.getTime() + 8.64e7 * 14 + 1000 * 3)  // 14d:0h:0m:3s
  // eventDay.setTime(eventDay.getTime() + 3.6e6*1 + 1000*3)    // 1h:0m:3s
  // eventDay.setTime(eventDay.getTime() + 1000 * 3)            // 3seg

  const now = new Date();
  let diffDate = eventDay - now;
  let remainingTime = [timer(8.64e7), timer(3.6e6), timer(6e4), timer(1000)]
  const indexSeg = remainingTime.length - 1;

  const idInterval = setInterval(countDown, 1000);
})