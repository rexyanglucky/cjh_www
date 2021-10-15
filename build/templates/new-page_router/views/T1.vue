<template lang="pug">
#app
  | 我是T1
  a(href="./t2") 我要跳转到T2
  router-link(to="/t2") 我要跳转到T2
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {},
};
</script>
<style lang="scss">
@import '@/common/styles/param.scss';
</style>
