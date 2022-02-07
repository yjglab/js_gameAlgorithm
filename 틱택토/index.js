const $log = document.querySelector(".log");
// 빈 테이블 생성
const spaceArray = [];
for (let _ = 0; _ < 3; _++) {
  spaceArray.push(Array(3));
}
const $items = document.querySelectorAll(".item");
let itemIndex = 0;
// DOM 데이터 매칭
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    spaceArray[i][j] = $items[itemIndex];
    itemIndex += 1;
  }
}
let com = "X";
let my = "O";
const $container = document.querySelector(".container");
const inspectItems = (who) => {
  let cnt = 0;
  // 행 검사
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (spaceArray[i][j].textContent === who) cnt++;
    }
    if (cnt === 3) return true;
    else cnt = 0;
  }
  // 열 검사
  cnt = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (spaceArray[j][i].textContent === who) cnt++;
    }
    if (cnt === 3) return true;
    else cnt = 0;
  }
  // 대각 검사
  cnt = 0;
  for (let i = 0; i < 3; i++) {
    if (spaceArray[i][i].textContent === who) cnt++;
  }
  if (cnt === 3) return true;
  if (
    spaceArray[0][2].textContent === who &&
    spaceArray[1][1].textContent === who &&
    spaceArray[2][0].textContent === who
  )
    return true;
  return false;
};
// 승/패가 나지 않은 상태에서 테이블이 꽉 찼는지 검사
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
  if (e.target.textContent !== "" || flag === false) return;
  e.target.textContent = my;
  flag = false;
  if (inspectItems(my)) {
    $log.textContent = "나의 승리!";
    return;
  } else if (!inspectItems(my) && inspectAllItems()) {
    $log.textContent = "무승부!";
    return;
  }
  // 턴 변경
  handleComputerTurn();
};
// 컴퓨터 동작 함수
const handleComputerTurn = () => {
  const random = Math.floor(Math.random() * 9);
  if ($items[random].textContent === "") {
    setTimeout(() => {
      $items[random].textContent = "X";
      if (inspectItems(com)) {
        $log.textContent = "컴퓨터의 승리!";
        return;
      }
      flag = true;
    }, Math.floor(Math.random() * 3 + 1.3) * 1000); // 최대 1.3~3.3초까지 생각
  } else handleComputerTurn();
};
$items.forEach((item) => item.addEventListener("click", handleItemClick));
