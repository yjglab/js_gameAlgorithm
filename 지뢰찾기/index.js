const $tbody = document.querySelector(".table tbody");
const $result = document.querySelector(".result");
const mineCnt = 10;
const row = 10;
const col = 10;
let opened = 0;
// 데이터 테이블 생성
const dataTableLinear = Array(row * col).fill(false); // 랜덤 위치 넣을 1차원 배열
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
for (let i of shuffle) {
  dataTableLinear[i] = true; // 마인: true
}
for (let _ = 0; _ < row; _++) {
  dataTable.push(dataTableLinear.splice(0, row)); // 2차원으로 변경
}
// 스크린 테이블 생성
for (let i = 0; i < row; i++) {
  const $tr = document.createElement("tr");
  for (let j = 0; j < col; j++) {
    const $td = document.createElement("td");
    // if (dataTable[i][j] === true) {
    //   // 끝나고 지우기 (마인확인용)
    //   $td.textContent = "X";
    //   $td.style.color = "red";
    // }
    $tr.appendChild($td);
  }
  $tbody.appendChild($tr);
}
const $tds = document.querySelectorAll("td");
const checkMinesIndex = (rowIdx, colIdx) => {
  if (rowIdx < 0 || colIdx < 0 || rowIdx >= row || colIdx >= col) return 0;
  if (dataTable[rowIdx][colIdx] === true) {
    return 1;
  }
  return 0;
};
// 클릭한 td의 주변 지뢰 개수를 카운트
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
// 빈칸을 누르면 탐색을 통해 모든 빈칸을 오픈
const additionalOpenCheck = (rowIdx, colIdx) => {
  if (rowIdx < 0 || colIdx < 0 || rowIdx >= row || colIdx >= col) return;
  const td = $tbody.querySelectorAll("tr")[rowIdx].querySelectorAll("td")[
    colIdx
  ];
  if (td.classList.value === "opened") return;
  const number = checkMinesNumber(td);
  if (number > 0) {
    td.textContent = number;
    td.classList = "opened";
    opened++;
  }
  if (number === 0) {
    td.classList = "opened";
    td.textContent = ""; // 깃발이나 물음표 표시한 것 지워주기 위함
    additionalOpenCheck(rowIdx - 1, colIdx);
    additionalOpenCheck(rowIdx + 1, colIdx);
    additionalOpenCheck(rowIdx, colIdx - 1);
    additionalOpenCheck(rowIdx, colIdx + 1);
    opened++;
    return;
  }
  return;
};
let clickFlag = true;
const handleClickTd = (e) => {
  if (e.target.classList.value === "opened" || !clickFlag) return;

  const rowIdx = e.target.parentNode.rowIndex;
  const colIdx = e.target.cellIndex;
  if (dataTable[rowIdx][colIdx] === true) {
    // 마인이라면
    $result.textContent = "게임오버";
    // 모든 마인 디스플레이
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (dataTable[i][j] === true) {
          const td = $tbody.querySelectorAll("tr")[i].querySelectorAll("td")[j];
          td.className = "opened";
          td.textContent = "💥";
          td.style.color = "red";
        }
      }
    }
    clickFlag = false;
    $tds.forEach((td) =>
      td.removeEventListener("contextmenu", handleClickContextMenu)
    );
    return;
  }
  const minesNumber = checkMinesNumber(e.target);
  if (minesNumber > 0) {
    // 마인 개수 감지가 된다면
    e.target.textContent = minesNumber;
    e.target.className = "opened";
    opened++;
  } else if (minesNumber === 0) {
    // 빈칸이라면 탐색 실행
    e.target.className = "opened";
    opened++;
    additionalOpenCheck(rowIdx - 1, colIdx);
    additionalOpenCheck(rowIdx + 1, colIdx);
    additionalOpenCheck(rowIdx, colIdx - 1);
    additionalOpenCheck(rowIdx, colIdx + 1);
  }
  if (opened === row * col - mineCnt) setTimeout(() => alert("성공"), 500);
};
const handleClickContextMenu = (e) => {
  e.preventDefault();
  e.target.removeEventListener("click", handleClickTd);
  if (e.target.className === "opened") return;
  if (e.target.className === "flag") {
    e.target.className = "question";
    e.target.textContent = "❔";
  } else if (e.target.className === "question") {
    e.target.textContent = "";
    e.target.classList.remove("question");
    e.target.addEventListener("click", handleClickTd);
  } else {
    e.target.className = "flag";
    e.target.textContent = "🚩";
  }
};
$tds.forEach((td) => td.addEventListener("click", handleClickTd));
$tds.forEach((td) =>
  td.addEventListener("contextmenu", handleClickContextMenu)
);
