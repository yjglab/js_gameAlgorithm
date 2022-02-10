const $startGame = document.querySelector(".startGame");
const $myInfo = document.querySelector(".myInfo");
const $enemyInfo = document.querySelector(".enemyInfo");
const $form = document.querySelector(".form");
const $inputName = document.querySelector(".inputName");
const $normalMode = document.querySelector(".normalMode");
const $fightMode = document.querySelector(".fightMode");
const $name = document.querySelector(".name");

const $nm_adventure = document.querySelector(".nm_adventure");
const $nm_rest = document.querySelector(".nm_rest");
const $nm_exit = document.querySelector(".nm_exit");

const $fm_attack = document.querySelector(".fm_attack");
const $fm_heal = document.querySelector(".fm_heal");
const $fm_exit = document.querySelector(".fm_exit");

const $hp = document.querySelector(".hp");
const $defense = document.querySelector(".defense");
const $power = document.querySelector(".power");
const $exp = document.querySelector(".exp");
const $level = document.querySelector(".level");

const $enemyHp = document.querySelector(".enemyHp");
const $enemyPower = document.querySelector(".enemyPower");

const colorPack = {
  lowHp: "rgb(255, 245, 160)",
  death: "rgb(102, 12, 12)",
  alive: "white",
  attacked: "red",
  black: "black",
  white: "white",
};
const my = {
  hp: 100,
  defense: 2,
  power: 25,
  exp: 0,
  level: 1,
};
const enemy = {
  hp: 0,
  power: 0,
};

$myInfo.style.display = "none";
$enemyInfo.style.display = "none";
$form.style.display = "none";

const handleStart = () => {
  $form.style.display = "block";
  $startGame.style.display = "none";
  $inputName.focus();
};

$hp.textContent = my.hp;
$power.textContent = my.power;
$exp.textContent = my.exp;
$level.textContent = my.level;
$defense.textContent = my.defense;

let adventureFlag = true;
const handleNmAdventure = () => {
  if (my.hp === 0 || !adventureFlag) return;
  handleFightMode();
};

let restFlag = true;
const handleNmRest = () => {
  if (!restFlag) return;
  adventureFlag = false;
  const restInterval = setInterval(() => {
    if (my.hp >= 30) {
      $myInfo.style.backgroundColor = colorPack.lowHp;
    }
    if (my.hp >= 60) {
      $myInfo.style.backgroundColor = colorPack.alive;
    }
    if (my.hp >= 100) {
      restFlag = false;
      adventureFlag = true;
      my.hp = 100;
      $hp.textContent = my.hp;
      clearInterval(restInterval);
      return;
    }
    my.hp += 1;
    $hp.textContent = my.hp;
  }, 20);
};

const handleNmExit = () => {
  location.reload(true);
};
const handleNormalMode = () => {
  if (my.hp < 100) restFlag = true;
  adventureFlag = true;
  healFlag = true;
  $normalMode.style.display = "block";
  $fightMode.style.display = "none";
  $enemyInfo.style.display = "none";
  $nm_adventure.addEventListener("click", handleNmAdventure);
  $nm_rest.addEventListener("click", handleNmRest);
  $nm_exit.addEventListener("click", handleNmExit);
};

