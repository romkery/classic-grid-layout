<template>
  <div class="block">
    <span class="demonstration"></span>
    <div v-for="item in this.value">
      {{ item.title }} - {{ item.params.value }}
      <el-slider v-if="item.el === 'slider'"
                 v-model="item.params.value"
                 :format-tooltip="formatTooltip"
                 :max="item.params.max"
                 :min="item.params.min"
                 :step="item.params.step"
      />
      <el-color-picker v-if="item.el === 'colorPicker'"
                       v-model="item.params.color"
                       :style="{top: '12px'}"/>
    </div>
    <!--    <div>borderColor - -->
    <!--      <el-color-picker style="top:8px" size="mini" v-model="value.border.color"></el-color-picker>-->
    <!--    </div>-->
    <!--    <div>static - -->
    <!--      <el-switch v-model="value.static"></el-switch>-->
    <!--    </div>-->
    <!--    <div>color - -->
    <!--      <el-color-picker style="top:8px" size="mini" v-model="value.background"></el-color-picker>-->
    <!--    </div>-->
  </div>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';

@Component
export default class useForm extends Vue {

  @Prop() value!: any

  protected propsKeys: any

  protected formatTooltip(val: number) {
    return val;
  }

  created() {
  }

}

</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css");
</style>
