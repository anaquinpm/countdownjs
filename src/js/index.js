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

  // Parameters in milliseconds
  const dayMill = 8.64e7;
  const hourMill = 3.6e6;
  const minMill = 6e4;
  const secMill = 1000;

  // * Set Countdown
  // Quoted in the README.md file
  const eventDay = new Date();
  eventDay.setTime(eventDay.getTime() + dayMill * 14 + hourMill * 0 + minMill * 0 + secMill * 3)  // 14d:0h:0m:3s

  const now = new Date();
  let diffDate = eventDay - now;
  let remainingTime = [timer(dayMill), timer(hourMill), timer(minMill), timer(secMill)]
  const indexSeg = remainingTime.length - 1;

  const idInterval = setInterval(countDown, 1000);
})