<template>
  <div class="widget"
       :style="this.store.getStyles(this.myOwnProperty.props)">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/200px-Orange_logo.svg.png"
         alt="cola">
  </div>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import useForm from '@/components/EditForms.vue';
import {Prop} from 'vue-property-decorator';
import Vue from 'vue';
import LayoutStorage from '@/helpers/LayoutStorage';


@Component({
  components: {
    useForm
  }
})
export default class Yellow extends Vue {

  protected store = new LayoutStorage()

  @Prop({}) protected value!: any

  protected style: any

  protected myOwnProperty = this.store.createNewWidget('Green', [
    this.store.addNewProperty('border', 'Новый бордюр', 'slider', 10, 100, 4, 20, '#fc0303'),
    this.store.addNewProperty('borderRadius', 'Бордюр скруглился', 'slider', 10, 100, 1, 20)
  ])

  protected setMyProperty() {
    this.$emit('yellowValue', this.myOwnProperty)
    // this.value = this.myOwnProperty
  }

  created() {
    this.setMyProperty()
  }

}

</script>


<style scoped>

.widget {
  background: white;
  height: calc(100% - 24px);
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
