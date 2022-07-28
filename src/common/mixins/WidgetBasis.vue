<template>
  <div class="widget">
    <DeleteAlert v-if="model?.props.isDeleteMode"/>
    <DefaultSkeleton v-if="model?.props.preview === 'skeleton' & model?.props.isLoading"/>
    <slot/>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import {LayoutItemType} from '@/modules/helpers/LayoutStorage';
import DefaultSkeleton from '@/common/mixins/DefaultSkeleton.vue';
import DeleteAlert from '@/common/mixins/DeleteAlert.vue';
import {Prop} from 'vue-property-decorator';


@Component({
  components: {
    DefaultSkeleton,
    DeleteAlert
  }
})
export default class TodayWeather extends Vue {

  @Prop({}) protected model!: LayoutItemType;
}

</script>


<style lang="less" scoped>
@import '../../assets/styles/_variables';

.widget {
  height: @grid-content-height;
}

</style>
