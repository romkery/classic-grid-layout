<template>
  <WidgetBasis :model="model">
    <div class="widget__content"
         v-if="!model?.props.isLoading"
         :style="getStyles()">
      <img
        src="https://developer.apple.com/design/human-interface-guidelines/components/system-experiences/widgets/images/multiple-tap-targets_2x.png"
        alt="chick">
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
import WidgetBasis from '@/common/mixins/WidgetBasis.vue';

@Component({
  components: {
    WidgetBasis,
    DefaultSkeleton,
    DeleteAlert
  }
})
export default class Yellow extends Vue {

  @Prop({}) protected model!: LayoutItemType

  protected store = new LayoutStorage()
  protected ownProperty: LayoutItemType = this.store.createNewWidget(2, 50, 'Yellow', 'skeleton',
    [
      {
        name: 'border',
        title: 'Рамка',
        el: 'slider',
        min: 1,
        max: 100,
        step: 2,
        value: 3,
        color: '#ffe21c',
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
        color: '#ffe21c',
      }
    ]
  )

  protected getStyles = getStyles.bind(this)
}
</script>

<style lang="scss" scoped>


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
