document.addEventListener('DOMContentLoaded', () => {
  // TODO: create and save the date 14days before start the count 
  // * input and save in to storage the event day
  // Date.UTC para poder cargar con numeros el día del evento -> mes del 0-11
  const trunc = (x) => Math.trunc(diffDate / x);
  const sustMillis = (s) => { diffDate = diffDate % s };
  const positiveNumber = (x) => x > 0;

  function timer(msec) {
    let intTime = trunc(msec);
    sustMillis(msec);
    return intTime;
  }

  // TODO: cuando llega a todo con "0" vuelve todos los digitos a 59 -> verificar que cuando sea el utlimo ciclo pare de contar.
  function countDown() {
    let index = remainingTime.length - 1;
    if (gratherIndex != -1) {
      if (remainingTime[index] > 0) {
        remainingTime[index] = remainingTime[index] - 1;
      } else {
        for (index -= 1; remainingTime[index] === 0; index--) {
          remainingTime[index] = 59;
        }
        (remainingTime[index] > 0) ? remainingTime[index] -= 1 : '';
        remainingTime[3] = 59;
      }
    }
    console.log(`${remainingTime[0]} ${remainingTime[1]} ${remainingTime[2]} ${remainingTime[3]}`);
  }

  const eventDay = new Date(Date.UTC(2021, 6, 4, 0, 58, 10));
  const now = new Date();

  let diffDate = eventDay - now;
  let remainingTime = [timer(8.64e7), timer(3.6e6), timer(6e4), timer(1000)]
  let gratherIndex = remainingTime.findIndex(positiveNumber);

  setInterval(countDown, 1000);
})