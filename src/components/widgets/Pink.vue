<template>
  <span>
    <DefaultSkeleton v-if="myOwnProperty.props.preview === 'skeleton' & myOwnProperty.props.loading"/>
    <div class="widget"
         v-if="!myOwnProperty.props.loading"
         :style="styles()">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/200px-Orange_logo.svg.png"
           alt="cola">
    </div>
  </span>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import Vue from 'vue';
import LayoutStorage from '@/helpers/LayoutStorage';
import DefaultSkeleton from '@/components/mixins/DefaultSkeleton.vue';


@Component({
  components: {
    DefaultSkeleton
  }
})
export default class Pink extends Vue {

  protected store = new LayoutStorage()

  protected styles() {
    return {
      border: `${this.myOwnProperty.props?.styleProps.border?.value}px solid ${this.myOwnProperty.props?.styleProps.border?.color}`,
      borderRadius: `${this.myOwnProperty.props?.styleProps.borderRadius?.value}px`,
      background: this.myOwnProperty.props?.styleProps.background?.color
    }
  }

  protected myOwnProperty = this.store.createNewWidget('Green', 'skeleton',
    [
      {
        name: 'border',
        title: 'Рамка',
        el: 'slider',
        min: 10,
        max: 100,
        step: 4,
        value: 20,
        color: '#59ff0f'
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
