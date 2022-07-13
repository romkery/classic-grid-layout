<template>
  <div
    class="pop-up-mode"
    v-if="innerIsEdit"
  >
    <el-drawer
      class="pop-up-mode_sidebar"
      :size="'20%'"
      :visible.sync="innerIsEdit"
      :close-on-press-escape="true"
      :with-header="false"
      @close="changeEvent(layout)"
    >
      <EditForms
        class="pop-up-mode_sidebar-content"
        :model="model"
        :layout="layout"
        :change-event="changeEvent"
      />
    </el-drawer>
    <div class="pop-up-mode_item">
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
import Blue from '@/modules/components/widgets/Blue.vue';
import Orange from '@/modules/components/widgets/Orange.vue';
import Green from '@/modules/components/widgets/Green.vue';
import Yellow from '@/modules/components/widgets/Yellow.vue';
import Black from '@/modules/components/widgets/Black.vue';
import EditForms from '@/modules/components/EditForms.vue';
import {LayoutItemType, LayoutType} from '@/modules/helpers/LayoutStorage';
import TodayWeather from '@/modules/components/widgets/TodayWeather.vue';
import WeekWeather from '@/modules/components/widgets/WeekWeather.vue';


@Component({
  components: {
    Blue,
    Orange,
    Green,
    Yellow,
    Black,
    EditForms,
    TodayWeather,
    WeekWeather
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


<style lang="less" scoped>

.pop-up-mode {

  &_sidebar {
    position: fixed;
    padding: 10px;

    &-content {
      padding: 20px;
    }
  }

  &_item {
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
