const $tbody = document.querySelector(".table tbody");
const $result = document.querySelector(".result");

const mineCnt = 10;
const row = 10;
const col = 10;

const dataTableLinear = Array(row * col).fill(false);
const candidate = Array(row * col)
  .fill()
  .map((v, i) => i);
const shuffle = [];
for (let _ = 0; _ < mineCnt; _++) {
  const random = Math.floor(Math.random() * candidate.length);
  const spliceArray = candidate.splice(random, 1);
  shuffle.push(spliceArray[0]);
}
const screenTable = [];

const dataTable = [];
for (let i of shuffle) {
  dataTableLinear[i] = true; // 마인: true
}
for (let _ = 0; _ < row; _++) {
  dataTable.push(dataTableLinear.splice(0, 10));
}
console.log(dataTable);

for (let i = 0; i < row; i++) {
  const $tr = document.createElement("tr");
  for (let j = 0; j < col; j++) {
    const $td = document.createElement("td");
    if (dataTable[i][j] === true) {
      // 끝나고 지우기
      $td.textContent = "X";
      $td.style.color = "red";
    }
    $tr.appendChild($td);
  }
  $tbody.appendChild($tr);
}

// let tableInfo = Array.prototype.map.call(
//   $tbody.querySelectorAll("tr"),
//   function (tr) {
//     return Array.prototype.map.call(tr.querySelectorAll("td"), function (td) {
//       return td.textContent;
//     });
//   }
// );

const $tds = document.querySelectorAll("td");
const checkMinesIndex = (rowIdx, colIdx) => {
  if (rowIdx < 0 || colIdx < 0 || rowIdx >= row || colIdx >= col) return 0;
  if (dataTable[rowIdx][colIdx] === true) {
    return 1;
  }
  return 0;
};
const checkMinesNumber = (target) => {
  const rowIdx = target.parentNode.rowIndex;
  const colIdx = target.cellIndex;
  let cnt = 0;
  cnt +=
    checkMinesIndex(rowIdx - 1, colIdx - 1) +
    checkMinesIndex(rowIdx - 1, colIdx) +
    checkMinesIndex(rowIdx - 1, colIdx + 1) +
    checkMinesIndex(rowIdx, colIdx - 1) +
    checkMinesIndex(rowIdx, colIdx + 1) +
    checkMinesIndex(rowIdx + 1, colIdx - 1) +
    checkMinesIndex(rowIdx + 1, colIdx) +
    checkMinesIndex(rowIdx + 1, colIdx + 1);
  return cnt;
};
const additionalOpenCheck = (rowIdx, colIdx) => {
  if (rowIdx < 0 || colIdx < 0 || rowIdx >= row || colIdx >= col) return;
  if (
    $tbody.querySelectorAll("tr")[rowIdx].querySelectorAll("td")[colIdx]
      .classList.value === "opened"
  )
    return;
  const number = checkMinesNumber(
    $tbody.querySelectorAll("tr")[rowIdx].querySelectorAll("td")[colIdx]
  );
  if (number > 0) {
    $tbody.querySelectorAll("tr")[rowIdx].querySelectorAll("td")[
      colIdx
    ].textContent = number;
    $tbody.querySelectorAll("tr")[rowIdx].querySelectorAll("td")[
      colIdx
    ].classList = "opened";
  }
  if (number === 0) {
    $tbody.querySelectorAll("tr")[rowIdx].querySelectorAll("td")[
      colIdx
    ].classList = "opened";
    additionalOpenCheck(rowIdx - 1, colIdx);
    additionalOpenCheck(rowIdx + 1, colIdx);
    additionalOpenCheck(rowIdx, colIdx - 1);
    additionalOpenCheck(rowIdx, colIdx + 1);
    return;
  }
  return;
};
const handleClickTd = (e) => {
  if (e.target.classList.value === "opened") return;

  const rowIdx = e.target.parentNode.rowIndex;
  const colIdx = e.target.cellIndex;
  if (dataTable[rowIdx][colIdx] === true) {
    // 마인이라면
    console.log("지뢰");
    return;
  }
  // 만약 flag or question이라면 return

  //
  const minesNumber = checkMinesNumber(e.target);
  console.log(e.target);
  if (minesNumber > 0) {
    // 마인 개수 감지가 된다면
    e.target.textContent = minesNumber;
    e.target.className = "opened";
  } else if (minesNumber === 0) {
    e.target.className = "opened";
    additionalOpenCheck(rowIdx - 1, colIdx);
    additionalOpenCheck(rowIdx + 1, colIdx);
    additionalOpenCheck(rowIdx, colIdx - 1);
    additionalOpenCheck(rowIdx, colIdx + 1);
  }
};
$tds.forEach((td) => td.addEventListener("click", handleClickTd));
