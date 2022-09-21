<template>
  <div class="edit-forms">
    <div v-for="(prop, index) in model.props.styleProps"
         :key="index">
      {{ prop.title }} - {{ prop.value }}

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
