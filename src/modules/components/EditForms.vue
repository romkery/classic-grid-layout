<template>
  <div class="edit-forms">
    <div v-for="(prop, index) in model.props.styleProps"
         :key="index">
      {{ prop.title }} - {{ prop.value }}
      <el-slider
        v-if="prop.el === 'slider'"
        :max="prop.params.max"
        :min="prop.params.min"
        :step="prop.params.step"
        :disabled="model.props.isLoading"
        :format-tooltip="formatTooltip"
        :value="prop.value"
        @input="store.setStyleValues($event, prop, +model.i, 'value', layout, changeEvent)"
      />
      <el-color-picker
        v-if="prop.el === 'colorPicker'"
        :style="{top: '12px'}"
        :disabled="model.props.isLoading"
        :value="prop.color"
        @input="store.setStyleValues($event, prop, +model.i, 'color', layout, changeEvent)"
      />
      <el-color-picker
        v-if="prop.el === 'borderColorPicker'"
        :style="{top: '12px'}"
        :disabled="model.props.isLoading"
        :value="prop.color"
        @input="store.setStyleValues($event, prop, +model.i, 'color', layout, changeEvent)"
      />
    </div>
  </div>
</template>


<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';
import LayoutStorage, {LayoutItemType, LayoutType} from '@/modules/helpers/LayoutStorage';

@Component
export default class EditForms extends Vue {

  @Prop({}) model!: LayoutItemType
  @Prop({}) layout!: LayoutType
  @Prop({}) changeEvent!: void

  protected store = new LayoutStorage()

  protected formatTooltip(val: number) {
    return val;
  }
}

</script>

<style lang="scss" scoped>


.edit-forms {
  color: #222222;
}

</style>
