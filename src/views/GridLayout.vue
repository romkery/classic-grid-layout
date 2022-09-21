<template>
  <div class="layout">
    <edit-pop-up
      :model="dragItem"
      :layout.sync="layout"
      :is-edit.sync="isEdit"
      :change-event="saveLayoutChanges"
    />
    <widget-header
      :drag="drag"
      :dragend="dragend"
      :deleteSelectedItems="deleteSelectedItems"
    />
    <div id="content">
      <grid-layout
        ref="gridlayout"
        class='customization-on'
        :layout.sync="layout"
        :isDraggable="!isEdit"
        :verticalCompact="true"
        :isResizable="true"
        :responsive="true"
        :rowHeight='1'
        :colNum="10"
        @click="saveLayoutChanges(layout)"
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
          :minH="item.props?.minH ?? 20"
          :minW="item.props?.minW ?? 2"
          :class="'custom_grid_'+ item.i"
          @moved="saveLayoutChanges(layout)"
          @resized="saveLayoutChanges(layout)"
        >
          <grid-item-content
            :model="item"
            :selected-drag-item="dragItem"
            :layout="layout"
            :change-event="saveLayoutChanges"
            :drag-outside="dragOutside"
            :set-drag-item="setDragItem"
            :set-edit-mode="setEditMode"
            :set-selected-items="setSelectedItems"
            :deleteOneItem="deleteOneItem"
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
import LayoutStorage, {LayoutItemType} from '@/modules/helpers/LayoutStorage';
import EditPopUp from '@/modules/components/EditPopUp.vue';
import WidgetList from '@/modules/components/WidgetList.vue';
import GridItemContent from '@/modules/components/GridItemContent.vue';
import WidgetHeader from '@/modules/components/Header.vue';
import WeatherModule from '@/store/modules/WeatherModule';
import {useModule} from 'vuex-simple';

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

  protected weatherModule?: WeatherModule = useModule(this.$store, ['weatherModule']);

  protected setEditMode(): void {
    this.isEdit = !this.isEdit
  }

  protected setDragItem(val: LayoutItemType): void {
    this.dragItem = val;
  };

  protected setSelectedItems(id: number): void {
    if (this.selectedItems.indexOf(id) !== -1) {
      this.selectedItems = this.selectedItems.filter(el => el !== id)
    } else {
      this.selectedItems.push(id);
    }
  }

  protected deleteOneItem(state: string) {
    // Если state === "check", функция проигнорируется
    if (state === 'delete') {
      const index = this.layout.findIndex(n => n.i === this.dragItem.i);
      this.layout.splice(index, 1);
      this.saveLayoutChanges(this.layout)
    }
  }

  public deleteSelectedItems(state: string) {
    if (state === 'delete') {
      this.selectedItems.forEach(itemId => {
        const selectedItemsIndex = this.layout.findIndex((el) => {
          return el.i === itemId;
        })
        if (selectedItemsIndex !== -1) {
          this.layout.splice(selectedItemsIndex, 1)
        }
      })
      this.selectedItems = [];
      this.saveLayoutChanges(this.layout)
    }
  }

  created() {
    this.getLayout();
    this.weatherModule?.deleteCache(); // Удаляем кешируемые промисы, что-бы данные обновлялись
    this.weatherModule?.getLocalStorageCity();

    //Добавление ивента на удаление элементов при нажатии Backspace
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && this.selectedItems.length > 0) {
        this.dragOutside('delete', 'key');
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

  protected dragOutside(state: 'check' | 'delete', event?: 'key'): void {

    let parentRect = document.getElementById('trash')!.getBoundingClientRect();
    let prevIsMouseInTrash = this.isMouseInTrash

    this.isMouseInTrash = ((itemMouseXY.x! > parentRect.left)
        && (itemMouseXY.x! < parentRect.right))
      && ((itemMouseXY.y! > parentRect.top)
        && (itemMouseXY.y! < parentRect.bottom));

    if (prevIsMouseInTrash !== this.isMouseInTrash || state === 'delete') { //Сравнении prev сделано для оптимизации
      if (this.isMouseInTrash || event === 'key') { //Обработка
        if (this.selectedItems.length > 0) {
          this.selectedItems.forEach(el => this.setDeleteMode(el, true))
          this.deleteSelectedItems(state)
        } else {
          this.setDeleteMode(this.dragItem.i, true)
          this.deleteOneItem(state);
        }
      } else {
        this.selectedItems.forEach(el => this.setDeleteMode(el, false))
        this.setDeleteMode(this.dragItem.i, false)
      }

      this.saveLayoutChanges(this.layout)
    }
  }

  protected drag(event: any) {
    if (event.target.children[1].__vue__.ownProperty !== this.dragItem) {
      this.setDragItem(event.target.children[1].__vue__.ownProperty) // Смена перетаскиваемого элемента
    }

    const parentRect = document.getElementById('content')!.getBoundingClientRect();
    const mouseInGrid = (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom)))

    if (mouseInGrid && (this.layout.findIndex(item => item.i === 'drop')) === -1) {
      this.layout.push({
        x: (this.layout.length * 2) % 12,
        y: this.layout.length + 12, // puts it at the bottom
        h: this.dragItem.h,
        w: this.dragItem.w,
        i: 'drop',
      });
    }

    const index = this.layout.findIndex((item: LayoutItemType) => item.i === 'drop');
    if (index !== -1) {
      const el = this.$refs.gridlayout!.$children[index];
      el.dragging = {"top": mouseXY.y - parentRect.top, "left": mouseXY.x - parentRect.left};
      let new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);

      if (mouseInGrid) {
        this.$refs.gridlayout!.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, this.dragItem.h, this.dragItem.w);
        DragPos.x = this.layout[index].x;
        DragPos.y = this.layout[index].y;
      }
      if (!mouseInGrid) {
        this.$refs.gridlayout!.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1);
        this.layout = this.layout.filter((item: LayoutItemType) => item.i !== 'drop');
      }
    }
  }

  protected dragend() {
    const parentRect = document.getElementById('content')!.getBoundingClientRect();
    const mouseInGrid = (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom)))

    if (mouseInGrid) {
      this.$refs.gridlayout!.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
      this.layout = this.layout.filter(obj => obj.i !== 'drop');

      const newKey = this.layout.length > 0 ?
        Number(this.layout?.reduce((sum, curr) => sum.i! > curr.i! ? sum : curr).i) + 1 : 0
      const item = JSON.parse(JSON.stringify(this.dragItem)) // deep clone object

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
    }
  }
}
</script>

<style lang="scss">
@use './src/scss/util' as u;
@use './src/scss/globals' as g;

.vue-grid-layout {
  margin-top: u.rem(20);
  min-height: u.rem(500);
}

.vue-grid-item {
  overflow: hidden;
  transition: all 200ms ease;
  transition-property: left, top, right;
  border: 1px solid transparent;
  touch-action: none;

  .el-card {
    height: g.$grid-content-height;
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

.customization-on .vue-grid-item.vue-grid-placeholder {
  z-index: -1;
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
      width: u.rem(20);
      height: u.rem(20);
      bottom: u.rem(-10);
      right: u.rem(-10);
      background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=') no-repeat;
      padding: 0 u.rem(3) u.rem(3) 0;
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

.el-drawer.drawer-adoption--kill-skinization {
  overflow: auto;
  padding: 0;
}
</style>
