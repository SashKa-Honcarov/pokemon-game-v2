const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  maxAP: 100,
  damageAP: 100,
  elName: document.getElementById('name-character'),
  elHealth: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),

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

function generateLog(firstPerson, secondPerson, count) {
  const { name: name1 } = firstPerson;
  const { name: name2, damageHP, defaultHP } = secondPerson;

  const logs = [
    `[${name1}] згадав щось важливе, але несподівано [${name2}], не пам'ятаючи себе від переляку, вдарив у передпліччя ворога. -${count} [${damageHP}/${defaultHP}]`,
    `[${name1}] поперхнувся, і за це [${name2}] з переляку приклав прямий удар коліном у лоб ворога. -${count} [${damageHP}/${defaultHP}]`,
    `[${name1}] забувся, але в цей час наглий [${name2}], прийнявши вольове рішення, непомітно підійшовши ззаду, вдарив. -${count} [${damageHP}/${defaultHP}]`,
    `[${name1}] прийшов до тями, але несподівано [${name2}] випадково завдав найпотужнішого удару. -${count} [${damageHP}/${defaultHP}]`,
    `[${name1}] поперхнувся, але в цей час [${name2}] неохоче роздробив кулаком супротивника. -${count} [${damageHP}/${defaultHP}]`,
    `[${name1}] здивувався, а [${name2}], похитнувшись, вліпив підлий удар. -${count} [${damageHP}/${defaultHP}]`,
    `[${name1}] висморкався, але несподівано [${name2}] провів дрібний удар. -${count} [${damageHP}/${defaultHP}]`,
    `[${name1}] похитнувся, і раптом наглий [${name2}] безпричинно вдарив у ногу супротивника. -${count} [${damageHP}/${defaultHP}]`,
    `[${name1}] засмутився, як раптом, несподівано [${name2}] випадково вліпив стопою в живіт суперника. -${count} [${damageHP}/${defaultHP}]`,
    `[${name1}] намагався щось сказати, але раптом, несподівано [${name2}] з нудьги розбив брову супернику. -${count} [${damageHP}/${defaultHP}]`
  ];

  const randomIndex = getRandom(logs.length) - 1;
  return logs[randomIndex];
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
const $logs = document.querySelector('#logs');

function makeMove(isSuperAttack) {
  const attacker = isCharacterTurn ? character : enemy;
  const target = isCharacterTurn ? enemy : character;

  const cost = isSuperAttack ? SUPER_ATTACK_COST : REGULAR_ATTACK_COST;
  const { damageAP } = attacker; 

  if (damageAP < cost) {
    alert(`Недостатньо енергії для ${isSuperAttack ? 'Супер-атаки' : 'Атаки'}! Потрібно ${cost} AP, а є лише ${damageAP} AP.`);
    return;
  }

  attacker.damageAP -= cost;

  const damage = isSuperAttack ? (getRandom(20) + 15) : getRandom(20);

  target.changeHP(damage);

  const logText = generateLog(attacker, target, damage);
  const $p = document.createElement('p');
  $p.innerText = logText;
  if ($logs) {
    $logs.insertBefore($p, $logs.children[0]);
  }

  if (checkWinner()) return;

  isCharacterTurn = !isCharacterTurn;

  const nextAttacker = isCharacterTurn ? character : enemy;
  nextAttacker.damageAP += REGEN_AP_PER_TURN;

  if (nextAttacker.damageAP > nextAttacker.maxAP) {
    nextAttacker.damageAP = nextAttacker.maxAP;
  }

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

  character.renderHP();
  enemy.renderHP();
  updateTurnUI();
}

init();