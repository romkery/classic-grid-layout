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
    <trash/>
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
import CocaCola from '@/modules/components/widgets/CocaCola.vue';
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
    CocaCola,
    WeekWeather
  }
})
export default class WidgetList extends Vue {

  @Prop({}) protected dragend!: any
  @Prop({}) protected drag!: any
  @Prop({}) protected deleteSelectedItems!: any

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

  p {
    color: #181818;
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
    overflow: scroll;
    margin-right: 10px;

    &::-webkit-scrollbar {
      display: none;
    }

    &-box {
      min-width: 200px;
      width: 100%;
      background: #85fcc9;
      border: 1px solid black;
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
