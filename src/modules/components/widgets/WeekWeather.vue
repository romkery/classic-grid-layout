<template>
  <span>
    <DeleteAlert v-if="model?.props.isDeleteMode"/>
    <DefaultSkeleton v-if="model?.props.preview === 'skeleton' & model?.props.isLoading"/>
    <div class="widget"
         v-if="!model?.props.isLoading && !isInfo"
         :style="styles()"
    >
      <div class="widget__header">
          <div class="widget__header-title">
            <p>{{ cityData?.location?.name }}</p>
            <span>{{ cityData?.current?.temp_c }}°</span>
              <div class="widget__header-title-time">
                <h3>{{ localTime(cityData) }}</h3>
                <i class="el-icon-refresh"/>
              </div>
              <span>{{ cityData?.location?.country }}</span>
  </div>
  <img class="widget__header-icon" :src="cityData?.current?.condition.icon"/>
  </div>
  <span id="separator"/>
  <div class="widget__bottom">
    <div class="widget__bottom-day"
         @click="getMoreDayWeather(day)"
         v-for="day in 3">
      <div class="widget__bottom-day-title">{{
          days[new Date(cityData?.forecast?.forecastday[day - 1].date).getDay()]
        }}
      </div>
      <img :src="cityData?.forecast?.forecastday[day - 1].day.condition.icon" alt="condition_icon"/>
      <div class="widget__bottom-day-degrees">
            <span>
              {{ cityData?.forecast?.forecastday[day - 1].day.maxtemp_c.toFixed() }}°
            </span>
        <span>
              {{ cityData?.forecast?.forecastday[day - 1].day.mintemp_c.toFixed() }}°
            </span>
      </div>
    </div>
  </div>
  </div>
  <DayWeather v-if="isInfo"
              :styles="styles"
              :is-info.sync="isInfo"
              :model="model"
              :city-data="cityData"
              :selected-day="selectedDay"
              :days="days"
  />
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
import {ForecastResponseType} from '@/services/ApiTypes';
import DayWeather from '@/modules/components/widgets/DayWeather.vue';
import getLocalTime from '@/modules/helpers/getLocalTime'


@Component({
  components: {
    DayWeather,
    DefaultSkeleton,
    DeleteAlert
  }
})
export default class WeekWeather extends Vue {

  @Prop({}) protected model!: LayoutItemType
  @Prop({}) protected layout!: LayoutType
  @Prop({}) protected changeEvent!: any

  protected storage = new LayoutStorage()
  protected weatherModule?: WeatherModule | any = useModule(this.$store, ['weatherModule']);
  protected cityData: ForecastResponseType = {}
  protected days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  protected isInfo = false
  protected selectedDay!: number
  protected localTime = getLocalTime

  protected getMoreDayWeather(day: number) {
    this.selectedDay = day
    this.isInfo = true
  }

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

      this.cityData = await this.weatherModule?.getCityForecast(this.model.props?.city!, 3)

      this.model!.props!.isLoading! = false
    }
  }

  protected ownProperty: LayoutItemType = this.storage.createNewWidget(2, 30, 'WeekWeather', 'skeleton',
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
      }, {
      name: 'background',
      title: 'Фон',
      el: 'colorPicker',
      color: '#66b8fb',
    }], 4, 40, 2, 30)

}

</script>


<style lang="less" scoped>
@import '../../../assets/styles/_variables';

.widget * {
  position: relative;
}

.widget {
  width: inherit;
  height: @grid-content-height;
  background: #66b8fb;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  * {
    font-family: Circe-Light;
    color: #474747;
    line-height: 1.5;
  }

  #separator {
    max-width: 50px;
    max-height: 50px;
    height: 100%;
    width: 100%;
  }

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 7%;
    padding-top: 7%;

    &-title {
      display: flex;
      flex-direction: column;
      max-width: 100px;
      height: 100%;
      color: #474747;
      font-weight: bold;
      font-size: 30px;

      p {
        line-height: 1.5rem;
        font-weight: bold;
      }

      span {
        font-size: 24px;
        opacity: 0.6;
      }

      &-time {
        display: flex;
        align-items: center;

        h3 {
          font-size: 0.6rem;
        }

        i {
          font-size: 0.5rem;
          bottom: 1px;
          margin-left: 2px;
        }
      }
    }

    &-icon {
      max-height: 120px;
      max-width: 120px;
      height: 100%;
      width: 100%;
      animation: Orbita 15s linear infinite;
    }
  }

  &__bottom {
    height: inherit;
    display: flex;
    flex-direction: row;
    align-items: center;

    &-day {
      cursor: pointer;
      height: inherit;
      width: 33%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &:hover * {
        color: white
      }

      &:not(:last-child)::after {
        content: ' ';
        bottom: 0;
        right: 0;
        position: absolute;
        height: 100%;
        width: 1px;
        background: #3581e5;
        opacity: 0.5;
      }

      img {
        min-width: 30px;
        min-height: 30px;
      }

      &-title {
        padding-top: 5px;
        font-weight: bold;
        font-size: 0.65rem;
      }

      &-degrees {
        font-size: 1rem;

        span:first-child {
          font-family: Circe-Regular;
        }
      }
    }
  }
}


@keyframes Orbita {
  from {
    -webkit-transform: rotate(0deg) translateX(10px) rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg) translateX(10px) rotate(-360deg);
  }
}


</style>
