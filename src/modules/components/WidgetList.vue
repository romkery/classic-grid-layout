<template>
  <div class="widgets">
    <div
      class="widgets__list"
    >
      <div
        class="widgets__list-box"
        v-for="(widget, index) in this.store.outerWidgets"
        :key='index'
        draggable="true"
        @drag="drag($event)"
        @dragend="dragend"
        @mouseenter="showPreview(true)"
        @mouseleave="showPreview(false)"
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
  @Prop({}) protected isDisablePreview!: boolean;

  protected store = new LayoutStorage()
  protected isShowPreview = false;

  protected showPreview(isShow: boolean) {
    if (this.isDisablePreview) return
    this.isShowPreview = isShow
    if (isShow) {
      document.querySelector<HTMLElement>('.widgets')!.style.height = "300px"
    } else {
      document.querySelector<HTMLElement>('.widgets')!.style.height = "45px"
    }
  }
}

</script>


<style lang="scss" scoped>
@use './src/scss/util' as u;
@import "./src/scss/globals";

.widgets {
  display: flex;
  width: 100%;
  height: u.rem(60);
  transition: all .8s ease-in-out;

  &__list {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: u.rem(45);
    gap: u.rem(10);
    margin: 0 u.rem(5);
    overflow-x: scroll;
    overflow-y: hidden;
    scrollbar-color: u.theme-var($--scrollbar-thumb-color) u.theme-var($--scrollbar-background-color);
    scrollbar-width: auto;

    &::-webkit-scrollbar {
      width: 10px;
      height: 5px;
    }

    &::-webkit-scrollbar-track {
      background: u.theme-var($--scrollbar-background-color);
    }

    &::-webkit-scrollbar-thumb {
      background-color: u.theme-var($--scrollbar-thumb-color);
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb {
      color: u.theme-var($--scrollbar-thumb-color);
    }

    &-box {
      width: 100%;
      min-width: u.rem(200);
      padding: u.rem(5);
      border: u.rem(1) solid lightgreen;
      border-radius: 10px;

      &-item {
        height: $grid-content-height;
        pointer-events: none;
      }

      p {
        line-height: 1;
        color: u.theme-var($--font-color);
        text-align: center;
        @include u.adaptive_font(25, 15);
      }
    }
  }
}

</style>
