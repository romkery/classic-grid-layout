<template>
  <div style="height: inherit"
       class="widget-content"
       @mouseenter="setDragItem(item)"
       @mouseup="dragOutside(selectedDragItem)"
  >
    <div class="pin-icon-container">
      <div>
        <i class="el-icon-loading"
           @click="() =>
           {item.props.loading = ! item.props.loading; changeEvent(layout)}"
        />
        <i class="el-icon-setting"
           @click="setEditMode(item.i)"
        />
        <i class="el-icon-star-off" v-if="!item.static"
           @click="() => {item.static = true; changeEvent(layout)}"
        />
        <i class="el-icon-star-on" v-if="item.static"
           @click="() => {item.static = false; changeEvent(layout)}"/>
      </div>
    </div>
    <component
      :is="item.c"
      v-model="item.props"
      :item="item"
      :class="'grid-item-content'+ item.i"
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

  @Prop({}) protected item!: any
  @Prop({}) protected dragOutside!: any
  @Prop({}) protected setDragItem!: any
  @Prop({}) protected setEditMode!: any
  @Prop({}) protected changeEvent!: any
  @Prop({}) protected selectedDragItem!: any
  @Prop({}) protected layout!: any

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
