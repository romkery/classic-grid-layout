<template>
  <span>
    <DeleteAlert v-if="model?.props.isDeleteMode"/>
    <DefaultSkeleton v-if="model?.props.preview === 'skeleton' & model?.props.isLoading"/>
    <div class="widget"
         v-if="!model?.props.isLoading"
         :style="styles()">
     <div class="container" v-if="typeof cityData !== 'string'">
       <h1>Today</h1>
              <h1>In {{ cityData?.location?.name }}</h1>
              <h2>Temperature {{ cityData?.current?.temp_c }}</h2>
       <h3>Feels like {{ cityData?.current?.feelslike_c }}</h3>
     </div>
       <div v-else><h1>{{ cityData }}</h1></div>
    </div>
  </span>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import Vue from 'vue';
import LayoutStorage, {LayoutItemType, LayoutType} from '@/modules/helpers/LayoutStorage';
import DefaultSkeleton from '@/common/mixins/DefaultSkeleton.vue';
import DeleteAlert from '@/common/mixins/DeleteAlert.vue';
import {Prop, Watch} from 'vue-property-decorator';
import {useModule} from 'vuex-simple';
import WeatherModule from '@/store/modules/WeatherModule';
import {CurrentResponseType} from '@/services/ApiTypes';


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
  protected weatherModule?: WeatherModule | any = useModule(this.$store, ['weatherModule']);
  protected cityData: CurrentResponseType = {}

  protected styles() {
    return {
      border: `${this.model?.props?.styleProps.border?.value}px solid ${this.model?.props?.styleProps.border?.color}`,
      borderRadius: `${this.model?.props?.styleProps.borderRadius?.value}px`,
      background: this.model?.props?.styleProps.background?.color
    }
  }

  @Watch('model.props.styleProps.border.value')
  lol() {
    console.log(`updated ${this.model.i}: ${this.model.props?.styleProps.border?.value}`)
  }

  async created() {
    if (this.model) {

      this.model!.props!.isLoading! = true
      console.log(`created ${this.model.i}: ${this.model.props?.styleProps.border?.value}`)
      if (!this.model?.props?.city) {
        this.storage.setWidgetCity(this.weatherModule?.city!, this.model)
        this.changeEvent(this.layout)
      }

      this.cityData = await this.weatherModule?.getCity(this.model.props?.city!)

      this.model!.props!.isLoading! = false
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
        value: Math.floor(Math.random() * 15) + 1,
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
  background: #66b8fb;
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
