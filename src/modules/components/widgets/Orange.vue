<template>
  <WidgetBasis :model="model">
    <div class="widget__content"
         :style="getStyles()"
         v-if="!model?.props.isLoading">
      <img src="https://i.gifer.com/6vw5.gif"
           alt="pikachu">
      <div class="widget__text"
           @dblclick="isShowEdit = true">
        Text:
        <p>{{ inputText }}</p>
        <el-input
          type="textarea"
          placeholder="Please input"
          v-model="inputText"
          maxlength="50"
          show-word-limit
          v-if="isShowEdit"
          autocomplete="on"
          v-on:keyup.native.enter="isShowEdit = false"
        />
      </div>
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
export default class Orange extends Vue {

  @Prop({}) protected model!: LayoutItemType

  protected store = new LayoutStorage()
  protected ownProperty = this.store.createNewWidget(2, 50, 'Orange', 'skeleton',
    [
      {
        name: 'border',
        title: 'Рамка',
        el: 'slider',
        min: 1,
        max: 100,
        step: 1,
        value: 20,
        color: '#ff6200'
      },
      {
        name: 'borderRadius',
        title: 'Скругление углов',
        el: 'slider',
        min: 10,
        max: 100,
        step: 1,
        value: 20,
      }], 2, 50, 2, 40)
  protected isShowEdit: boolean = false;
  protected inputText: string = 'Double tap to change';

  protected getStyles = getStyles.bind(this)
}

</script>

<style lang="scss" scoped>


h1 {
}

.widget {
  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;

    img {
      width: 100%;
      height: 50%;
      object-fit: contain;
    }
  }

  &__text {
    align-items: center;
    font-size: 0.7rem;
    word-break: break-word;
    cursor: pointer;
    margin: 10px;

    .el-textarea {
      position: absolute;
    }
  }
}
</style>
