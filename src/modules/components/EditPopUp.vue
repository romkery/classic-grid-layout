<template>
  <div class="pop-up-mode"
       v-if="innerIsEdit"
  >
    <el-drawer
      :size="'20%'"
      :visible.sync="innerIsEdit"
      :close-on-press-escape="true"
      :with-header="false"
      @close="changeEvent(layout)"
    >
      <div class="pop-up-mode-content">
        <EditForms :model="model"
                   :layout="layout"
                   :change-event="changeEvent"
        />
      </div>
    </el-drawer>
    <div class="pop-up-mode-item">
      <component
        :is="model.c"
        :itemProps="model.props"
        :model="model"
      />
    </div>
  </div>
</template>

<script lang="ts">

import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import Vue from 'vue';
import CocaCola from '@/modules/components/widgets/CocaCola.vue';
import Orange from '@/modules/components/widgets/Orange.vue';
import Green from '@/modules/components/widgets/Green.vue';
import Yellow from '@/modules/components/widgets/Yellow.vue';
import Black from '@/modules/components/widgets/Black.vue';
import EditForms from '@/modules/components/widgets/EditForms.vue';
import {LayoutItemType, LayoutType} from '@/modules/helpers/LayoutStorage';
import TodayWeather from '@/modules/components/widgets/TodayWeather.vue';


@Component({
  components: {
    CocaCola,
    Orange,
    Green,
    Yellow,
    Black,
    EditForms,
    TodayWeather
  }
})
export default class EditPopUp extends Vue {

  @Prop({}) protected model!: LayoutItemType
  @Prop({}) protected changeEvent!: any
  @Prop({}) protected layout!: LayoutType
  @Prop({}) protected isEdit!: boolean

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
