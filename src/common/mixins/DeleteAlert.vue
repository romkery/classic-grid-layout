<template>
  <div class="delete">
    <i class="el-icon-delete"></i>
  </div>
</template>

<script lang="ts">

import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class DeleteAlert extends Vue {

}

</script>


<style lang="less" scoped>
@import '../../assets/styles/_variables';

.delete {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    transition: 200ms;
    font-size: 100px;
    color: #c0c0c0;
    margin-bottom: @grid-item-header-margin;
    animation: show 1s 1; /* Указываем название анимации, её время и количество повторов*/
    animation-fill-mode: forwards; /* Чтобы элемент оставался в конечном состоянии анимации */
  }
}

@keyframes show {
  0% {
    opacity: 0;
    color: #c0c0c0;
  }
  100% {
    opacity: 1;
    color: #ff0626;
  }
}

</style>
