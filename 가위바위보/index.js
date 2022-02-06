//
const comChoiceObject = {
  "✊": 1,
  "✌": 2,
  "🖐": 3,
};

const comChoiceArray = Object.keys(comChoiceObject);
const $comChoice = document.querySelector(".computer");
const $log = document.querySelector(".log");
let win = 0;
let lose = 0;
let draw = 0;

const $rock = document.querySelector(".rock");
const $scissors = document.querySelector(".scissors");
const $paper = document.querySelector(".paper");

let comChoiceLooperIdx = 0;
let comChoiceLooper = setInterval(() => {
  if (comChoiceLooperIdx == 3) comChoiceLooperIdx = 0;
  $comChoice.textContent = comChoiceArray[comChoiceLooperIdx++];
}, 100);
let flag = true;
const handleChoice = (e) => {
  if (flag) {
    clearInterval(comChoiceLooper);
    flag = false;
    setTimeout(() => {
      flag = true;
      comChoiceLooper = setInterval(() => {
        if (comChoiceLooperIdx == 3) comChoiceLooperIdx = 0;
        $comChoice.textContent = comChoiceArray[comChoiceLooperIdx++];
      }, 100);
    }, 1000);

    let myChoice;
    switch (e.target.textContent) {
      case "✊":
        myChoice = 1;
        break;
      case "✌":
        myChoice = 2;
        break;
      case "🖐":
        myChoice = 3;
        break;
      default:
        break;
    }
    let comChoice = comChoiceObject[$comChoice.textContent];
    if (myChoice - comChoice === -1 || myChoice - comChoice === 2) win += 1;
    else if (myChoice - comChoice === -2 || myChoice - comChoice === 1)
      lose += 1;
    else draw += 1;
    $log.textContent = `[승] ${win}  [패] ${lose}  [드로우] ${draw}`;
  }
};
$rock.addEventListener("click", handleChoice);
$scissors.addEventListener("click", handleChoice);
$paper.addEventListener("click", handleChoice);
