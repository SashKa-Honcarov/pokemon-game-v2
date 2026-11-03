class Selectors {
  constructor(selector) {
    this.elName = document.getElementById(`name-${selector}`);
    this.elHealth = document.getElementById(`health-${selector}`);
    this.elProgressbar = document.getElementById(`progressbar-${selector}`);
    this.elImg = document.getElementById(`img-${selector}`);
  }
}

class Pokemon extends Selectors {
  constructor({ name, hp, type, selectors, attacks = [], img }) {
    super(selectors);
    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;
    this.attacks = attacks;
    this.img = img;

    this.init();
  }

  renderHP() {
    this.elHealth.innerText = `${this.hp.current} / ${this.hp.total}`;
    this.renderProgressbarHP();
  }

  renderProgressbarHP() {
    const percent = (this.hp.current / this.hp.total) * 100;
    this.elProgressbar.style.width = percent + '%';

    if (percent < 20) {
      this.elProgressbar.classList.add('critical');
    } else if (percent < 60) {
      this.elProgressbar.classList.add('low');
    } else {
      this.elProgressbar.classList.remove('low', 'critical');
    }
  }

  changeHP(count, cb) {
    this.hp.current -= count;

    if (this.hp.current <= 0) {
      this.hp.current = 0;
    }

    this.renderHP();
    cb && cb(count);
  }

  init() {
    if (this.elName) this.elName.innerText = this.name;
    if (this.elImg && this.img) this.elImg.src = this.img;
    this.renderHP();
  }
}

export default Pokemon;