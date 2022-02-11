const $cards = document.querySelectorAll(".card");
const $cardsFront = document.querySelectorAll(".card__face--front");
const colorPack = [
  "orange",
  "orange",
  "red",
  "red",
  "yellow",
  "yellow",
  "green",
  "green",
  "gray",
  "gray",
  "purple",
  "purple",
];
let startTime, endTime;
const shuffle = [];
while (colorPack.length > 0) {
  const random = Math.floor(Math.random() * colorPack.length);
  const spliceArray = colorPack.splice(random, 1);
  shuffle.push(spliceArray[0]);
}
for (let i = 0; i < shuffle.length; i++) {
  $cardsFront[i].style.backgroundColor = shuffle[i];
}
let cardClickFlag = false;
let clickedCards = [];
let matchedCard = 0;
const notMatchedCardFlip = (card1, card2) => {
  cardClickFlag = false;
  setTimeout(() => {
    card1.classList.toggle("is-flipped");
    card2.classList.toggle("is-flipped");
    cardClickFlag = true;
  }, 1000);
};
const handleCardClick = (e) => {
  if (!cardClickFlag) return;
  e.target.parentNode.classList.toggle("is-flipped");
  clickedCards.push(e.currentTarget.childNodes[3]); // .card__face--front
  clickedCards.forEach(
    (card) => card.parentNode.removeEventListener("click", handleCardClick) // .card
  );
  // 열린 2장의 카드 비교
  if (
    clickedCards.length === 2 &&
    clickedCards[0].style.backgroundColor ===
      clickedCards[1].style.backgroundColor
  ) {
    console.log("일치");
    clickedCards.forEach((card) =>
      card.parentNode.removeEventListener("click", handleCardClick)
    );

    matchedCard += 2;
    clickedCards = [];
    cardClickFlag = false;
    setTimeout(() => {
      cardClickFlag = true;
    }, 1000);
  } else if (clickedCards.length === 2) {
    console.log("불일치");

    notMatchedCardFlip(clickedCards[0].parentNode, clickedCards[1].parentNode);
    clickedCards.forEach((card) =>
      card.parentNode.addEventListener("click", handleCardClick)
    ); // [0], [1]
    clickedCards = [];
  }
  if (matchedCard === 12) {
    endTime = new Date().getTime() / 1000;
    let timeDiff =
      Math.round((endTime - startTime + Number.EPSILON) * 10000) / 10000;
    const $span = document.createElement("span");
    $span.textContent = `성공! ${timeDiff}초 만에 맞추었습니다.`;
    document.body.appendChild($span);
  }
};

const handleAllCardFlip = () => {
  for (let i = 0; i < shuffle.length; i++) {
    setTimeout(() => {
      $cards[i].classList.toggle("is-flipped");
    }, 100 * i);
  }
};
handleAllCardFlip();
const init = () => {
  setTimeout(() => {
    handleAllCardFlip();
  }, 3000);
  setTimeout(() => {
    cardClickFlag = true;
    startTime = new Date().getTime() / 1000;
  }, 3000);
};
$cards.forEach((card) => card.addEventListener("click", handleCardClick));
init();
