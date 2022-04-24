<template>
  <div class="pop-up-mode"
       v-if="innerIsEdit">
    <el-drawer
      :size="'20%'"
      :visible.sync="innerIsEdit"
      :close-on-press-escape="true"
      :with-header="false"
      @close="changeEvent(layout)"
    >
      <div class="pop-up-mode-content">
        <EditForms :model="model" :layout.sync="layout"/>
      </div>
    </el-drawer>
    <div class="pop-up-mode-item">
      <component
        :is="selectedDragItem.c"
        :itemProps="selectedDragItem.props"
        :model="model"/>
    </div>
  </div>
</template>

<script lang="ts">

import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import Vue from 'vue';
import CocaCola from '@/components/widgets/CocaCola.vue';
import Orange from '@/components/widgets/Orange.vue';
import Green from '@/components/widgets/Green.vue';
import Yellow from '@/components/widgets/Yellow.vue';
import Pink from '@/components/widgets/Pink.vue';
import EditForms from '@/components/widgets/EditForms.vue';


@Component({
  components: {
    CocaCola,
    Orange,
    Green,
    Yellow,
    Pink,
    EditForms
  }
})
export default class EditPopUp extends Vue {

  @Prop({}) protected model!: any
  @Prop({}) protected selectedDragItem!: any
  @Prop({}) protected changeEvent!: any
  @Prop({}) protected layout!: any
  @Prop({}) protected isEdit!: any

  protected innerIsEdit: boolean = false

  @Watch('isEdit')
  setIsEdit() {
    this.innerIsEdit = this.isEdit
  }

  @Watch('innerIsEdit')
  emitUpdateIsEdit() {
    this.$emit('update:isEdit', this.innerIsEdit)
  }

}

</script>


<style lang="scss" scoped>

.pop-up-mode {

  &-content {
    padding: 20px;
  }

  &-item {
    max-width: 400px;
    max-height: 600px;
    height: 100%;
    width: 100%;
    position: fixed;
    top: calc(50% - (300px));
    left: calc(50% - (300px));
    z-index: 20000;
  }
}

</style>
