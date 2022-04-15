<template>
  <div class="block">
    <span class="demonstration"></span>
    <div v-for="prop in this.value">
      {{ prop.title }} - {{ prop.params.value }}
      <el-slider v-if="prop.el === 'slider'"
                 v-model="prop.params.value"
                 :format-tooltip="formatTooltip"
                 :max="prop.params.max"
                 :min="prop.params.min"
                 :step="prop.params.step"
                 :disabled="item.props.loading"
      />
      <el-color-picker v-if="prop.el === 'colorPicker'"
                       v-model="prop.params.color"
                       :style="{top: '12px'}"
                       :disabled="item.props.loading"/>
    </div>
  </div>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';

@Component
export default class useForm extends Vue {

  @Prop() value!: any

  @Prop() item!: any
  
  protected formatTooltip(val: number) {
    return val;
  }
}

</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css");
</style>
