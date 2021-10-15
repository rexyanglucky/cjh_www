<template lang="pug">
#app
  | 我是T2
  a(href="./t1") 我要跳转到T1
  router-link(to="/t1") 我要跳转到T1
  Link
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
