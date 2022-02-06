const number = Number(prompt("몇명이 참가?"));
const $button = document.querySelector("button");
const $input = document.querySelector("input");
const $word = document.querySelector("#word");
const $order = document.querySelector("#order");
let word; // 제시어
let nWord;

const onClickButton = () => {
  if (!word || word[word.length - 1] === nWord[0]) {
    word = nWord;
    $word.textContent = word;

    const order = Number($order.textContent);
    if (order === number) {
      $order.textContent = 1;
    } else {
      $order.textContent = order + 1;
    }
  } else {
    alert("올바르지 않은 단어");
  }
  $input.value = "";
  $input.focus();
};
const onInput = (e) => {
  nWord = e.target.value;
};
$button.addEventListener("click", onClickButton);
$input.addEventListener("input", onInput);
