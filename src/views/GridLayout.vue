<template>
  <div class="layout">
    <EditPopUp
      :model="item"
      :selected-drag-item="selectedDragItem"
      :change-event="changeEvent"
      :layout="this.layout"
      :is-edit.sync="isEdit"
    />
    <widget-list
      :drag="drag"
      :dragend="dragend"
    />
    <div id="content">
      <grid-layout
        ref="gridlayout"
        class='customization-on'
        :layout.sync="layout"
        :isDraggable="!isEdit"
        :verticalCompact="true"
        :isResizable="true"
        :useCssTransforms="false"
        :responsive="true"
        :rowHeight='1'
        :margin="[10, 10]"
        @click="changeEvent(layout)"
      >
        <grid-item
          v-for="item in layout"
          :static="item.static"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :class="'custom_grid_'+ item.i"
          @moved="changeEvent(layout)"
          @resized="changeEvent(layout)"
        >
          <GridItemContent
            :selected-drag-item="selectedDragItem"
            :change-event="changeEvent"
            :model="item"
            :drag-outside="dragOutside"
            :set-drag-item="setDragItem"
            :set-edit-mode="setEditMode"
            :layout="layout"/>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import {GridItem, GridLayout} from "vue-grid-layout"
import Component from 'vue-class-component';
import LayoutStorage, {LayoutItemType, LayoutType} from '@/helpers/LayoutStorage';
import EditPopUp from '@/components/EditPopUp.vue';
import WidgetList from '@/components/WidgetList.vue';
import GridItemContent from '@/components/GridItemContent.vue';

let mouseXY = {"x": null, "y": null};
let DragPos = {"x": null, "y": null, "w": 1, "h": 1, "i": null};
let itemMouseXY = {"x": null, "y": null};

@Component({
  components: {
    GridLayout,
    GridItem,
    EditPopUp,
    WidgetList,
    GridItemContent
  }
})
export default class Layout extends LayoutStorage {

  protected selectedDragItem: LayoutItemType = {}

  protected setEditMode(itemId: number): void {
    this.isEdit = !this.isEdit
    this.item = this.layout.find(n => n.i === itemId)
  }

  protected setDragItem(val: any): void {
    this.selectedDragItem = val
  }

  protected changeEvent(layout: LayoutType): void {
    this.saveLayoutChanges(layout)
  }

  protected dragOutside(val: LayoutItemType): void {
    let parentRect = document.getElementById('content').getBoundingClientRect();
    let mouseInGrid = false;
    if (((itemMouseXY.x > parentRect.left) && (itemMouseXY.x < parentRect.right)) && ((itemMouseXY.y > parentRect.top) && (itemMouseXY.y < parentRect.bottom))) {
      mouseInGrid = true;
    }
    if (mouseInGrid === false) {
      const index = this.layout.findIndex(n => n.i === val.i);
      if (index !== -1) {
        this.layout.splice(index, 1);
        this.saveLayoutChanges(this.layout)
      }
    }
  }

  created() {
    this.getLayout()
  }

  mounted() {
    document.addEventListener("dragover", function (e) {
      mouseXY.x = e.clientX;
      mouseXY.y = e.clientY;
    }, false);

    document.querySelector('#content')!.onmousemove = function (e) {
      event = event || window.event; // кроссбраузерность
      itemMouseXY.x = e.clientX;
      itemMouseXY.y = e.clientY;
    }
  }

  protected drag(event) {
    this.setDragItem(event.target.children[1].__vue__.myOwnProperty)
    let parentRect = document.getElementById('content').getBoundingClientRect();
    let mouseInGrid = false;
    if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
      mouseInGrid = true;
    }
    if (mouseInGrid === true && (this.layout.findIndex(item => item.i === 'drop')) === -1) {
      this.layout.push({
        x: (this.layout.length * 2) % (this.colNum || 12),
        y: this.layout.length + (this.colNum || 12), // puts it at the bottom
        w: 2,
        h: 50,
        i: 'drop',
        static: this.selectedDragItem.static,
        props: this.selectedDragItem.props
      });
    }
    let index = this.layout.findIndex(item => item.i === 'drop');
    if (index !== -1) {
      try {
        this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = "none";
      } catch {
      }
      let el = this.$refs.gridlayout.$children[index];
      el.dragging = {"top": mouseXY.y - parentRect.top, "left": mouseXY.x - parentRect.left};
      let new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);

      if (mouseInGrid === true) {
        this.$refs.gridlayout.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, this.gridItemSize.h, this.gridItemSize.w);
        DragPos.i = index;
        DragPos.x = this.layout[index].x;
        DragPos.y = this.layout[index].y;
      }
      if (mouseInGrid === false) {
        this.$refs.gridlayout.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1);
        this.layout = this.layout.filter(obj => obj.i !== 'drop');
      }
    }
  }

  protected dragend(e) {
    let parentRect = document.getElementById('content').getBoundingClientRect();
    let mouseInGrid = false;
    if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
      mouseInGrid = true;
    }
    if (mouseInGrid === true) {
      this.$refs.gridlayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
      this.layout = this.layout.filter(obj => obj.i !== 'drop');
      let newKey = this.layout.reduce((acc, curr) => acc.i > curr.i ? acc : curr)

      this.layout.push({
        x: DragPos.x,
        y: DragPos.y,
        w: 2,
        h: 50,
        i: newKey.i + 1,
        c: this.selectedDragItem.c,
        static: this.selectedDragItem.static,
        props: this.selectedDragItem.props
      });
      this.$refs.gridlayout.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, this.gridItemSize.h, this.gridItemSize.w);
      try {
        this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = "block";
      } catch {
      }
    }
    this.saveLayoutChanges(this.layout)
  }

}

</script>

<style scoped lang="scss">

</style>

<style lang="scss">

.vue-grid-layout {
  margin-top: 20px;
}

.vue-grid-item {
  overflow: hidden;
  transition: all 200ms ease;
  transition-property: left, top, right;
  border: 1px solid transparent;

  .el-card {
    height: calc(100% - 20px);
    overflow: hidden;
  }
}

.customization-on {
  user-select: none;

  .vue-resizable-handle {
    display: none;
  }

  .vue-grid-item:hover {
    border: 1px solid #ccc;
    background: var(--grid-element-background);

    > .vue-resizable-handle {
      display: inherit;
      position: absolute;
      width: 20px;
      height: 20px;
      bottom: -10px;
      right: -10px;
      background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=') no-repeat;
      padding: 0 3px 3px 0;
      background-origin: content-box;
      box-sizing: border-box;
      cursor: se-resize;
    }
  }
}

.vue-grid-item {
  .cssTransforms {
    transition-property: transform;
    left: 0;
    right: auto;
  }

  .cssTransforms.render-rtl {
    left: auto;
    right: 0;
  }

  .resizing {
    opacity: 0.6;
    z-index: 3;
  }

  .vue-draggable-dragging {
    transition: none;
    z-index: 3;
  }

  .vue-grid-placeholder {
    background: blue;
    opacity: 0.2;
    transition-duration: 100ms;
    z-index: 2;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
}
</style>

<style lang="scss">
.el-drawer.drawer-adoption--kill-skinization {
  overflow: auto;
  padding: 0;
}
</style>
