const $button = document.querySelector("button");
const $time = document.querySelector(".time");
const $table = document.querySelector("table");
const $score = document.querySelector(".score");
const init = () => {
  let time = 1;
  setInterval(() => {
    $time.textContent = time++;
  }, 1000);
  const $fragment = document.createDocumentFragment();
  [1, 2, 3].forEach((v, i) => {
    const $tr = document.createElement("tr");
    [1, 2, 3].forEach((v, j) => {
      const $td = document.createElement("td");
      $tr.appendChild($td);
    });
    $fragment.appendChild($tr);
  });
  $table.appendChild($fragment);
};
// $button.addEventListener("click", init);
init();
