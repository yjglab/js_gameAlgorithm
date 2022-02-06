const $screen = document.querySelector(".screen");
const $timeDiff = document.querySelector(".timeDiff");

const numArray = Array(4)
  .fill()
  .map((v, i) => i + 1);

let timeout;
let startTime, endTime, timeDiff;
let flag = true;
const handleScreenClick = (e) => {
  if (flag === false) return;
  if ($screen.style.backgroundColor === "blue") {
    $screen.style.backgroundColor = "tomato";
    $screen.textContent = "대기";
    const randomTime = numArray[Math.floor(Math.random() * numArray.length)];
    timeout = setTimeout(() => {
      $screen.style.backgroundColor = "green";
      $screen.textContent = "클릭하세요!";
      // 타이머 시작
      startTime = new Date().getTime() / 1000;
    }, randomTime * 1000);
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
