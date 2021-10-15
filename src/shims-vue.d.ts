declare module '*.vue' {
  import Vue, { PluginFunction } from 'vue';
  class Custom extends Vue {
    static install: PluginFunction<Recor<string, unknown>>;
  }
  export default Custom;
}

declare module 'vue-fragment' {
  import { PluginObject } from 'vue';
  const res: { Plugin: PluginObject<any> };
  export const Plugin: PluginObject<any>;
  export default res;
}

declare module '*.scss' {
  const res: any;
  export default res;
}
declare module '*.png' {
  const res: any;
  export default res;
}
declare module '*.svg' {
  const res: any;
  export default res;
}
declare module 'AxxUpload' {
  const res: {
    uploadFile: (config: any) => any;
  };
  export const uploadFile: (config: any) => any;
  export default res;
}
declare module 'Swiper';
declare module 'vue-plugin-load-script';
declare module 'webpack-theme-color-replacer/client';
declare module 'webpack-theme-color-replacer/forElementUI';
declare module '@/common/js/themeConfig';
