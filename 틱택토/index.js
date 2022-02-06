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

let comTurn;
let myTurn;

// spaceArray[0][1].textContent = "o";
