<template>
  <div class="header">
    <div class="search">
      <div>{{ weatherModule.city }}</div>
      <el-autocomplete
        class="search"
        placeholder="Please input city"
        v-model="input"
        type="text"
        :fetch-suggestions="querySearch"
        @select="setCity"
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
export default class WidgetHeader extends Vue {

  @Prop({}) protected drag!: any
  @Prop({}) protected dragend!: any

  protected weatherModule: WeatherModule = useModule(this.$store, ['weatherModule'])!;

  protected input: string = ''

  protected setCity(city: any) {
    this.weatherModule.setCity(city.value)
    this.input = ''
  }

  protected async querySearch(query: string, callback: any) {
    callback(await this.weatherModule.getAutocompleteCities(query))
  }


}

</script>


<style lang="scss" scoped>

.search {
  margin-bottom: 20px;
  width: 100%;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__widget-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}


</style>
