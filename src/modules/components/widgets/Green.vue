<template>
  <span>
    <DeleteAlert v-if="model?.props.isDeleteMode"/>
    <DefaultSkeleton v-if="model?.props.preview === 'skeleton' & model?.props.isLoading"/>
    <div class="widget"
         :style="styles()"
         v-if="!model?.props.isLoading & !model?.props.isDeleteMode">
    <img
      src="https://media.istockphoto.com/photos/green-apple-picture-id584226186?k=20&m=584226186&s=170667a&w=0&h=YaNNvCnxJR8-VVQX62PjEOxa2FhzY8whNfkrsr2FgUs="
      alt="cola">
    </div>
  </span>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Vue from 'vue';
import LayoutStorage, {LayoutItemType} from '@/modules/helpers/LayoutStorage';
import DefaultSkeleton from '@/common/mixins/DefaultSkeleton.vue';
import DeleteAlert from '@/common/mixins/DeleteAlert.vue';


@Component({
  components: {
    DeleteAlert,
    DefaultSkeleton
  }
})
export default class Green extends Vue {

  protected store = new LayoutStorage()

  @Prop({}) protected model!: LayoutItemType

  protected styles() {
    return {
      border: `${this.model?.props?.styleProps.border?.value}px solid ${this.model?.props?.styleProps.border.color}`,
      borderRadius: `${this.model?.props?.styleProps.borderRadius?.value}px`,
      background: this.model?.props?.styleProps.background?.color
    }
  }

  protected ownProperty = this.store.createNewWidget(2, 50, 'Green', 'skeleton',
    [
      {
        name: 'border',
        title: 'Рамка',
        el: 'slider',
        min: 10,
        max: 100,
        step: 4,
        value: 20,
        color: '#7eff19'
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
@import '../../../assets/styles/variables';

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
