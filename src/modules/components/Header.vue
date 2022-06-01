<template>
  <div>
    <div class="search">
      <div>{{ weatherModule.city }}</div>
      <el-input placeholder="Please input city"
                v-model="input"
                @keyup.enter.native="getCity"
                type="text"
      >
        <i slot="suffix"
           class="el-input__icon el-icon-search">
        </i>
      </el-input>
    </div>
    <div class="header">
      <widget-list
        :drag="drag"
        :dragend="dragend"
      />
      <div id="trash">
        <i class="el-icon-delete" @click="isOpenTrash = true"></i>
      </div>
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

  protected weatherModule: WeatherModule = useModule(this.$store, ['weatherModule']);

  protected input: string = ''

  protected getCity() {
    this.weatherModule.setCity(this.input)
    this.input = ''
  }


}

</script>


<style lang="scss" scoped>

.search {
  margin-bottom: 20px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#trash {
  width: 50px;
  height: 50px;

  i {
    font-size: 50px;
    color: #c0c0c0;
    cursor: pointer;

  }

  :hover {
    transition: 500ms;
    color: dodgerblue;
  }
}


</style>
