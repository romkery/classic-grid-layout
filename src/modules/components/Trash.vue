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
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';
import Component from 'vue-class-component';

@Component
export default class Trash extends Vue {

  @Prop({}) protected deleteSelectedItems: (state: string) => void;

}

</script>

<style lang="scss" scoped>
@use './src/scss/util' as u;

#trash {
  width: u.rem(50);
  height: u.rem(50);

  i {
    font-size: u.rem(38);
    color: #c0c0c0;
    cursor: pointer;

  }

  :hover {
    transition: 500ms;
    color: dodgerblue;
  }
}

</style>