let attackFlag = true;
const handleEnemyAttack = () => {
  attackFlag = false;
  healFlag = false;

  setTimeout(() => {
    $hp.style.color = colorPack.attacked;
    console.log(my.defense);
    my.hp -= enemy.power - my.defense;
    setTimeout(() => ($hp.style.color = colorPack.black), 350);

    // 내 체력이 0인 경우
    if (my.hp <= 60) {
      $myInfo.style.backgroundColor = colorPack.lowHp;
    }
    if (my.hp <= 20) {
      $myInfo.style.backgroundColor = colorPack.death;
    }
    if (my.hp <= 0) {
      my.hp = 0;
      $hp.textContent = my.hp;
      setTimeout(() => handleNormalMode(), 2000);
      return;
    } else {
      $hp.textContent = my.hp;
    }
    attackFlag = true;
    healFlag = true;
  }, 1000);
};
let enemyAttackRange = 0;
const increaseExp = () => {
  let expCount = 0;
  let maxExp = parseInt(100 / my.level); // 현재 레벨에서 적 한명 처치당 증가할 수 있는 최대 exp
  console.log(maxExp);
  const expInterval = setInterval(() => {
    expCount += 1;
    my.exp += 1;
    $exp.textContent = my.exp;
    if (my.exp === 100) {
      expCount = 0;
      clearInterval(expInterval);
      my.exp = 0;
      $exp.textContent = 0;
      my.power += 15;
      $power.textContent = my.power;
      my.level += 1;
      $level.textContent = my.level;
      my.defense += 4;
      $defense.textContent = my.defense;
      my.hp = 100;
      $hp.textContent = my.hp;
      $myInfo.style.backgroundColor = colorPack.white;
      enemyAttackRange += 5;
      return;
    }
    if (expCount === maxExp) {
      expCount = 0;
      $exp.textContent = my.exp;
      clearInterval(expInterval);
      console.log(my.exp);
      return;
    }
  }, 20);
};
const handleFmAttack = () => {
  if (attackFlag === false) return;
  // 내 턴 공격

  $enemyHp.style.color = colorPack.attacked;
  enemy.hp -= my.power;
  $enemyHp.textContent = enemy.hp;
  setTimeout(() => ($enemyHp.style.color = colorPack.white), 350);

  // 적 체력이 0인 경우
  if (enemy.hp <= 0) {
    attackFlag = false;
    healFlag = false;
    $enemyHp.textContent = 0;
    setTimeout(() => {
      $enemyInfo.style.display = "none";
    }, 1000);
    setTimeout(() => handleNormalMode(), 2000);

    // 경험치 상승
    increaseExp();
    return;
  }
  // 상대 턴 공격
  handleEnemyAttack();
};
let healFlag = true;
const handleFmHeal = () => {
  if (!healFlag) return;
  healFlag = false;
  attackFlag = false;
  let maxHealAmount = 0;
  const healInterval = setInterval(() => {
    if (my.hp >= 20) {
      $myInfo.style.backgroundColor = colorPack.lowHp;
    }
    if (my.hp >= 60) {
      $myInfo.style.backgroundColor = colorPack.white;
    }
    if (my.hp === 100) {
      clearInterval(healInterval);
      my.hp = 100;
      $hp.textContent = 100;
      return;
    }
    if (maxHealAmount === 30) {
      clearInterval(healInterval);
      return;
    }
    my.hp += 1;
    $hp.textContent = my.hp;
    maxHealAmount += 1;
  }, 20);
  setTimeout(handleEnemyAttack, 2000);
};
const handleFmExit = () => {
  handleNormalMode();
};

const handleFightMode = () => {
  $fightMode.style.display = "block";
  $normalMode.style.display = "none";
  $enemyInfo.style.display = "block";

  enemy.hp = Math.floor(Math.random() * 8 + 2) * 10 * my.level; // level * 20 ~ 100
  enemy.power = Math.floor(Math.random() * 5 + 3) * my.level + enemyAttackRange;

  $enemyHp.textContent = enemy.hp;
  $enemyPower.textContent = enemy.power;
  attackFlag = true;

  $fm_attack.addEventListener("click", handleFmAttack);
  $fm_heal.addEventListener("click", handleFmHeal);
  $fm_exit.addEventListener("click", handleFmExit);
};

const handleStartGame = (e) => {
  e.preventDefault();
  const name = $inputName.value;
  $name.textContent = name;
  console.log(name);
  $form.style.display = "none";
  $myInfo.style.display = "block";

  handleNormalMode();
};

$startGame.addEventListener("click", handleStart);
$form.addEventListener("submit", handleStartGame);
