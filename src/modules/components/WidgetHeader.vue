<template>
  <div class="header">
    <widget-list
      :drag="drag"
      :dragend="dragend"
    />
    <div id="trash">
      <i class="el-icon-delete" @click="isOpenTrash = true"></i>
    </div>
  </div>
</template>

<script lang="ts">

import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Vue from 'vue';
import WidgetList from '@/modules/components/WidgetList.vue';


@Component({
  components: {
    WidgetList
  }
})
export default class WidgetHeader extends Vue {

  @Prop({}) protected drag!: any
  @Prop({}) protected dragend!: any

}

</script>


<style lang="scss" scoped>

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
