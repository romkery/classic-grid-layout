<template>
  <WidgetBasis :model="model">
    <div class="widget__content"
         v-if="!model?.props.isLoading"
         :style="getStyles()">
      <img
        src="https://i.gifer.com/WG8Q.gif"
        alt="cola">
    </div>
  </WidgetBasis>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import Vue from 'vue';
import LayoutStorage, {LayoutItemType} from '@/modules/helpers/LayoutStorage';
import DefaultSkeleton from '@/common/mixins/DefaultSkeleton.vue';
import DeleteAlert from '@/common/mixins/DeleteAlert.vue';
import {Prop} from 'vue-property-decorator';
import getStyles from '@/modules/helpers/getStyles';
import WidgetBasis from '@/modules/components/WidgetBasis.vue';


@Component({
  components: {
    WidgetBasis,
    DefaultSkeleton,
    DeleteAlert
  }
})
export default class Black extends Vue {

  @Prop({}) protected model!: LayoutItemType

  protected store = new LayoutStorage();
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
      },
      {
        name: 'background',
        title: 'Фон',
        el: 'colorPicker',
        color: '#212121',
      }])

  protected getStyles = getStyles.bind(this)

}

</script>


<style lang="less" scoped>
@import '../../../assets/styles/_variables';

.widget {
  &__content {
    height: 100%;

    img {
      width: 100%;
      height: 50%;
      object-fit: contain;
    }
  }
}


</style>
