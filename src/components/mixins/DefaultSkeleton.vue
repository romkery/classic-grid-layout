<template>
  <div class="widget-skeleton">
    <el-skeleton animated :count=1>
      <template slot="template">
        <div class="item-skeleton"
             :style="getSkeletonItemStyle()">
          <div class="widget-skeleton-img">
            <el-skeleton-item variant="image"
                              :style="getSkeletonImgStyle()"/>
          </div>
          <div>
            <p v-for="(item, index) in skeletonStrings" :key="index">
              <el-skeleton-item :style="getSkeletonStringsStyle(item)"/>
            </p>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';

@Component
export default class DefaultSkeleton extends Vue {

  @Prop({default: {}}) protected value?: any
  @Prop({default: {}}) protected item!: any

  protected getSkeletonStringsStyle(item: any) {
    return {
      margin: `0 ${this.value?.styleProps[0].params.value}px`,
      minWidth: `${item.minW}px`,
      width: `calc(100% - ${this.value?.styleProps[0].params.value * 2}px - ${item.width}%)`
    }
  }

  protected getSkeletonItemStyle() {
    return {
      padding: `${this.value?.styleProps[0].params.value! < 10 ?
        10 - this.value?.styleProps[0].params.value!
        : 0}px`
    }
  }

  protected getSkeletonImgStyle() {
    return {
      marginTop: `${this.value?.styleProps[0].params.value}px`,
      width: `calc(100% - ${this.value?.styleProps[0].params.value * 2}px)`,
      height: `${this.item?.h * 9 / 2}px`
    }
  }

  protected skeletonStrings = [
    {minW: 15, width: 35},
    {minW: 10, width: 50},
    {minW: 20, width: 10}
  ]

}

</script>


<style lang="scss" scoped>

.widget-skeleton {
  height: calc(100% - 26px);
  border: 1px solid black;
  border-radius: 10px;
  background: white;
  overflow: hidden;

  &-img {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }

  p {
    margin-top: 3px;
  }

}


</style>
