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

  // cat or bomb 보이기
  display();
};
function display() {
  // 캣 4, 봄 1 비율 어레이
  const itemsArray = ["catup.jpg", "catup.jpg", "catup.jpg", "bomb.jpg"];
}
// $button.addEventListener("click", init);
init();
