<template>
  <span>
    <DeleteAlert v-if="model?.props.isDeleteMode"/>
    <DefaultSkeleton v-if="model?.props.preview === 'skeleton' & model?.props.loading"/>
    <div class="widget"
         v-if="!model?.props.loading"
         :style="styles()">
     <div class="container">
       <h1>Today</h1>
              <h1>In {{ cityData?.cityName }}</h1>
              <h2>Temperature {{ cityData?.temp_c }}</h2>
     </div>
    </div>
  </span>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import Vue from 'vue';
import LayoutStorage, {LayoutItemType, LayoutType} from '@/modules/helpers/LayoutStorage';
import DefaultSkeleton from '@/common/mixins/DefaultSkeleton.vue';
import DeleteAlert from '@/common/mixins/DeleteAlert.vue';
import {Prop} from 'vue-property-decorator';
import {useModule} from 'vuex-simple';
import WeatherModule from '@/store/modules/WeatherModule';


@Component({
  components: {
    DefaultSkeleton,
    DeleteAlert
  }
})
export default class TodayWeather extends Vue {

  @Prop({}) protected model!: LayoutItemType
  @Prop({}) protected layout!: LayoutType
  @Prop({}) protected changeEvent!: any

  protected storage = new LayoutStorage()
  protected weatherModule?: WeatherModule = useModule(this.$store, ['weatherModule']);
  protected cityData: any = {}

  protected styles() {
    return {
      border: `${this.model?.props?.styleProps.border?.value}px solid ${this.model?.props?.styleProps.border?.color}`,
      borderRadius: `${this.model?.props?.styleProps.borderRadius?.value}px`,
      background: this.model?.props?.styleProps.background?.color
    }
  }

  async created() {
    if (this.model) {

      if (!this.model?.props?.city && this.changeEvent) {
        this.storage.setWidgetCity(this.weatherModule?.city!, this.model)
        this.changeEvent!(this.layout)
      }
      this.cityData = await this.weatherModule?.getCity(this.model.props?.city!)
    }
  }

  protected ownProperty: LayoutItemType = this.storage.createNewWidget(2, 20, 'TodayWeather', 'skeleton',
    [
      {
        name: 'border',
        title: 'Рамка',
        el: 'slider',
        min: 0,
        max: 15,
        step: 1,
        value: 1,
        color: '#3581e5'
      },
      {
        name: 'borderRadius',
        title: 'Скругление углов',
        el: 'slider',
        min: 0,
        max: 50,
        step: 1,
        value: 15,
      }], 2, 20)

}

</script>


<style lang="scss" scoped>
@import '../../../assets/styles/variables';

.widget {
  background: #66b8fbad;
  height: $grid-content-height;
  padding: 10px;

  .container {
    h1 {
      font-family: Circe-Light;
      color: white;
    }
  }
}

img {
  width: 100%;
  height: 50%;
  object-fit: contain;
}

</style>
