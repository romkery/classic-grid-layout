<template>
  <WidgetBasis :model="model">
    <div class="widget__content"
         :style="getStyles()"
         v-if="!model?.props.isLoading & !model?.props.isDeleteMode">
      <img
        src="https://www.psdgraphics.com/file/forward-one-hour.jpg"
        alt="cola">
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
    DeleteAlert,
    DefaultSkeleton
  }
})
export default class Green extends Vue {

  @Prop({}) protected model!: LayoutItemType

  protected store = new LayoutStorage()
  protected ownProperty = this.store.createNewWidget(2, 50, 'Green', 'skeleton',
    [
      {
        name: 'border',
        title: 'Рамка',
        el: 'slider',
        min: 0,
        max: 100,
        step: 1,
        value: 1,
        color: '#b7ff7d'
      },
      {
        name: 'borderRadius',
        title: 'Скругление углов',
        el: 'slider',
        min: 0,
        max: 100,
        step: 1,
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
        color: '#B7FF7DFF',
      }])

  protected getStyles = getStyles.bind(this)
}

</script>


<style lang="scss" scoped>
@use './src/scss/util' as u;

.widget {
  &__content {
    height: 100%;

    img {
      right: u.rem(10);
      width: 100%;
      height: 50%;
      object-fit: contain;
    }
  }
}

</style>
