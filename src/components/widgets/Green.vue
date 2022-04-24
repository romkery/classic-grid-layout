<template>
  <span>
    <DefaultSkeleton v-if="model.props.preview === 'skeleton' & model.props.loading"/>
    <div class="widget"
         :style="styles()"
         v-if="!model.props.loading">
    <img
      src="https://media.istockphoto.com/photos/green-apple-picture-id584226186?k=20&m=584226186&s=170667a&w=0&h=YaNNvCnxJR8-VVQX62PjEOxa2FhzY8whNfkrsr2FgUs="
      alt="cola">
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
export default class Green extends Vue {

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
