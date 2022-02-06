const $screen = document.querySelector(".screen");
const $timeDiff = document.querySelector(".timeDiff");
const $log = document.querySelector(".log");
const recordArray = [];

let timeout;
let startTime, endTime, timeDiff;
let flag = true;
const handleScreenClick = (e) => {
  if (flag === false) return;
  if ($screen.style.backgroundColor === "blue") {
    $screen.style.backgroundColor = "tomato";
    $screen.textContent = "대기";
    timeout = setTimeout(() => {
      $screen.style.backgroundColor = "green";
      $screen.textContent = "클릭하세요!";
      // 타이머 시작
      startTime = new Date().getTime() / 1000;
    }, Math.floor(Math.random() * 2000) + 2000);
  } else if ($screen.style.backgroundColor === "tomato") {
    $screen.textContent = `너무 빨랐습니다!`;
    clearTimeout(timeout);
    setTimeout(init, 2000);
  } else if ($screen.style.backgroundColor === "green") {
    // 타이머 종료
    flag = false;
    endTime = new Date().getTime() / 1000;
    timeDiff =
      Math.round((endTime - startTime + Number.EPSILON) * 10000) / 10000;
    $screen.innerHTML = `성공!<br>${timeDiff}초 만에 성공했습니다.`;
    recordArray.push(timeDiff);

    let averageSpeed =
      recordArray.reduce((accm, curr) => accm + curr) / recordArray.length;
    $log.textContent = `평균 속도: ${averageSpeed}초`;
    setTimeout(init, 3000);
  }
};
const init = () => {
  $screen.style.backgroundColor = "blue";
  $screen.addEventListener("click", handleScreenClick);
  $screen.textContent = "시작";
  startTime = 0;
  endTime = 0;
  flag = true;
};
init();
