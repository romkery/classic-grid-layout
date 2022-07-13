<template>
  <div class="widgets">
    <div class="widgets__title">
      <h3>Widgets:</h3>
      <el-tooltip content="Disable preview" placement="top">
        <el-switch
          v-model="isDisablePreview"
          active-color="#13ce66"
          inactive-color="#4287f5">
        </el-switch>
      </el-tooltip>
    </div>
    <div
      class="widgets__list"
      @mouseenter="showPreview(true)"
      @mouseleave="showPreview(false)"
    >
      <div
        class="widgets__list-box"
        v-for="(widget, index) in this.store.outerWidgets"
        :key='index'
        draggable="true"
        @drag="drag($event)"
        @dragend="dragend"
      >
        <p>{{ widget }}</p>
        <component
          :is="widget"
          v-show="isShowPreview"
          class="widgets__list-box-item"
        />
      </div>
    </div>
    <Trash :delete-selected-items="deleteSelectedItems"/>
  </div>
</template>


<script lang="ts">
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Vue from 'vue';
import Yellow from '@/modules/components/widgets/Yellow.vue';
import Black from '@/modules/components/widgets/Black.vue';
import LayoutStorage from '@/modules/helpers/LayoutStorage';
import TodayWeather from '@/modules/components/widgets/TodayWeather.vue';
import Green from '@/modules/components/widgets/Green.vue';
import Orange from '@/modules/components/widgets/Orange.vue';
import Blue from '@/modules/components/widgets/Blue.vue';
import WeekWeather from '@/modules/components/widgets/WeekWeather.vue';
import Trash from '@/modules/components/Trash.vue';

@Component({
  components: {
    Trash,
    Yellow,
    Black,
    TodayWeather,
    Orange,
    Green,
    Blue,
    WeekWeather
  }
})
export default class WidgetList extends Vue {

  @Prop({}) protected dragend!: any
  @Prop({}) protected drag!: any
  @Prop({}) protected deleteSelectedItems!: (state: string) => void;

  protected store = new LayoutStorage()
  protected isShowPreview = false;
  protected isDisablePreview = false;

  protected showPreview(isShow: boolean) {
    if (this.isDisablePreview) return
    this.isShowPreview = isShow
    if (isShow) {
      document.querySelector<HTMLElement>('.widgets')!.style.height = '300px'
    } else {
      document.querySelector<HTMLElement>('.widgets')!.style.height = '50px'
    }
  }
}

</script>


<style lang="less" scoped>

@import '../../assets/styles/_variables';

.widgets {
  width: 100%;
  display: flex;
  height: 50px;
  transition: all .5s;
  padding: 0 5px;

  p {
    color: white;
  }

  h3 {
    margin-left: 10px;
  }

  &__title {
    margin-right: 20px;

    .el-switch {
      margin-left: 10px;
    }
  }

  &__list {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-right: 10px;
    overflow: scroll;
    -ms-overflow-style: none; /* IE 11 */
    scrollbar-width: none; /* Firefox 64 */

    &::-webkit-scrollbar {
      display: none;
    }

    &-box {
      min-width: 200px;
      width: 100%;
      border: 1px solid lightgreen;
      border-radius: 10px;
      margin: 0 10px;
      padding: 10px 5px 5px 5px;

      &-item {
        height: @grid-content-height;
      }

      p {
        text-align: center;
      }
    }
  }
}

</style>
