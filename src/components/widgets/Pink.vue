<template>
  <span>
    <DefaultSkeleton v-if="myOwnProperty.props.preview === 'skeleton' &
                         myOwnProperty.props.loading"/>
    <div class="widget"
         v-if="!myOwnProperty.props.loading"
         :style="this.store.getStyles(this.myOwnProperty.props.styleProps)">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/200px-Orange_logo.svg.png"
           alt="cola">
    </div>
  </span>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import useForm from '@/components/widgets/EditForms.vue';
import Vue from 'vue';
import LayoutStorage from '@/helpers/LayoutStorage';
import DefaultSkeleton from '@/components/mixins/DefaultSkeleton.vue';
import {Prop} from 'vue-property-decorator';


@Component({
  components: {
    useForm,
    DefaultSkeleton
  }
})
export default class Pink extends Vue {

  @Prop() protected value!: any

  @Prop() protected item!: any

  protected store = new LayoutStorage()

  protected style: any

  protected myOwnProperty = this.store.createNewWidget('Green', 'skeleton', [
    this.store.addNewProperty('border', 'Рамка', 'slider', 10, 100, 4, 20, '#ff5297'),
    this.store.addNewProperty('borderRadius', 'Скругление углов', 'slider', 10, 100, 1, 20)
  ])
}

</script>


<style lang="scss" scoped>
@import './../../styles/variables.scss';

.widget {
  background: white;
  height: $grid-content-height;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*right: 10px;*/
  /*bottom: 10px;*/
  padding: 10px;
}

img {
  width: 100%;
  height: 50%;
  object-fit: contain;
}

</style>
