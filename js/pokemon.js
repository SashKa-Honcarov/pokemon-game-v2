class Selectors {
  constructor(selector) {
    this.elName = document.getElementById(`name-${selector}`);
    this.elHealth = document.getElementById(`health-${selector}`);
    this.elProgressbar = document.getElementById(`progressbar-${selector}`);
  }
}

class Pokemon extends Selectors {
  constructor({ name, defaultHP = 100, maxAP = 100, selectors }) {
    super(selectors);
    this.name = name;
    this.defaultHP = defaultHP;
    this.damageHP = defaultHP;
    this.maxAP = maxAP;
    this.damageAP = maxAP;

    this.init();
  }

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
  }

  changeHP(count) {
    this.damageHP -= count;

    if (this.damageHP <= 0) {
      this.damageHP = 0;
    }

    this.renderHP();
  }

  init() {
    if (this.elName) this.elName.innerText = this.name;
    this.renderHP();
  }
}

export default Pokemon;