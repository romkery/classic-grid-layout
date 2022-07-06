<template>
  <span>
    <DeleteAlert v-if="model?.props.isDeleteMode"/>
    <DefaultSkeleton v-if="model?.props.preview === 'skeleton' & model?.props.isLoading"/>
    <div class="widget"
         v-if="!model?.props.isLoading"
         :style="styles()">
       <div class="widget__header">
           <p>{{ cityData?.current?.temp_c }}°</p>
           <img :src="cityData?.current?.condition.icon" alt="condition-icon"/>
       </div>
      <span id="separator"/>
       <div class="widget__bottom">
         <div class="widget__bottom">
           <div class="widget__bottom-info">
             <i class="el-icon-location"/>
             <h3>{{ cityData?.location?.name }}</h3>
           </div>
           <div class="widget__bottom-info">
             <h3>{{ localTime(cityData) }}</h3>
             <i class="el-icon-refresh"/>
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
import mockCityData from '@/modules/helpers/mockCityData';


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
  protected cityData: CurrentResponseType = mockCityData;

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


<style lang="less" scoped>
@import '../../../assets/styles/_variables';

.widget {
  background: #66b8fb;
  height: @grid-content-height;
  padding: 10px;
  color: white;
  font-family: Circe-Light;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    font-size: 2.5rem;
  }

  &__header {
    display: flex;
    justify-content: space-between;

    img {
      max-height: 100px;
      max-width: 100px;
      height: 100%;
      width: 100%;
    }
  }

  #separator {
    max-width: 100px;
    max-height: 100px;
    height: 100%;
    width: 100%;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;

    &-info {
      max-height: 100%;
      display: flex;
      align-items: center;
      justify-content: end;

      h3 {
        line-height: 1.4rem;
        font-size: 1.2rem;

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


img {
  width: 100%;
  height: 50%;
  object-fit: contain;
}

</style>
