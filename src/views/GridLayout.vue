<template>
  <div class="layout">
    <edit-pop-up
      :model="selectedDragItem"
      :change-event="changeEvent"
      :layout.sync="this.layout"
      :is-edit.sync="isEdit"
    />
    <widget-header :drag="drag" :dragend="dragend"/>
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
          :static="item.isStatic"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :maxH="item.props?.maxH"
          :maxW="item.props?.maxW"
          :minH="20"
          :minW="2"
          :class="'custom_grid_'+ item.i"
          @moved="changeEvent(layout)"
          @resized="changeEvent(layout)"
        >
          <grid-item-content
            :selected-drag-item="selectedDragItem"
            :change-event="changeEvent"
            :model="item"
            :drag-outside="dragOutside"
            :set-drag-item="setDragItem"
            :set-edit-mode="setEditMode"
            :layout="layout"
            :set-selected-items="setSelectedItems"
          />
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import {GridItem, GridLayout} from "vue-grid-layout"
import Component from 'vue-class-component';
import LayoutStorage, {LayoutItemType, LayoutType} from '@/modules/helpers/LayoutStorage';
import EditPopUp from '@/modules/components/EditPopUp.vue';
import WidgetList from '@/modules/components/WidgetList.vue';
import GridItemContent from '@/modules/components/GridItemContent.vue';
import WidgetHeader from '@/modules/components/Header.vue';

let mouseXY: any = {"x": null, "y": null};
let DragPos: any = {"x": null, "y": null, "w": 1, "h": 1, "i": null};
let itemMouseXY: any = {"x": null, "y": null};

@Component({
  components: {
    GridLayout,
    GridItem,
    EditPopUp,
    WidgetList,
    GridItemContent,
    WidgetHeader
  },
})
export default class Layout extends LayoutStorage {

  protected selectedItems: number[] = []

  protected isMouseInTrash: boolean = false
  protected prevDeleteState: string

  protected setEditMode(): void {
    this.isEdit = !this.isEdit
  }

  protected setDragItem(val: LayoutItemType): void {
    this.selectedDragItem = val
  }

  protected setDeleteMode(itemId: any, state: boolean): void {
    this.layout.find(item => item.i === itemId)!.props!.isDeleteMode = state
  }

  protected setSelectedItems(id: number): void {
    if (this.selectedItems.indexOf(id) !== -1) {
      this.selectedItems = this.selectedItems.filter(el => el !== id)
    } else {
      this.selectedItems.push(id)
    }
  }

  protected changeEvent(layout: LayoutType): void {
    this.saveLayoutChanges(layout)
  }

  protected deleteSelectedItems(state: string) {
    this.selectedItems.forEach(el => this.setDeleteMode(el, true))
    if (state === 'delete') {
      this.selectedItems.forEach(itemId => {
        const selectedItemsIndex = this.layout.findIndex(function (el) {
          return el.i === itemId
        })
        if (selectedItemsIndex !== -1) {
          this.layout.splice(selectedItemsIndex, 1)
        }
      })
      this.selectedItems = []
    }
  }

  protected deleteOneItem(state: string) {
    this.setDeleteMode(this.selectedDragItem.i, true)
    if (state === 'delete') {
      const index = this.layout.findIndex(n => n.i === this.selectedDragItem.i);
      this.layout.splice(index, 1);
      this.saveLayoutChanges(this.layout)
    }
  }

