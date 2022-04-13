<template>
  <div class="product-details-view">
    <div v-show="isDeletedItem" class="transition-box" @click="undoItem">UNDO</div>
    <!--        <el-button type="primary" @click="createNewWidget('green', [-->
    <!--          addNewProperty('border', 'Рамка', 'slider', 10, 100, 4, 20, '#fc0303'),-->
    <!--          addNewProperty('borderRadius', 'Скругление углов', 'slider', 10, 100, 1, 20)-->
    <!--        ])">add new widget-->
    <!--        </el-button>-->
    <ElRow>
      <ElCol>
        <div class="pop-up-edit-mode" v-if="isEdit">
          <el-drawer
            :size="'20%'"
            :visible.sync="isEdit"
            :close-on-press-escape="true"
            :with-header="false"
            @close="changeEvent(layout)"
          >
            <div class="drawer-content">
              <useForm v-model="item.props"/>
            </div>
          </el-drawer>
          <div class="product-edit-mode">
            <component
              :is="selectedDragItem.c"
              v-model="selectedDragItem.props"
            />
          </div>
        </div>
        <div class="outer-widgets">
          <div v-for="widget in outerWidgets"
               @drag="drag($event)"
               @dragend="dragend" class="droppable-element" draggable="true">
            <component :is="widget"/>
          </div>
        </div>
        <div id="content">
          <grid-layout ref="gridlayout"
                       :class="['customization-on', {'grid-edit-mode': isEdit} ]"
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
              <div style="height: inherit" class="item_container"
                   @mouseenter="setDragItem(item)" @mouseup="dragOutside(selectedDragItem)">
                <div class="pin-icon-container">
                  <span/>
                  <div>
                    <i class="el-icon-setting" @click="setEditMode(item.i)"></i>
                    <i class="el-icon-star-off" v-if="!item.static"
                       @click="() => {item.static = true; changeEvent(layout)}"></i>
                    <i class="el-icon-star-on" v-if="item.static"
                       @click="() => {item.static = false; changeEvent(layout)}"></i>
                  </div>
                </div>
                <component
                  :is="item.c"
                  v-model="item.props"
                  :class="'grid_item_component_'+ item.i"
                  :item="item"
                  :loading="true"
                />
              </div>
            </grid-item>
          </grid-layout>
        </div>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import {GridItem, GridLayout} from "vue-grid-layout"
import HelloWorld from '@/components/mixins/EditMode.vue';
import CocaCola from '@/components/CocaCola.vue';
import Component from 'vue-class-component';
import LayoutStorage from '@/helpers/LayoutStorage';
import useForm from '@/components/EditForms.vue';
import Orange from '@/components/Orange.vue';
import Green from '@/components/Green.vue';
import Yellow from '@/components/Yellow.vue';
import Pink from '@/components/Pink.vue';

let mouseXY = {"x": null, "y": null};
let DragPos = {"x": null, "y": null, "w": 1, "h": 1, "i": null};

let itemMouseXY = {"x": null, "y": null};
let itemDragPos = {"x": null, "y": null, "w": 1, "h": 1, "i": null};

@Component({
  components: {
    GridLayout,
    GridItem,
    HelloWorld,
    CocaCola,
    useForm,
    Orange,
    Green,
    Yellow,
    Pink
  }
})
export default class Layout extends LayoutStorage {

  protected isDeletedItem = false
  protected selectedDragItem: any = {}
  protected deletedItem: any = {}
  protected widgetValue: any = {}
  protected isDrag: boolean = false

  protected setEditMode(itemId: number): void {
    this.isEdit = !this.isEdit
    this.item = this.layout.find(n => n.i === itemId)
  }

  protected setDragItem(val: any): void {
    this.selectedDragItem = val
  }

  protected undoItem(): void {
    this.isDeletedItem = false
    this.layout.push(this.deletedItem)
    this.saveLayoutChanges(this.layout)
  }

  protected changeEvent(layout: any): void {
    this.saveLayoutChanges(layout)
  }

  protected dragOutside(val: any): void {
    let parentRect = document.getElementById('content').getBoundingClientRect();
    let mouseInGrid = false;
    if (((itemMouseXY.x > parentRect.left) && (itemMouseXY.x < parentRect.right)) && ((itemMouseXY.y > parentRect.top) && (itemMouseXY.y < parentRect.bottom))) {
      mouseInGrid = true;
    }
    if (mouseInGrid === false) {
      this.isDeletedItem = true
      this.deletedItem = val
      const index = this.layout.findIndex(n => n.i === val.i);
      if (index !== -1) {
        this.layout.splice(index, 1);
        this.saveLayoutChanges(this.layout)
      }
    }
  }

  created() {
    this.getLayout()
    setTimeout(() => this.loading = false, 2000)
  }

  mounted() {
    document.addEventListener("dragover", function (e) {
      mouseXY.x = e.clientX;
      mouseXY.y = e.clientY;
    }, false);

    document.querySelector('#content').onmousemove = function (e) {
      event = event || window.event; // кроссбраузерность
      itemMouseXY.x = e.clientX;
      itemMouseXY.y = e.clientY;
    }
  }

  protected drag(event) {
    this.setDragItem(event.target.children[0].__vue__.myOwnProperty)
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
        this.$refs.gridlayout.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 50, 2);
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

      // UNCOMMENT below if you want to add a grid-item
      this.layout.push({
        x: DragPos.x,
        y: DragPos.y,
        w: 2,
        h: 50,
        i: newKey.i + 1,
        c: this.selectedDragItem.c,
        props: this.selectedDragItem.props
      });
      this.saveLayoutChanges(this.layout)
      this.$refs.gridlayout.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, 50, 2);
      try {
        this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = "block";
      } catch {
      }
    }
  }

}

</script>

<style scoped lang="scss">

.outer-widgets {
  display: flex;
  flex-direction: row;
}

.transition-box {
  position: fixed;
  z-index: 20000;
  width: 200px;
  height: 50px;
  bottom: 30px;
  left: calc(50% - 100px);
  border-radius: 4px;
  background-color: #409EFF;
  color: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #51a6ff;
  }
}

.drop-zone {
  width: 200px;
  height: 200px;
  background: yellow;
  position: absolute;
  left: 500px;
}

.droppable-element {
  width: 150px;
  text-align: center;
  background: #aeffd7;
  border: 1px solid black;
  border-radius: 10px;
  margin: 0 20px;
  padding: 10px;
}

.pin-icon-container {
  display: flex;
  justify-content: space-between;

  i {
    cursor: pointer;
  }
}

.drawer-content {
  padding: 20px;
}

.product-edit-mode {
  max-width: 400px;
  max-height: 600px;
  height: 100%;
  width: 100%;
  position: fixed;
  top: calc(50% - (300px));
  left: calc(50% - (300px));
  z-index: 20000;
}

.product-details-view {
  max-width: 100%;


  .breadcrumb {
    margin-top: 20px;
  }
}

.main-content {
  padding-top: 20px;
}
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
      background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=');
      background-position: bottom right;
      padding: 0 3px 3px 0;
      background-repeat: no-repeat;
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
