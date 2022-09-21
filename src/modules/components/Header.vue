<template>
  <div class="header">
    <div class="header__search">
      <div>{{ weatherModule.city }}</div>
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
    <div class="header__widget-list">
      <widget-list
        :drag="drag"
        :dragend="dragend"
        :deleteSelectedItems="deleteSelectedItems"
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
}

</script>


<style lang="scss" scoped>
@use './src/scss/util' as u;

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
  width: 100%;
  padding-bottom: u.rem(20);
  margin-bottom: u.rem(20);

  box-shadow: 0 u.rem(10) u.rem(15) rgb(0 0 0 / 20%);
  background-color: #2121219D;
  border-right: u.rem(1) solid black;
  border-bottom: u.rem(1) solid;
  border-left: u.rem(1) solid black;
  border-bottom-right-radius: u.rem(12);
  border-bottom-left-radius: u.rem(12);
  color: white;

  &__search {
    padding: 0 u.rem(5) u.rem(20) u.rem(5);

    &-input {
      width: 100%;
    }
  }

  &__widget-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
}


</style>
