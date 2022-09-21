<template>
  <div class="widget-skeleton">
    <el-skeleton animated :count=1 style="height: 100%">
      <template slot="template">
        <div class="item-skeleton">
          <el-skeleton-item
            variant="image"
            class="widget-skeleton-img"
          />
          <el-skeleton-item v-for="(item, index) in skeletonStripes"
                            :key="index"
                            class="widget-skeleton-stripes"
                            :style="{width: item.w + '%'}"/>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class DefaultSkeleton extends Vue {

  protected skeletonStripes = [{w: 35}, {w: 80}, {w: 60}]

}

</script>


<style lang="scss" scoped>
@import './src/scss/globals/variables';
@use './src/scss/util' as u;

.widget-skeleton {
  height: 100%;
  border: u.rem(1) solid black;
  border-radius: u.rem(10);
  background: white;
  overflow: hidden;
  padding: u.rem(10);

  .item-skeleton {
    height: 100%;
  }

  &-img {
    width: 100%;
    height: 50%;
    margin-bottom: u.rem(10);
  }
}


</style>
