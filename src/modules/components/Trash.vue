<template>
  <div id="trash">
    <el-tooltip placement="bottom">
      <div slot="content">
        Shift + Click <br/> to select.
      </div>
      <i
        class="el-icon-delete"
        @click="deleteSelectedItems('delete')"
      />
    </el-tooltip>
  </div>
</template>


<script lang="ts">
import {Prop} from 'vue-property-decorator';
import Vue from 'vue';

export default class Trash extends Vue {

  @Prop({}) protected deleteSelectedItems!: (state: string) => void;
}

</script>

<style lang="less" scoped>

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
