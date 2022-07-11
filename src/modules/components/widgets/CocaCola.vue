<template>
  <span>
    <DeleteAlert v-if="model?.props.isDeleteMode"/>
    <DefaultSkeleton v-if="model?.props.preview === 'skeleton' & model?.props.isLoading"/>
    <div class="widget"
         :style="getStyles()"
         v-if="!model?.props.isLoading">
      <img src="https://democrats.org/wp-content/uploads/2019/08/TeamBlue_gradient.png?w=300"
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
import getStyles from '@/modules/helpers/getStyles';

@Component({
  components: {
    DefaultSkeleton,
    DeleteAlert
  }
})
export default class CocaCola extends Vue {

  @Prop({}) protected model!: LayoutItemType

  protected store = new LayoutStorage()
  protected ownProperty = this.store.createNewWidget(2, 50, 'CocaCola', 'skeleton',
    [
      {
        name: 'border',
        title: 'Рамка',
        el: 'slider',
        min: 10,
        max: 100,
        step: 4,
        value: 20,
        color: '#2bffc7'
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

  protected getStyles = getStyles.bind(this)
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
