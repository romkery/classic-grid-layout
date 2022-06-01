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
@import '../../assets/styles/variables';

.widget-skeleton {
  height: $grid-content-height;
  border: 1px solid black;
  border-radius: 10px;
  background: white;
  overflow: hidden;
  padding: 10px;

  .item-skeleton {
    height: 100%;
  }

  &-img {
    width: 100%;
    height: 50%;
    margin-bottom: 10px;
  }
}


</style>
