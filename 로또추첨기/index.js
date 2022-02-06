// 무작위 숫자 7개 뽑기
const allNumbers = Array(45)
  .fill()
  .map((el, i) => i + 1);
const randomNumbers = [];
for (let _ = 0; _ < 7; _++) {
  const index = Math.floor(Math.random() * allNumbers.length); // 0 ~ 8
  randomNumbers.push(allNumbers[index]);
  allNumbers.splice(index, 1);
}
const ballNumbers = randomNumbers.slice(0, 6).sort((a, b) => a - b);

// 숫자 배치
const $ballsContainer = document.querySelector(".ballsContainer");
const $bonusContainer = document.querySelector(".bonusContainer");
const handleColors = (i) => {
  if (i >= 40) return "purple";
  else if (i >= 30) return "wheat";
  else if (i >= 20) return "red";
  else if (i >= 10) return "green";
  else return "gray";
};

const makeBall = (i, array) => {
  const $ball = document.createElement("div");
  $ball.textContent = array[i];
  $ball.style.backgroundColor = handleColors(array[i]);
  return $ball;
};
for (let i = 0; i < 7; i++) {
  setTimeout(() => {
    if (i < 6) $ballsContainer.append(makeBall(i, ballNumbers));
    else $bonusContainer.append(makeBall(i, randomNumbers));
  }, 500 * i);
}
