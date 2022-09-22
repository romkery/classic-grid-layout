<template>
  <div class="header">
    <div class="header__search">
      <el-autocomplete
        class="header__search-input"
        placeholder="Please input city"
        v-model="input"
        type="text"
        :fetch-suggestions="querySearch"
        @select="selectCity"
      >
        <i
          slot="suffix"
          class="el-input__icon el-icon-search">
        </i>
      </el-autocomplete>
    </div>
    <div class="header__title">
      <p>{{ weatherModule.city }}</p>
      <div class="header__title-switch">
        <el-tooltip content="Disable preview" placement="bottom">
          <el-switch
            v-model="isDisablePreview"
            active-color="#bdbdbd"
            inactive-color="#3d3d3d">
          </el-switch>
        </el-tooltip>
        <el-tooltip content="Dark theme" placement="bottom">
          <el-switch
            v-model="isDark"
            active-color="#bdbdbd"
            inactive-color="#3d3d3d"
            @change="toggleTheme">
          </el-switch>
        </el-tooltip>
      </div>
    </div>
    <div class="header__widget-list">
      <widget-list
        :drag="drag"
        :dragend="dragend"
        :deleteSelectedItems="deleteSelectedItems"
        :isDisablePreview="isDisablePreview"
      />
    </div>
  </div>
</template>

<script lang="ts">

import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Vue from 'vue';
import WidgetList from '@/modules/components/WidgetList.vue';
import WeatherModule from '@/store/modules/WeatherModule';
import {useModule} from 'vuex-simple';

@Component({
  components: {
    WidgetList
  }
})
export default class Header extends Vue {

  @Prop({}) protected drag!: void;
  @Prop({}) protected dragend!: void;
  @Prop({}) protected deleteSelectedItems!: void;

  protected weatherModule?: WeatherModule = useModule(this.$store, ['weatherModule']);
  protected input: string = '';

  protected selectCity(city: any) {
    this.weatherModule?.setCity(city.value);
    this.input = '';
  }

  protected async querySearch(query: string, callback: any) {
    callback(await this.weatherModule?.getAutocompleteCities(query));
  }

  protected isDisablePreview = false;

  protected isDark: boolean = true;

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

  created() {
    document.getElementsByTagName('html')[0].setAttribute('class', 'dark');
  }
}

</script>


<style lang="scss" scoped>
@use './src/scss/util' as u;
@import './src/scss/globals';

@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
  .header {
    box-sizing: border-box;
    background-color: #212121B3;
    background-blend-mode: overlay;
    -webkit-backdrop-filter: blur(33px);
    backdrop-filter: blur(33px);
  }
}


.header {
  position: sticky;
  top: 0;
  display: block;
  z-index: 2;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: u.rem(10);
  //margin: 0 u.rem(10);

  box-shadow: 0 u.rem(10) u.rem(15) rgb(0 0 0 / 20%);
  background-color: u.theme-var($--background-header);
  border-right: u.rem(1) solid black;
  border-bottom: u.rem(1) solid;
  border-left: u.rem(1) solid black;
  border-bottom-right-radius: u.rem(12);
  border-bottom-left-radius: u.rem(12);
  color: u.theme-var($--font-color);

  &__search {
    padding: 0 u.rem(5);

    &-input {
      width: 100%;
    }
  }

  &__title {
    display: flex;
    gap: u.rem(10);
    padding: u.rem(5) u.rem(5);
    justify-content: space-between;

    p {
      padding: 0;
      line-height: 1;
      @include u.adaptive_font(20, 15)
    }

    &-switch {
      display: flex;
      gap: u.rem(10);
    }
  }
}

</style>
