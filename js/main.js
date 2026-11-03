import Pokemon from './pokemon.js';
import { getRandom, generateLog } from './utils.js';
import { REGULAR_ATTACK_COST, SUPER_ATTACK_COST, REGEN_AP_PER_TURN } from './constants.js';

const character = new Pokemon({
  name: 'Pikachu',
  selectors: 'character'
});

const enemy = new Pokemon({
  name: 'Charmander',
  selectors: 'enemy'
});

let isCharacterTurn = true;

const btnKick = document.getElementById('btn-kick');
const btnSuperKick = document.getElementById('btn-super-kick');
const $logs = document.querySelector('#logs');

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

function makeMove(isSuperAttack) {
  const attacker = isCharacterTurn ? character : enemy;
  const target = isCharacterTurn ? enemy : character;

  const cost = isSuperAttack ? SUPER_ATTACK_COST : REGULAR_ATTACK_COST;
  const { damageAP } = attacker; 

  if (damageAP < cost) {
    alert(`Недостатньо енергії для ${isSuperAttack ? 'Супер-атаки' : 'Атаки'}! Потрібно ${cost} енергії, а є лише ${damageAP}.`);
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
   
  if (btnSuperKick && !btnSuperKick.disabled) {
    btnSuperKick.style.opacity = currentAttacker.damageAP >= SUPER_ATTACK_COST ? '1' : '0.5';
  }
  btnKick.style.opacity = currentAttacker.damageAP >= REGULAR_ATTACK_COST ? '1' : '0.5';
}

function createUnlimitedClickHandler(callback) {
  let count = 0;

  return function () {
    count++;

    const $p = document.createElement('p');
    $p.innerText = `👉 [Thunder Jolt] Зроблено кліків: ${count} (безлімітно)`;
    if ($logs) {
      $logs.insertBefore($p, $logs.children[0]);
    }

    callback();
  };
}

function createLimitedClickHandler(callback, maxClicks = 2) {
  let count = 0;
  const initialText = btnSuperKick ? btnSuperKick.innerText.split(' (')[0] : 'Special Attack';

  return function (event) {
    count++;
    const leftClicks = maxClicks - count;

    const $p = document.createElement('p');
    $p.innerText = `⚡ [Special Attack] Кліків: ${count}. Залишилося натискань: ${Math.max(0, leftClicks)}`;
    if ($logs) {
      $logs.insertBefore($p, $logs.children[0]);
    }

    callback();

    if (count >= maxClicks) {
      event.currentTarget.disabled = true;
      event.currentTarget.innerText = `${initialText} (0)`;
      
      const $pLimit = document.createElement('p');
      $pLimit.innerText = `❌ [Special Attack] Ліміт натискань вичерпано! Кнопку заблоковано.`;
      if ($logs) {
        $logs.insertBefore($pLimit, $logs.children[0]);
      }
    } else {
      event.currentTarget.innerText = `${initialText} (${leftClicks})`;
    }
  };
}

btnKick.addEventListener('click', createUnlimitedClickHandler(() => makeMove(false)));

if (btnSuperKick) {
  btnSuperKick.addEventListener('click', createLimitedClickHandler(() => makeMove(true), 2));
}

function init() {
  character.renderHP();
  enemy.renderHP();
  updateTurnUI();
}

init();