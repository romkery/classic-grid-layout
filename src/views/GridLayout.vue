<template>
	<div class="product-details-view">
		<ElRow>
			<ElCol>
				<GridLayout
						ref="gridLayout"
						:layout.sync="layout"
						:verticalCompact="true"
						:isDraggable="true"
						:isResizable="true"
						:rowHeight="20"
						:margin="[0, 0]"
						:useCssTransforms="true"
						:responsive="false"
						class="customization-on"
				>
					<GridItem
							v-for="item in layout"
							:key="item.i"
							:x="item.x"
							:y="item.y"
							:w="item.w"
							:h="item.h"
							:i="item.i"
					>
						<component :is="item.c" />
					</GridItem>
				</GridLayout>
			</ElCol>
		</ElRow>
	</div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';

export default {
	components: {
		HelloWorld
	}
};
</script>

<script setup lang="ts">
// @ts-ignore
import { GridLayout, GridItem } from 'vue-grid-layout';

interface ILayoutItem {
	x: number;
	y: number;
	w: number;
	h: number;
	i: string;
	c: string;
}

const layout: ILayoutItem[] = [];

layout.push(
		{ x: 0, y: 0, w: 8, h: 26, i: '0', c: 'HelloWorld' },
		{ x: 8, y: 0, w: 4, h: 26, i: '1', c: 'HelloWorld' },
		{ x: 0, y: 26, w: 8, h: 8, i: '2', c: 'HelloWorld' },
		{ x: 0, y: 34, w: 8, h: 8, i: '3', c: 'HelloWorld' },
		{ x: 0, y: 46, w: 8, h: 27, i: '4', c: 'HelloWorld' },
		{ x: 8, y: 30, w: 4, h: 37, i: '5', c: 'HelloWorld' },
		{ x: 0, y: 72, w: 12, h: 20, i: '6', c: 'HelloWorld' }
);

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.product-details-view {
	max-width: inherit;
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
	> * {
		height: calc(100% - 20px);
		margin: 10px;
		overflow: hidden;
	}
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
		background: repeating-linear-gradient(-45deg, #222 0, #222 2px, transparent 5px, transparent 5px);
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
