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
        min: 10,
        max: 100,
        step: 4,
        value: 3,
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
        name: 'borderColor',
        title: 'Цвет рамки',
        el: 'borderColorPicker',
        color: '#1E90FFFF',
      }
    ])

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
