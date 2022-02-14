const $button = document.querySelector("button");
const $time = document.querySelector(".time");
const $table = document.querySelector("table");
const $score = document.querySelector(".score");
let time = 1;
const init = () => {
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
  const $td = document.querySelectorAll("td");
  console.log($td);
  const itemsArray = [
    "catup.jpg",
    "catup.jpg",
    "catup.jpg",
    "catup.jpg",
    "catup.jpg",
    "bombup.jpg",
  ];
  setInterval(() => {
    let randomItemImg =
      itemsArray[Math.floor(Math.random() * itemsArray.length)];
    const randomIdx = Math.floor(Math.random() * $td.length);
    if (!$td[randomIdx].innerHTML) {
      if (randomItemImg === "catup.jpg") {
        $td[randomIdx].innerHTML = `<img src=${randomItemImg} title="cat" />`;
        setTimeout(() => {
          $td[randomIdx].querySelector("img").classList.add("up");
        }, 0);
      } else if (randomItemImg === "bombup.jpg") {
        $td[randomIdx].innerHTML = `<img src=${randomItemImg} title="bomb" />`;
        setTimeout(() => {
          $td[randomIdx].querySelector("img").classList.add("up");
        }, 0);
      }
    }
  }, 1000);
  $table.addEventListener("click", handleClickItems);
}
function handleClickItems(e) {
  console.log(e.target);
  if (e.target.title === "cat") {
    e.target.classList = "down";
    setTimeout(() => {
      e.target.remove();
    }, 500);
  }
}
// $button.addEventListener("click", init);
init();
