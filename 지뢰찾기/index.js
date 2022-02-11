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
const dataTable = [];
for (let i of shuffle) dataTableLinear[i] = true; // 마인: true

for (let _ = 0; _ < row; _++) {
  dataTable.push(dataTableLinear.splice(0, 10));
}
console.log(dataTable);

for (let i = 0; i < row; i++) {
  const $tr = document.createElement("tr");
  for (let j = 0; j < col; j++) {
    const $td = document.createElement("td");
    if (dataTable[i][j] === true) $td.textContent = "X"; // 끝나고 지우기
    $tr.appendChild($td);
  }
  $tbody.appendChild($tr);
}
const $tds = document.querySelectorAll("td");
const checkMinesIndex = (cnt, rowIdx, colIdx) => {
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
  cnt += checkMinesIndex(cnt, rowIdx - 1, colIdx - 1);
  cnt += checkMinesIndex(cnt, rowIdx - 1, colIdx);
  cnt += checkMinesIndex(cnt, rowIdx - 1, colIdx + 1);
  cnt += checkMinesIndex(cnt, rowIdx, colIdx - 1);
  cnt += checkMinesIndex(cnt, rowIdx, colIdx + 1);
  cnt += checkMinesIndex(cnt, rowIdx + 1, colIdx - 1);
  cnt += checkMinesIndex(cnt, rowIdx + 1, colIdx);
  cnt += checkMinesIndex(cnt, rowIdx + 1, colIdx + 1);
  console.log(cnt);
  return cnt;
};
const handleClickTd = (e) => {
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
  if (minesNumber) {
    e.target.textContent = minesNumber;
  } else {
    // 빈칸이라면
  }
};
$tds.forEach((td) => td.addEventListener("click", handleClickTd));
