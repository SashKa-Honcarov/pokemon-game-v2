export function getRandom(max) {
  return Math.floor(Math.random() * max) + 1;
}

export function countBtn(count = 6, $btn) {
  let c = count;
  return function () {
    c--;
    if (c === 0) {
      $btn.disabled = true;
    }
    const baseText = $btn.innerText.split(' (')[0];
    $btn.innerText = `${baseText} (${c})`;
    return c;
  };
}

export function generateLog(firstPerson, secondPerson, count) {
  const { name: name1 } = firstPerson;
  const { name: name2, hp } = secondPerson;

  const logs = [
    `[${name1}] згадав щось важливе, але несподівано [${name2}], не пам'ятаючи себе від переляку, вдарив у передпліччя ворога. -${count} [${hp.current}/${hp.total}]`,
    `[${name1}] поперхнувся, і за це [${name2}] з переляку приклав прямий удар коліном у лоб ворога. -${count} [${hp.current}/${hp.total}]`,
    `[${name1}] забувся, але в цей час наглий [${name2}], прийнявши вольове рішення, непомітно підійшовши ззаду, вдарив. -${count} [${hp.current}/${hp.total}]`,
    `[${name1}] прийшов до тями, але несподівано [${name2}] випадково завдав найпотужнішого удару. -${count} [${hp.current}/${hp.total}]`,
    `[${name1}] поперхнувся, але в цей час [${name2}] неохоче роздробив кулаком супротивника. -${count} [${hp.current}/${hp.total}]`,
    `[${name1}] здивувався, а [${name2}], похитнувшись, вліпив підлий удар. -${count} [${hp.current}/${hp.total}]`,
    `[${name1}] висморкався, але несподівано [${name2}] провів дрібний удар. -${count} [${hp.current}/${hp.total}]`,
    `[${name1}] похитнувся, і раптом наглий [${name2}] безпричинно вдарив у ногу супротивника. -${count} [${hp.current}/${hp.total}]`,
    `[${name1}] засмутився, як раптом, несподівано [${name2}] випадково вліпив стопою в живіт суперника. -${count} [${hp.current}/${hp.total}]`,
    `[${name1}] намагався щось сказати, але раптом, несподівано [${name2}] з нудьги розбив брову супернику. -${count} [${hp.current}/${hp.total}]`
  ];

  const randomIndex = getRandom(logs.length) - 1;
  return logs[randomIndex];
}