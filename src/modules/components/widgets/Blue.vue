<template>
  <WidgetBasis :model="model">
    <div class="widget__content"
         :style="getStyles()"
         v-if="!model?.props.isLoading">
      <img src="https://i.gifer.com/1Pzk.gif"
           alt="squid">
    </div>
  </WidgetBasis>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Vue from 'vue';
import LayoutStorage, {LayoutItemType} from '@/modules/helpers/LayoutStorage';
import DefaultSkeleton from '@/common/mixins/DefaultSkeleton.vue';
import DeleteAlert from '@/common/mixins/DeleteAlert.vue';
import getStyles from '@/modules/helpers/getStyles';
import WidgetBasis from '@/common/mixins/WidgetBasis.vue';

@Component({
  components: {
    WidgetBasis,
    DefaultSkeleton,
    DeleteAlert
  }
})
export default class Blue extends Vue {

  @Prop({}) protected model!: LayoutItemType

  protected store = new LayoutStorage()
  protected ownProperty = this.store.createNewWidget(2, 50, 'Blue', 'skeleton',
    [
      {
        name: 'border',
        title: 'Рамка',
        el: 'slider',
        min: 1,
        max: 100,
        step: 2,
        value: 3,
        height: 100 %;
        color: '#1E90FFFF',
      },
      {
        name: 'borderRadius',
        title: 'Скругление углов',
        el: 'slider',
        min: 1,
        max: 100,
        step: 2,
        value: 20,
      },
      {
        name: 'background',
        title: 'Фон',
        el: 'colorPicker',
        color: '#212121',
      },
      {
        name: 'borderColor',
        title: 'Цвет рамки',
        el: 'borderColorPicker',
        color: '#1E90FFFF',
      }
    ])

  protected getStyles = getStyles.bind(this)
}
</script>


<style lang="scss" scoped>


.widget {
  &__content {

    img {
      width: 100%;
      height: 50%;
      object-fit: contain;
    }
  }
}

</style>
