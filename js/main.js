import Pokemon from './pokemon.js';
import { getRandom, generateLog } from './utils.js';
import { pokemons } from './pokemons.js';

const $control = document.querySelector('.control');
const $logs = document.querySelector('#logs');

let player1, player2;

function initGame() {
  const pikachuData = pokemons.find(item => item.name === 'Pikachu');
  const charmanderData = pokemons.find(item => item.name === 'Charmander');

  player1 = new Pokemon({
    ...pikachuData,
    selectors: 'player1'
  });

  player2 = new Pokemon({
    ...charmanderData,
    selectors: 'player2'
  });

  renderControl();
}

function renderControl() {
  $control.innerHTML = '';

  player1.attacks.forEach(item => {
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = `${item.name} (${item.maxCount})`;
    
    let count = item.maxCount;

    $btn.addEventListener('click', function () {
      count--;
      
      if (count <= 0) {
        $btn.disabled = true;
        $btn.innerText = `${item.name} (0)`;
      } else {
        $btn.innerText = `${item.name} (${count})`;
      }

      // Удар гравця по противнику
      const damage = getRandom(item.maxDamage, item.minDamage);
      player2.changeHP(damage, function (countDamage) {
        const logText = generateLog(player1, player2, countDamage);
        const $p = document.createElement('p');
        $p.innerText = logText;
        if ($logs) {
          $logs.insertBefore($p, $logs.children[0]);
        }
      });

      // Відповідний удар противника
      if (player2.hp.current > 0) {
        const enemyAttack = player2.attacks[getRandom(player2.attacks.length) - 1];
        const enemyDamage = getRandom(enemyAttack.maxDamage, enemyAttack.minDamage);
        
        player1.changeHP(enemyDamage, function (countDamage) {
          const logText = generateLog(player2, player1, countDamage);
          const $p = document.createElement('p');
          $p.innerText = logText;
          if ($logs) {
            $logs.insertBefore($p, $logs.children[0]);
          }
        });
      }

      // Перевірка перемоги / поразки та перезапуск гри
      if (player2.hp.current === 0) {
        alert(`Переміг ${player1.name}! Нова гра.`);
        initGame();
      } else if (player1.hp.current === 0) {
        alert(`Переміг ${player2.name}! Нова гра.`);
        initGame();
      }
    });

    $control.appendChild($btn);
  });
}

initGame();