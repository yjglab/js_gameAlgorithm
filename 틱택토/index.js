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
  // 열, 행 검사
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (spaceArray[i][j].textContent === who) cnt++;
    }
    if (cnt === 3) console.log("일치!");
    // 리턴해야함
    else cnt = 0;
  }
  // 대각 검사
  cnt = 0;
  for (let i = 0; i < 3; i++) {
    if (spaceArray[i][i].textContent === who) cnt++;
  }
  if (cnt === 3) console.log("대각 일치"); // 리턴해야함
  if (
    spaceArray[0][2].textContent === who &&
    spaceArray[1][1].textContent === who &&
    spaceArray[2][0].textContent === who
  ) {
    console.log("대각 일치"); // 리턴해야함
  }
};
const handleItemClick = (e) => {
  if (e.target.textContent !== "" || turn !== 1) return;
  e.target.textContent = my;

  // 검사
  inspectItems(my); // true or false
};
$items.forEach((item) => item.addEventListener("click", handleItemClick));
// $item.addEventListener("click", handleItemClick);
// spaceArray[0][1].textContent = "o";
// com은 $items[] 인덱스에서 랜덤 숫자로 뽑으면 될듯?
// 검사 함수는 따로 빼면 좋을듯
