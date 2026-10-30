const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  maxAP: 100,
  damageAP: 100,
  elName: document.getElementById('name-character'),
  elHealth: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),
  
  // Переносимо renderHP у метод об'єкта
  renderHP() {
    this.elHealth.innerText = `${this.damageHP} / ${this.defaultHP} HP | ⚡ ${this.damageAP} / ${this.maxAP} AP`;

    const percent = (this.damageHP / this.defaultHP) * 100;
    this.elProgressbar.style.width = percent + '%';

    if (percent > 60) {
      this.elProgressbar.style.backgroundColor = '#2ecc71';
    } else if (percent > 20) {
      this.elProgressbar.style.backgroundColor = '#f1c40f';
    } else {
      this.elProgressbar.style.backgroundColor = '#e74c3c';
    }
  },

  // Переносимо changeHP у метод об'єкта
  changeHP(count) {
    this.damageHP -= count;

    if (this.damageHP <= 0) {
      this.damageHP = 0;
    }

    this.renderHP();
  }
};

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  maxAP: 100,
  damageAP: 100,
  elName: document.getElementById('name-enemy'),
  elHealth: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy'),
  
  // Той самий метод renderHP для ворога
  renderHP() {
    this.elHealth.innerText = `${this.damageHP} / ${this.defaultHP} HP | ⚡ ${this.damageAP} / ${this.maxAP} AP`;

    const percent = (this.damageHP / this.defaultHP) * 100;
    this.elProgressbar.style.width = percent + '%';

    if (percent > 60) {
      this.elProgressbar.style.backgroundColor = '#2ecc71';
    } else if (percent > 20) {
      this.elProgressbar.style.backgroundColor = '#f1c40f';
    } else {
      this.elProgressbar.style.backgroundColor = '#e74c3c';
    }
  },

  // Той самий метод changeHP для ворога
  changeHP(count) {
    this.damageHP -= count;

    if (this.damageHP <= 0) {
      this.damageHP = 0;
    }

    this.renderHP();
  }
};

let isCharacterTurn = true; 

const REGULAR_ATTACK_COST = 10;
const SUPER_ATTACK_COST = 45;
const REGEN_AP_PER_TURN = 10;

function getRandom(max) {
  return Math.floor(Math.random() * max) + 1;
}

function checkWinner() {
  if (character.damageHP === 0 || enemy.damageHP === 0) {
    btnKick.disabled = true;
    if (btnSuperKick) btnSuperKick.disabled = true;

    if (character.damageHP === 0 && enemy.damageHP === 0) {
      alert('Нічия!');
    } else if (character.damageHP === 0) {
      alert(`Переміг ${enemy.name}!`);
    } else {
      alert(`Переміг ${character.name}!`);
    }
    return true;
  }
  return false;
}

const btnKick = document.getElementById('btn-kick');
const btnSuperKick = document.getElementById('btn-super-kick');

function makeMove(isSuperAttack) {
  const attacker = isCharacterTurn ? character : enemy;
  const target = isCharacterTurn ? enemy : character;

  const cost = isSuperAttack ? SUPER_ATTACK_COST : REGULAR_ATTACK_COST;

  if (attacker.damageAP < cost) {
    alert(`Недостатньо енергії для ${isSuperAttack ? 'Супер-атаки' : 'Атаки'}! Потрібно ${cost} AP, а є лише ${attacker.damageAP} AP.`);
    return;
  }

  attacker.damageAP -= cost;

  const damage = isSuperAttack ? (getRandom(20) + 15) : getRandom(20);

  // Викликаємо метод changeHP у цілі через контекст об'єкта
  target.changeHP(damage);

  if (checkWinner()) return;

  isCharacterTurn = !isCharacterTurn;

  const nextAttacker = isCharacterTurn ? character : enemy;
  nextAttacker.damageAP += REGEN_AP_PER_TURN;

  if (nextAttacker.damageAP > nextAttacker.maxAP) {
    nextAttacker.damageAP = nextAttacker.maxAP;
  }

  // Викликаємо методи оновлення здоров'я для обох об'єктів
  character.renderHP();
  enemy.renderHP();
  updateTurnUI();
}

function updateTurnUI() {
  const currentAttacker = isCharacterTurn ? character : enemy;
  
  if (btnSuperKick) {
    btnSuperKick.style.opacity = currentAttacker.damageAP >= SUPER_ATTACK_COST ? '1' : '0.5';
  }
  btnKick.style.opacity = currentAttacker.damageAP >= REGULAR_ATTACK_COST ? '1' : '0.5';
}

btnKick.addEventListener('click', function () {
  makeMove(false);
});

if (btnSuperKick) {
  btnSuperKick.addEventListener('click', function () {
    makeMove(true);
  });
}

function init() {
  if (character.elName) character.elName.innerText = character.name;
  if (enemy.elName) enemy.elName.innerText = enemy.name;

  // Викликаємо методи рендеру при ініціалізації
  character.renderHP();
  enemy.renderHP();
  updateTurnUI();
}

init();