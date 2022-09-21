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
      <el-tooltip content="Dark theme" placement="top">
        <el-switch
          v-model="isDark"
          active-color="#13ce66"
          inactive-color="#4287f5"
          @change="toggleTheme">
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

  protected isDark: boolean = false;

  protected toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.getElementsByTagName('html')[0].classList.remove('dark');
      document.getElementsByTagName('html')[0].setAttribute('class', 'light');
    } else {
      document.getElementsByTagName('html')[0].classList.remove('light');
      document.getElementsByTagName('html')[0].setAttribute('class', 'dark');
    }
    this.isDark = !this.isDark;
  }

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


<style lang="scss" scoped>
@use './src/scss/util' as u;
@import './src/scss/globals/variables';

.widgets {
  display: flex;
  width: 100%;
  height: u.rem(50);
  padding: 0 u.rem(5);
  transition: all .5s;

  p {
    color: white;
  }

  h3 {
    margin-left: u.rem(10);
  }

  &__title {
    margin-right: u.rem(20);

    .el-switch {
      margin-left: u.rem(10);
    }
  }

  &__list {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-right: u.rem(10);
    overflow: scroll;
    -ms-overflow-style: none; /* IE 11 */
    scrollbar-width: none; /* Firefox 64 */

    &::-webkit-scrollbar {
      display: none;
    }

    &-box {
      width: 100%;
      min-width: u.rem(200);
      padding: u.rem(10) u.rem(5) u.rem(5) u.rem(5);
      margin: 0 u.rem(10);
      border: u.rem(1) solid lightgreen;
      border-radius: 10px;

      &-item {
        height: $grid-content-height;
        pointer-events: none;
      }

      p {
        text-align: center;
      }
    }
  }
}

</style>
