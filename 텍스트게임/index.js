// 주인공, 이름, 화면 뜨고,
// 스탯정보, 로그
// 일반모드 모험 휴식 종료
// 전투모드 랜덤적 생성. 공격, 체력회복, 도망가기
// 내 체력이 0이되면 게임오버, 적 체력이 0이되면 적 사망, 경험치 상승,
// 경험치 일정 이상 되면 레벨업

const $startGame = document.querySelector(".startGame");
const $myInfo = document.querySelector(".myInfo");
const $form = document.querySelector(".form");
const $inputName = document.querySelector(".inputName");
const $normalMode = document.querySelector(".normalMode");
const $fightMode = document.querySelector(".fightMode");
const $name = document.querySelector(".name");
$myInfo.style.display = "none";
$form.style.display = "none";
const handleStart = () => {
  $form.style.display = "block";
  $startGame.style.display = "none";
  $inputName.focus();
};
const handleStartGame = (e) => {
  e.preventDefault();
  const name = $inputName.value;
  $name.textContent = name;
  console.log(name);
  $form.style.display = "none";
  $myInfo.style.display = "block";
  $normalMode.style.display = "block";
};
$startGame.addEventListener("click", handleStart);
$form.addEventListener("submit", handleStartGame);
