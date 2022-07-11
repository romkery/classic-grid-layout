<template>
  <span>
    <DeleteAlert v-if="model?.props.isDeleteMode"/>
    <DefaultSkeleton v-if="model?.props.preview === 'skeleton' & model?.props.isLoading"/>
    <div class="widget"
         v-if="!model?.props.isLoading"
         :style="getStyles()">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLXuSFEShPYz9wzfOwIiuJaJ9JdGSmWFfn_YykysuXfQ&s"
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
import getStyles from '@/modules/helpers/getStyles';

@Component({
  components: {
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
        min: 10,
        max: 100,
        step: 4,
        value: 20,
        color: '#ff7d7d',
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
        color: '#ffe21c',
      }
    ]
  )

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
