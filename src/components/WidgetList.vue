<template>
  <div class="widgets-list">
    Widgets:
    <div v-for="(widget, index) in this.store.outerWidgets"
         @drag="drag($event)"
         @dragend="dragend"
         class="widgets-list-item-container"
         draggable="true"
         :key='index'>
      <div>{{ widget }}</div>
      <component :is="widget" v-show="false"/>
    </div>
  </div>
</template>


<script lang="ts">
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Vue from 'vue';
import Yellow from '@/components/widgets/Yellow.vue';
import Pink from '@/components/widgets/Pink.vue';
import LayoutStorage from '@/helpers/LayoutStorage';

@Component({
  components: {
    Yellow,
    Pink,
  }
})
export default class WidgetList extends Vue {

  @Prop({}) protected dragend!: any
  @Prop({}) protected drag!: any

  protected store = new LayoutStorage()
  protected innerIsEdit: boolean = false
}

</script>


<style lang="scss" scoped>

.widgets-list {
  display: flex;
  flex-direction: row;

  &-item-container {
    width: 150px;
    text-align: center;
    background: #aeffd7;
    border: 1px solid black;
    border-radius: 10px;
    margin: 0 20px;
    padding: 10px;
  }
}

</style>
