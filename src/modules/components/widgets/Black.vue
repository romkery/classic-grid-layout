<template>
  <span>
    <DeleteAlert v-if="model?.props.isDeleteMode"/>
    <DefaultSkeleton v-if="model?.props.preview === 'skeleton' & model?.props.isLoading"/>
    <div class="widget"
         v-if="!model?.props.isLoading"
         :style="styles()">
      <img
        src="data:image/png;base64,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"
        alt="cola">
    </div>
  </span>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import Vue from 'vue';
import LayoutStorage, {LayoutItemType} from '@/modules/helpers/LayoutStorage';
import DefaultSkeleton from '@/common/mixins/DefaultSkeleton.vue';
import DeleteAlert from '@/common/mixins/DeleteAlert.vue';
import {Prop} from 'vue-property-decorator';


@Component({
  components: {
    DefaultSkeleton,
    DeleteAlert
  }
})
export default class Black extends Vue {

  protected store = new LayoutStorage()
  @Prop({}) protected model!: LayoutItemType

  protected styles() {
    return {
      border: `${this.model?.props?.styleProps.border?.value}px solid ${this.model?.props?.styleProps.border?.color}`,
      borderRadius: `${this.model?.props?.styleProps.borderRadius?.value}px`,
      background: this.model?.props?.styleProps.background?.color
    }
  }

  protected ownProperty = this.store.createNewWidget(2, 50, 'Black', 'skeleton',
    [
      {
        name: 'border',
        title: 'Рамка',
        el: 'slider',
        min: 10,
        max: 100,
        step: 4,
        value: 20,
        color: '#000000'
      },
      {
        name: 'borderRadius',
        title: 'Скругление углов',
        el: 'slider',
        min: 10,
        max: 100,
        step: 1,
        value: 20,
      }])

}

</script>


<style lang="less" scoped>
@import '../../../assets/styles/_variables';

.widget {
  background: white;
  height: @grid-content-height;
  padding: 10px;
}

img {
  width: 100%;
  height: 50%;
  object-fit: contain;
}

</style>
