import { VueConstructor } from 'vue/types/umd';

interface element {
  init: (Vue: VueConstructor) => void;
}
export const elementInit: element;
// export const e: element;
