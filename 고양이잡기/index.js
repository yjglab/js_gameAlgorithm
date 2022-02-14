const $button = document.querySelector("button");
const $time = document.querySelector(".time");
const $table = document.querySelector("table");
const $score = document.querySelector(".score");
const $life = document.querySelector(".life");
let time = 60;
let score = 0;
let life = 5;
const init = () => {
  $button.remove();
  $score.textContent = `잡은 고양이 수 : ${score}`;
  $life.textContent = `라이프: ${life}`;
  $time.textContent = `남은 시간 : ${time}`;
  setInterval(() => {
    $time.textContent = `남은 시간 : ${--time}`;
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
function removeItems(item) {
  // 시간 지나면 제거
  setTimeout(() => {
    if (!item.querySelector("img")) return;
    item.querySelector("img").classList = "down";
  }, 1500);
  setTimeout(() => {
    item.querySelector("img")?.remove();
  }, 1700);
}
function display() {
  // 캣 5, 봄 2 비율 어레이
  const $td = document.querySelectorAll("td");
  const itemsArray = [
    "catup.jpg",
    "catup.jpg",
    "catup.jpg",
    "catup.jpg",
    "catup.jpg",
    "bombup.jpg",
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
        }, 1);
        removeItems($td[randomIdx]);
      } else if (randomItemImg === "bombup.jpg") {
        $td[randomIdx].innerHTML = `<img src=${randomItemImg} title="bomb" />`;
        setTimeout(() => {
          $td[randomIdx].querySelector("img").classList.add("up");
        }, 1);
        removeItems($td[randomIdx]);
      }
    }
    // if (time === 0) {
    //   alert(`성공! 총 ${score}마리의 고양이를 잡았습니다`);
    //   location.reload();
    // }
  }, 1000);
  $table.addEventListener("click", handleClickItems);
}
function handleClickItems(e) {
  if (e.target.title === "cat") {
    e.target.src = "catdown.jpg";
    $score.textContent = `잡은 고양이 수: ${(score += 1)}`;
    setTimeout(() => {
      e.target.classList = "down";
    }, 500);
    setTimeout(() => {
      e.target.remove();
    }, 700);
  } else if (e.target.title === "bomb") {
    e.target.src = "bombdown.jpg";
    $life.textContent = `라이프: ${--life}`;
    if (life === 0) {
      alert("실패!");
      location.reload();
    }
    setTimeout(() => {
      e.target.classList = "down";
    }, 500);
    setTimeout(() => {
      e.target.remove();
    }, 700);
  }
}
$button.addEventListener("click", init);
