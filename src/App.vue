<template>
  <div id="app">
    <MainLayout/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import './scss/styles.scss'
import MainLayout from './views/MainLayout.vue';

export default Vue.component('App', {

  components: {
    MainLayout
  },

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

.el-skeleton {
  height: 100%;
}


</style>
