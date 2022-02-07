const spaceArray = [];
for (let _ = 0; _ < 3; _++) {
  spaceArray.push(Array(3));
}
const $items = document.querySelectorAll(".item");
let itemIndex = 0;
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    spaceArray[i][j] = $items[itemIndex];
    itemIndex += 1;
  }
}

let com = "X";
let my = "O";
let turn = 1; // 1: my, 2: com
const $container = document.querySelector(".container");
const inspectItems = (who) => {
  let cnt = 0;
  // 행 검사
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (spaceArray[i][j].textContent === who) cnt++;
    }
    if (cnt === 3) {
      console.log("일치!");
      return true;
    } else cnt = 0;
  }
  // 열 검사
  cnt = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (spaceArray[j][i].textContent === who) cnt++;
    }
    if (cnt === 3) {
      console.log("일치!");
      return true;
    } else cnt = 0;
  }
  // 대각 검사
  cnt = 0;
  for (let i = 0; i < 3; i++) {
    if (spaceArray[i][i].textContent === who) cnt++;
  }
  if (cnt === 3) {
    console.log("대각 일치");
    return true;
  }
  if (
    spaceArray[0][2].textContent === who &&
    spaceArray[1][1].textContent === who &&
    spaceArray[2][0].textContent === who
  ) {
    console.log("대각 일치");
    return true;
  }
  return false;
};

const inspectAllItems = () => {
  let cnt = 0;
  for (let i = 0; i < 9; i++) {
    if ($items[i].textContent) cnt++;
  }
  if (cnt === 9) return true;
  else return false;
};

let flag = true;
const handleItemClick = (e) => {
  if (e.target.textContent !== "" || turn !== 1 || flag === false) return;
  e.target.textContent = my;
  flag = false;
  if (inspectItems(my)) {
    console.log(`나의 승리`);
    return;
  } else if (!inspectItems(my) && inspectAllItems()) {
    console.log("무승부");
    return;
  }

  // 턴 변경
  handleComputerTurn();
};

const handleComputerTurn = () => {
  const random = Math.floor(Math.random() * 9);

  if ($items[random].textContent === "") {
    setTimeout(() => {
      $items[random].textContent = "X";
      flag = true;
    }, 1000);

    if (inspectItems(com)) console.log("컴 승리!");
  } else handleComputerTurn();
};
$items.forEach((item) => item.addEventListener("click", handleItemClick));

// com은 $items[] 인덱스에서 랜덤 숫자로 뽑으면 될듯?
