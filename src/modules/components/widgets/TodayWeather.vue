<template>
  <span>
    <DeleteAlert v-if="model?.props.isDeleteMode"/>
    <DefaultSkeleton v-if="model?.props.preview === 'skeleton' & model?.props.isLoading"/>
    <div class="widget"
         v-if="!model?.props.isLoading"
         :style="styles()">
     <div class="widget__content">
       <p>{{ cityData?.current?.temp_c }}°</p>
       <div class="widget__content-location">
         <div class="block"></div>
         <img :src="cityData?.current?.condition.icon" alt="condition-icon"/>
         <div class="widget__content-location-info">
           <div class="info-container">
             <i class="el-icon-location"/>
             <h3>{{ cityData?.location?.name }}</h3>
           </div>
           <div class="info-container">
             <h3>{{ localTime(cityData) }}</h3>
             <i class="el-icon-refresh"/>
           </div>
         </div>
         </div>
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
import {CurrentResponseType} from '@/services/ApiTypes';
import getLocalTime from '@/modules/helpers/getLocalTime'


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

  protected localTime = getLocalTime
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

  async created() {
    if (this.model) {

      this.model!.props!.isLoading! = true

      if (!this.model?.props?.city) {
        this.storage.setWidgetCity(this.weatherModule?.city!, this.model)
        this.changeEvent(this.layout)
      }

      this.cityData = await this.weatherModule?.getCityCurrent(this.model.props?.city!)

      this.model!.props!.isLoading! = false
    }
  }

  protected ownProperty: LayoutItemType = this.storage.createNewWidget(2, 30, 'TodayWeather', 'skeleton',
    [
      {
        name: 'border',
        title: 'Рамка',
        el: 'slider',
        min: 0,
        max: 15,
        step: 1,
        value: 4,
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
      }], 2, 30)

}

</script>


<style lang="scss" scoped>
@import '../../../assets/styles/variables';

.widget {
  background: #66b8fb;
  height: $grid-content-height;
  padding: 10px;
  color: white;
  font-family: Circe-Light;

  &__content {
    height: 100%;

    p {
      font-size: 2.5rem;
      position: absolute;
    }

    &-location {
      max-height: 100%;
      height: inherit;
      display: flex;
      flex-direction: column;
      align-items: end;

      .block {
        max-height: 150px;
        max-width: 10px;
        height: 100%;
      }

      img {
        max-width: 130px;
        max-height: 130px;
      }

      &-info {

        .info-container {
          max-height: 100%;
          display: flex;
          align-items: center;
          justify-content: end;

          h3 {
            line-height: 1.4rem;
            font-size: 1.2rem;
          }

          .el-icon-location {
            margin-right: 2px;
            font-size: 18px;
            bottom: 1px;
          }

          .el-icon-refresh {
            font-size: 18px;
            bottom: 1px;
            margin-left: 2px;
          }
        }
      }

    }
  }
}


img {
  width: 100%;
  height: 50%;
  object-fit: contain;
}

</style>
