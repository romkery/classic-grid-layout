<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import './scss/styles.scss';
import Vue from 'vue';

export default Vue.component('App', {

  components: {},

  data() {
    return {};
  },

  computed: {},
  mounted() {
  },
  methods: {}
});
</script>


<style lang="scss">
@import './assets/fonts/fonts.css';

.el-skeleton {
  height: 100%;
}

img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}

</style>
