// 랜덤 정수 4자리 정답값 부여
const randomNumberInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
let answer = "";
while (answer.length !== 4) {
  let random = String(randomNumberInRange(1, 9));
  if (answer.indexOf(random) == -1) {
    answer += random;
  }
}
// 정답값 표시 ( 실제 플레이 시 이 부분은 주석처리 )
const $answer = document.querySelector(".answer");
$answer.textContent = answer;

// 기회 부여
const $opertunity = document.querySelector(".opertunity");
let opertunity = parseInt($opertunity.textContent); // 10

// 숫자를 입력
let inputValue = "";
const $input = document.querySelector("input");
const handleInput = (e) => {
  inputValue = e.target.value;
};
$input.addEventListener("input", handleInput);

// 입력체크 함수
const inputCheck = (ipt) => {
  if (ipt.length !== 4 || !$input.value) {
    return false;
  }
  let iptCheck = "";
  for (let i = 0; i < ipt.length; i++) {
    if (ipt.indexOf(ipt[i]) == i) iptCheck += ipt[i];
  }
  if (ipt === iptCheck) return true;
  else return false;
};
// strike수, ball수, 진행상태
const $isProgress = document.querySelector(".isProgress");
const $strikeCount = document.querySelector(".strikeCount");
const $ballCount = document.querySelector(".ballCount");
// 버튼 시작
const $btn = document.querySelector("button");
const handleButtonClick = () => {
  let strike = 0;
  let ball = 0;
  if (!inputCheck(inputValue)) {
    alert("4자리를 입력하거나 중복되지 않는 4자리를 입력하세요");
    $input.value = "";
    return;
  }
  if (inputValue === answer) {
    $isProgress.textContent = "HOME RUN";
    return;
  }
  // 비교 시작
  for (let i = 0; i < 4; i++) {
    if (answer.indexOf(inputValue[i]) !== -1 && inputValue[i] == answer[i]) {
      strike += 1;
    } else if (answer.indexOf(inputValue[i]) !== -1) {
      ball += 1;
    }
  }
  $strikeCount.textContent = strike;
  $ballCount.textContent = ball;
  if (strike === 0 && ball === 0) $isProgress.textContent = "OUT";
  else $isProgress.textContent = "NOT OUT";
  $input.value = "";
  $input.focus();
  $opertunity.textContent = opertunity -= 1;

  if (opertunity < 0) {
    $opertunity.textContent = "기회 모두 소진";
    alert("기회 모두 소진");
    return;
  }
};
$btn.addEventListener("click", handleButtonClick);
