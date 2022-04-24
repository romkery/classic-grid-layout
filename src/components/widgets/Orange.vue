<template>
  <span>
    <DefaultSkeleton v-if="model.props.preview === 'skeleton' & model.props.loading"/>
    <div class="widget"
         :style="styles()"
         v-if="!model.props.loading">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/200px-Orange_logo.svg.png"
           alt="cola">
      <h2>Lorem Ipsum</h2>
    </div>
  </span>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Vue from 'vue';
import LayoutStorage, {ILayoutItem} from '@/helpers/LayoutStorage';
import DefaultSkeleton from '@/components/mixins/DefaultSkeleton.vue';


@Component({
  components: {
    DefaultSkeleton
  }
})
export default class Orange extends Vue {

  protected store = new LayoutStorage()

  @Prop({}) protected model!: ILayoutItem

  protected styles() {
    return {
      border: `${this.model.props.styleProps.border?.value}px solid ${this.model?.props.styleProps.border.color}`,
      borderRadius: `${this.model.props.styleProps.borderRadius?.value}px`,
      background: this.model.props.styleProps.background?.color
    }
  }

}

</script>


<style lang="scss" scoped>
@import './../../styles/variables.scss';

h1 {
}

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
