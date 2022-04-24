<script setup lang="ts"></script>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import '@/assets/base.css';
@import url("//unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css");

.el-skeleton {
  height: 100%;
}

#app {
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

</style>