  created() {
    this.getLayout()
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        this.dragOutside(this.selectedDragItem, 'delete', 'key');
      }
    })
  }

  mounted() {
    document.addEventListener("dragover", function (e) {
      mouseXY.x = e.clientX;
      mouseXY.y = e.clientY;
    }, false);

    document.querySelector<HTMLElement>('#content')!.onmousemove = function (e) {
      event = event || window.event; // кроссбраузерность
      itemMouseXY.x = e.clientX;
      itemMouseXY.y = e.clientY;
    }
  }

  protected dragOutside(val: LayoutItemType, state: 'check' | 'delete', event?: 'key'): void {

    let parentRect = document.getElementById('trash')!.getBoundingClientRect();
    let prevIsMouseInTrash = this.isMouseInTrash

    this.isMouseInTrash = ((itemMouseXY.x! > parentRect.left)
        && (itemMouseXY.x! < parentRect.right))
      && ((itemMouseXY.y! > parentRect.top)
        && (itemMouseXY.y! < parentRect.bottom));

    if (prevIsMouseInTrash !== this.isMouseInTrash || this.prevDeleteState !== state) {
      if (this.isMouseInTrash || event === 'key') {
        if (this.selectedItems.length > 0) {
          this.deleteSelectedItems(state)
        } else {
          this.deleteOneItem(state)
        }
      } else {
        this.selectedItems.forEach(el => this.setDeleteMode(el, false))
        this.setDeleteMode(this.selectedDragItem.i, false)
      }
      this.saveLayoutChanges(this.layout)
    }

    this.prevDeleteState = state
  }

  protected drag(event) {
    if (event.target.children[1].__vue__.ownProperty !== this.selectedDragItem) {
      this.setDragItem(event.target.children[1].__vue__.ownProperty)
    }

    let parentRect = document.getElementById('content')!.getBoundingClientRect();
    let mouseInGrid = (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom)))
    if (mouseInGrid && (this.layout.findIndex(item => item.i === 'drop')) === -1) {

      this.layout.push({
        x: (this.layout.length * 2) % (this.colNum || 12),
        y: this.layout.length + (this.colNum || 12), // puts it at the bottom
        h: this.selectedDragItem.h,
        w: this.selectedDragItem.w,
        i: 'drop',
      });
    }
    let index = this.layout.findIndex(item => item.i === 'drop');
    if (index !== -1) {
      try {
        this.$refs.gridlayout!.$children[this.layout.length].$refs.item.style.display = "none";
      } catch {
      }

      let el = this.$refs.gridlayout!.$children[index];
      el.dragging = {"top": mouseXY.y - parentRect.top, "left": mouseXY.x - parentRect.left};
      let new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);

      if (mouseInGrid) {
        this.$refs.gridlayout!.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, this.selectedDragItem.h, this.selectedDragItem.w);
        DragPos.i = index; //idk for what it is
        DragPos.x = this.layout[index].x;
        DragPos.y = this.layout[index].y;
      }
      if (!mouseInGrid) {
        this.$refs.gridlayout!.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1);
        this.layout = this.layout.filter(obj => obj.i !== 'drop');
      }
    }
  }

  protected dragend() {
    let parentRect = document.getElementById('content')!.getBoundingClientRect();
    let mouseInGrid = (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom)))
    if (mouseInGrid) {
      this.$refs.gridlayout!.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
      this.layout = this.layout.filter(obj => obj.i !== 'drop');
      let newKey = this.layout.length > 0 ? this.layout.reduce((acc, curr) => acc.i! > curr.i! ? acc : curr).i : 0
      let item = JSON.parse(JSON.stringify(this.selectedDragItem)) // deep clone object
      this.layout.push({
        x: DragPos.x,
        y: DragPos.y,
        w: item.w || 2,
        h: item.h || 20,
        i: newKey + 1,
        c: item.c,
        isStatic: item.isStatic,
        props: item.props
      });
      this.$refs.gridlayout!.dragEvent('dragend', newKey + 1, DragPos.x, DragPos.y, this.gridItemSize.h, this.gridItemSize.w);
      this.saveLayoutChanges(this.layout)
      try {
        this.$refs.gridlayout!.$children[this.layout.length].$refs.item.style.display = "block";
      } catch {
      }
    }

  }
}
</script>

<style lang="scss">

.vue-grid-layout {
  margin-top: 20px;
  min-height: 500px;
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

@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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
