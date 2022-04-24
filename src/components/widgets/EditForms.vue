<template>
  <div class="edit-forms">
    <div v-for="(prop, index) in this.model.props.styleProps" :key="index">
      {{ prop.title }} - {{ prop.value }}
      <el-slider v-if="prop.el === 'slider'"
                 :max="prop.params.max"
                 :min="prop.params.min"
                 :step="prop.params.step"
                 :disabled="model.props.loading"
                 :format-tooltip="formatTooltip"
                 :value="prop.value"
                 @input="store.setStyleValues($event, prop, selectedItem, 'value')"
      />
      <el-color-picker v-if="prop.el === 'colorPicker'"
                       :style="{top: '12px'}"
                       :disabled="model.props.loading"
                       :value="prop.color"
                       @input="store.setStyleValues($event, prop, selectedItem, 'color')"
      />
    </div>
  </div>
</template>


<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';
import LayoutStorage, {ILayoutItem} from '@/helpers/LayoutStorage';

@Component
export default class EditForms extends Vue {

  @Prop() model!: ILayoutItem
  @Prop() layout!: any

  protected store = new LayoutStorage()
  protected selectedItem = {}

  protected formatTooltip(val: number
  ) {
    return val;
  }

  created() {
    this.selectedItem = this.layout.find((el: any) => el.i === this.model.i)
  }
}

</script>

<style lang="scss" scoped>

</style>
