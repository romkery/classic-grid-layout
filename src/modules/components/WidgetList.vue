<template>
  <div class="widgets">
    <h3>Widgets:</h3>
    <div class="widgets__list">
      <div v-for="(widget, index) in this.store.outerWidgets"
           @drag="drag($event)"
           @dragend="dragend"
           class="widgets__list-item-container"
           draggable="true"
           :key='index'>
        <p>{{ widget }}</p>
        <component :is="widget" v-show="false"/>
      </div>
    </div>
    <div id="trash">
      <el-tooltip placement="bottom">
        <div slot="content">Ctrl + click <br/> to select.</div>
        <i class="el-icon-delete" @click="isOpenTrash = true"/>
      </el-tooltip>
    </div>
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

@Component({
  components: {
    Yellow,
    Black,
    TodayWeather,
    Orange,
    Green,
    CocaCola
  }
})
export default class WidgetList extends Vue {

  @Prop({}) protected dragend!: any
  @Prop({}) protected drag!: any

  protected store = new LayoutStorage()
}

</script>


<style lang="scss" scoped>
.widgets {
  width: 100%;
  display: flex;

  p {
    color: #181818;
  }

  h3 {
    margin-left: 10px;
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

    &-item-container {
      max-width: 100%;
      width: 100%;
      text-align: center;
      background: #aeffd7;
      border: 1px solid black;
      border-radius: 10px;
      margin: 0 10px;
      padding: 10px;
    }
  }
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
