<template>
  <span>
    <DefaultSkeleton :value='myOwnProperty.props'
                     :item="myOwnProperty"
                     v-if="myOwnProperty.props.preview === 'skeleton' &
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


@Component({
  components: {
    useForm,
    DefaultSkeleton
  }
})
export default class Yellow extends Vue {

  protected store = new LayoutStorage()

  protected style: any

  protected myOwnProperty = this.store.createNewWidget('Green', 'skeleton', [
    this.store.addNewProperty('border', 'Рамка', 'slider', 10, 100, 4, 20, '#fc0303'),
    this.store.addNewProperty('borderRadius', 'Скругление углов', 'slider', 10, 100, 1, 20)
  ])

}

</script>


<style scoped>

.widget {
  background: white;
  height: calc(100% - 26px);
  padding: 10px;
}

img {
  width: 100%;
  height: 50%;
  object-fit: contain;
}

</style>
