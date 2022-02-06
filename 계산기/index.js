const $operator = document.querySelector("#operator");
const $result = document.querySelector("#result");

let n1, n2;
let numValue;
let optrValue;
let resultValue = $result.value;
const handleNumClick = (e) => {
  numValue = Number(e.target.textContent);

  $result.value += numValue;
  resultValue = $result.value;
  if (!optrValue) {
    n1 = resultValue;
  } else {
    n2 = resultValue;
  }
};
const handleOptrClick = (e) => {
  // if (n1 && n2) {
  //   n1 = Number(n1) + Number(n2);
  // }
  if (n1) {
    optrValue = e.target.textContent;
    console.log(optrValue);
    $result.value = "";
    $operator.value = optrValue;
  } else {
    alert("숫자를 먼저 입력하세요");
  }
};
const handlePlusClick = (e) => {
  handleOptrClick(e);
};
const handleMinusClick = (e) => {
  handleOptrClick(e);
};
const handleMultiplyClick = (e) => {
  handleOptrClick(e);
};
const handleDivideClick = (e) => {
  handleOptrClick(e);
};

const handleCalcClick = () => {
  console.log(n1, n2);
  if (optrValue === "+" && n1 && n2) {
    $result.value = Number(n1) + Number(n2);
    n1 = $result.value;
  } else if (optrValue === "-" && n1 && n2) {
    $result.value = Number(n1) - Number(n2);
    n1 = $result.value;
  } else if (optrValue === "/" && n1 && n2) {
    $result.value = Number(n1) / Number(n2);
    n1 = $result.value;
  } else if (optrValue === "*" && n1 && n2) {
    $result.value = Number(n1) * Number(n2);
    n1 = $result.value;
  }
  $operator.value = "";
};
const handleClearClick = () => {
  n1 = null;
  n2 = null;
  optrValue = null;
  $operator.value = "";
  resultValue = null;
  $result.value = "";
};
document.querySelector("#num-0").addEventListener("click", handleNumClick);
document.querySelector("#num-1").addEventListener("click", handleNumClick);
document.querySelector("#num-2").addEventListener("click", handleNumClick);
document.querySelector("#num-3").addEventListener("click", handleNumClick);

document.querySelector("#num-4").addEventListener("click", handleNumClick);
document.querySelector("#num-5").addEventListener("click", handleNumClick);
document.querySelector("#num-6").addEventListener("click", handleNumClick);

document.querySelector("#num-7").addEventListener("click", handleNumClick);
document.querySelector("#num-8").addEventListener("click", handleNumClick);
document.querySelector("#num-9").addEventListener("click", handleNumClick);

document.querySelector("#plus").addEventListener("click", handlePlusClick);
document.querySelector("#minus").addEventListener("click", handleMinusClick);
document.querySelector("#divide").addEventListener("click", handleDivideClick);
document
  .querySelector("#multiply")
  .addEventListener("click", handleMultiplyClick);
document.querySelector("#calculate").addEventListener("click", handleCalcClick);
document.querySelector("#clear").addEventListener("click", handleClearClick);
