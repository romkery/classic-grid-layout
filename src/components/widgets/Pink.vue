<template>
  <span>
    <DeleteAlert v-if="model?.props.isDeleteMode"/>
    <DefaultSkeleton v-if="model?.props.preview === 'skeleton' & model?.props.loading"/>
    <div class="widget"
         v-if="!model?.props.loading"
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
import LayoutStorage, {LayoutItemType} from '@/helpers/LayoutStorage';
import DefaultSkeleton from '@/components/mixins/DefaultSkeleton.vue';
import DeleteAlert from '@/components/mixins/DeleteAlert.vue';
import {Prop} from 'vue-property-decorator';


@Component({
  components: {
    DefaultSkeleton,
    DeleteAlert
  }
})
export default class Pink extends Vue {

  protected store = new LayoutStorage()
  @Prop({}) protected model!: LayoutItemType

  protected styles() {
    return {
      border: `${this.model?.props?.styleProps.border?.value}px solid ${this.model?.props?.styleProps.border?.color}`,
      borderRadius: `${this.model?.props?.styleProps.borderRadius?.value}px`,
      background: this.model?.props?.styleProps.background?.color
    }
  }

  protected myOwnProperty = this.store.createNewWidget('Pink', 'skeleton',
    [
      {
        name: 'border',
        title: 'Рамка',
        el: 'slider',
        min: 10,
        max: 100,
        step: 4,
        value: 20,
        color: '#ff24ba'
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


<style lang="scss" scoped>
@import './../../styles/variables.scss';

.widget {
  background: white;
  height: $grid-content-height;
  padding: 10px;
}

img {
  width: 100%;
  height: 50%;
  object-fit: contain;
}

</style>
