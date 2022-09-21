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

@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
  .header {
    box-sizing: border-box;
    background-blend-mode: overlay;
    background-color: #212121B3;
    -webkit-backdrop-filter: blur(33px);
    backdrop-filter: blur(33px);
  }
}

.header {
  width: 100%;
  top: 0;
  position: sticky;
  display: block;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 20px;
  color: white;
  z-index: 2;
  border-bottom: 1px solid;
  border-right: 1px solid black;
  border-left: 1px solid black;
  margin-bottom: 20px;
  background-color: #2121219D;

  box-shadow: 0 10px 15px rgb(0 0 0 / 20%);
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  align-items: center;

  &__search {
    padding: 0 5px 20px 5px;

    &-input {
      width: 100%;
    }
  }

  &__widget-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}


</style>
