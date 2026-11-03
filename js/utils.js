export function getRandom(max) {
  return Math.floor(Math.random() * max) + 1;
}

export function generateLog(firstPerson, secondPerson, count) {
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