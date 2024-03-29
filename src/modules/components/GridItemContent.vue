<template>
  <div
    class="container"
    draggable="true"
    @mouseenter="setDragItem(model)"
    @mousemove="dragOutside('check')"
    @mouseup="dragOutside('delete')"
    @click.shift="selectComponent"
  >
    <div
      v-show="selectionMode"
      class="selection"
    />
    <div class="pin-icon-container">
      <div>
        <i class="el-icon-loading"
           @click="() => {model.props.isLoading = !model.props.isLoading; changeEvent(layout)}"
        />
        <i class="el-icon-setting"
           @click="setEditMode(model.i)"
        />
        <i class="el-icon-star-off"
           v-if="!model.isStatic"
           @click="setIsStatic(true)"
        />
        <i class="el-icon-star-on"
           v-if="model.isStatic"
           @click="setIsStatic(false)"
        />
      </div>
      <i class="el-icon-delete"
         @click="deleteOneItem('delete')"
      />
    </div>
    <component
      :class="'grid-model-content'+ model.i"
      :is="model.c"
      :model="model"
      :layout="layout"
      :change-event="changeEvent"
    />
  </div>
</template>


<script lang="ts">
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Vue from 'vue';
import Yellow from '@/modules/components/widgets/Yellow.vue';
import Black from '@/modules/components/widgets/Black.vue';
import Orange from '@/modules/components/widgets/Orange.vue';
import Green from '@/modules/components/widgets/Green.vue';
import Blue from '@/modules/components/widgets/Blue.vue';
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
    TodayWeather,
    WeekWeather
  }
})
export default class GridItemContent extends Vue {

  @Prop({}) protected model!: LayoutItemType
  @Prop({}) protected dragOutside!: any
  @Prop({}) protected setDragItem!: any
  @Prop({}) protected setEditMode!: any
  @Prop({}) protected changeEvent!: any
  @Prop({}) protected dragItem!: LayoutItemType
  @Prop({}) protected layout!: LayoutType
  @Prop({}) protected setSelectedItems!: any
  @Prop({}) protected deleteOneItem!: any

  protected selectionMode = false;

  protected setIsStatic(isStatic: boolean) {
    this.model.isStatic = isStatic;
    this.changeEvent(this.layout);
  };

  protected selectComponent() {
    if (!this.selectionMode) {
      this.setSelectedItems(this.model.i)
      this.selectionMode = true
    } else {
      this.selectionMode = false
      this.setSelectedItems(this.model.i)
    }
  };
};

</script>


<style lang="scss" scoped>
@use './src/scss/util' as u;

@import './src/scss/globals';

.container {
  height: inherit;

  .pin-icon-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 u.rem(2);

    i {
      cursor: pointer;
      color: u.theme-var($--font-color);
    }
  }
}

.selection {
  position: absolute;
  width: 100%;
  border: u.rem(1) solid red;
}

</style>
