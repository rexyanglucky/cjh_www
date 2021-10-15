<template lang="pug">
#app
  transition(name='slide-fade' mode="out-in")
    keep-alive
      router-view
</template>
<script>
export default {
  components: {},
  data() {
    return {
      transitionName: '',
    };
  },
  methods: {},
  computed: {},
  mounted() {},
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    },
  },
};
</script>
<style lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
  // cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter {
  transform: translateX(100px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
