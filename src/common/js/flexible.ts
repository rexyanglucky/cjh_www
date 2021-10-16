import { throttle } from 'lodash-es';

function calcRemUnit() {
  if (document.documentElement) {
    const { clientWidth } = document.documentElement;
    // const uiWidth = 1200;
    const uiWidth = 1920;
    // const pcMinWidth = 980;
    const baseFontSize = 100;
    if (clientWidth >= uiWidth || (window as any).notCalcRem) {
      document.documentElement.style.fontSize = `${baseFontSize}px`;
      return;
    }
    document.documentElement.style.fontSize = `${
      (baseFontSize / uiWidth) * document.documentElement.clientWidth
    }px`;
  } else {
    document.addEventListener('DOMContentLoaded', calcRemUnit);
  }
}
if (!(window as any).notCalcRem) {
  window.addEventListener(
    'resize',
    throttle(() => {
      calcRemUnit();
    }, 1000)
  );
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      calcRemUnit();
    }
  });
}

calcRemUnit();
