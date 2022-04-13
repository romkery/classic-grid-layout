<template>
  <el-skeleton animated :count=1 v-if="loading">
    <template slot="template">
      <div class="item-skeleton" :style="{height: item.h * 10.28 + 'px'}">
        <el-skeleton-item variant="image"
                          :style="{
                  marginTop: `${value[0].params.value + 20}px`,
                                  width: `calc(100% - ${value[0].params.value * 2}px)`,
                                  height: `${item.h * 9/2}px`}"/>
        <!--        <el-skeleton-item/>-->
      </div>
    </template>
  </el-skeleton>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';

@Component
export default class DefaultSkeleton extends Vue {

  @Prop() protected loading!: any

  @Prop({}) protected item!: any

  @Prop({}) protected value!: any


}

</script>


<style scoped>

.item-skeleton {
  border: 1px solid black;
  border-radius: 15px;
  display: flex;
  justify-content: center;
}


</style>
