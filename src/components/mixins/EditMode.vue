<template>
  <!--  &lt;!&ndash;  <div class="greetings">&ndash;&gt;-->
  <!--  &lt;!&ndash;    hello&ndash;&gt;-->
  <!--  &lt;!&ndash;  </div>&ndash;&gt;-->
</template>


<script lang="ts">

import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class EditMode extends Vue {


}

</script>


<style scoped>

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    display: block;
    text-align: left;
  }
}
</style>
