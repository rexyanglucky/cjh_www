import './index.scss';

class Loading {
  target = 'c-loading';

  show(styleObj = {}) {
    const target = document.querySelector(`.${this.target}`);
    if (target) return;
    const ele = document.createElement('div');
    ele.className = this.target;
    for (const [key, value] of Object.entries(styleObj)) {
      (ele.style as any)[key] = value;
    }
    document.body.appendChild(ele);
  }
  hide() {
    const ele = document.querySelector(`.${this.target}`);
    if (ele && ele.parentNode) {
      ele.parentNode.removeChild(ele);
    }
  }
}

export default new Loading();
