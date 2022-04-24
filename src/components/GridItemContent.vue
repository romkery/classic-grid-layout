<template>
  <div style="height: inherit"
       class="widget-content"
       @mouseenter="setDragItem(model)"
       @mouseup="dragOutside(selectedDragItem)"
  >
    <div class="pin-icon-container">
      <div>
        <i class="el-icon-loading"
           @click="() =>
           {model.props.loading = ! model.props.loading; changeEvent(layout)}"
        />
        <i class="el-icon-setting"
           @click="setEditMode(model.i)"
        />
        <i class="el-icon-star-off" v-if="!model.static"
           @click="() => {model.static = true; changeEvent(layout)}"
        />
        <i class="el-icon-star-on" v-if="model.static"
           @click="() => {model.static = false; changeEvent(layout)}"/>
      </div>
    </div>
    <component
      :is="model.c"
      :model="model"
      :class="'grid-model-content'+ model.i"
    />
  </div>
</template>


<script lang="ts">
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Vue from 'vue';
import Yellow from '@/components/widgets/Yellow.vue';
import Pink from '@/components/widgets/Pink.vue';
import Orange from '@/components/widgets/Orange.vue';
import Green from '@/components/widgets/Green.vue';
import CocaCola from '@/components/widgets/CocaCola.vue';
import {LayoutItemType, LayoutType} from '@/helpers/LayoutStorage';

@Component({
  components: {
    CocaCola,
    Orange,
    Green,
    Yellow,
    Pink,
  }
})
export default class GridItemContent extends Vue {

  @Prop({}) protected model!: LayoutItemType
  @Prop({}) protected dragOutside!: any
  @Prop({}) protected setDragItem!: any
  @Prop({}) protected setEditMode!: any
  @Prop({}) protected changeEvent!: any
  @Prop({}) protected selectedDragItem!: LayoutItemType
  @Prop({}) protected layout!: LayoutType

}

</script>


<style lang="scss" scoped>

.widget-content {

  .pin-icon-container {
    display: flex;
    justify-content: space-between;

    i {
      cursor: pointer;
    }
  }
}

</style>
