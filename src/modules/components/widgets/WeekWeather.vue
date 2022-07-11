<template>
  <div style="height: inherit">
    <WidgetBasis :model="model" v-if="!isInfo">
      <div class="widget__content"
           v-if="!model?.props.isLoading"
           :style="getStyles()"
      >
        <div class="widget__header">
          <div class="widget__header-title">
            <p @click="changeCity">{{ cityData?.location?.name }}</p>
            <span>{{ cityData?.current?.temp_c }}°</span>
            <div class="widget__header-title-time">
              <h3>{{ localTime(cityData) }}</h3>
              <i class="el-icon-refresh" @click="refreshCity"/>
            </div>
            <span>{{ cityData?.location?.country.length > 10 ? '' : cityData?.location?.country }}</span>
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
    </WidgetBasis>
    <DayWeather v-if="isInfo"
                :styles="getStyles"
                :is-info.sync="isInfo"
                :model="model"
                :city-data="cityData"
                :selected-day="selectedDay"
                :days="days"
    />
  </div>
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
import getLocalTime from '@/modules/helpers/weatherWidgets/getLocalTime'
import mockCityData from '@/modules/helpers/weatherWidgets/mockCityData';
import WidgetBasis from '@/modules/components/WidgetBasis.vue';
import getStyles from '@/modules/helpers/getStyles';
import onCreated from '@/modules/helpers/weatherWidgets/onCreated';
import {changeCity, refreshCity} from '@/modules/helpers/weatherWidgets/methods';

@Component({
  components: {
    WidgetBasis,
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
  protected cityData: ForecastResponseType = mockCityData;
  protected days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  protected isInfo = false
  protected selectedDay!: number
  protected localTime = getLocalTime;
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
    }], 4, 40, 2, 30
  )


  protected getMoreDayWeather(day: number) {
    this.selectedDay = day
    this.isInfo = true
  }

  protected async refreshCity() {
    // Получение обновленных данных универсальной функцией
    this.cityData = await refreshCity.bind(this, 'forecast')();
  }

  protected async changeCity() {
    this.cityData = await changeCity.bind(this, 'forecast')();
  }

  protected onCreated: any = onCreated.bind(this, 'forecast');
  protected getStyles = getStyles.bind(this)

  async created() {
    this.cityData = await this.onCreated() // Вызываем универсальную функцию
  }
}

</script>


<style lang="less" scoped>
@import '../../../assets/styles/_variables';

.widget {

  * {
    font-family: Circe-Light, serif;
    color: #474747;
    line-height: 1.5;
  }

  #separator {
    max-width: 50px;
    max-height: 50px;
    height: 100%;
    width: 100%;
  }

  &__content {
    color: white;
    background: #66b8fb;
    font-family: Circe-Light, serif;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
      max-width: 80px;
      height: 100%;
      color: #474747;
      font-weight: bold;
      font-size: 30px;
      white-space: nowrap;

      p {
        line-height: 1.5rem;
        font-weight: bold;
        cursor: pointer;

        &:hover {
          color: white;
          transition: .5s;
        }
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
          font-size: 0.8rem;
          bottom: 1px;
          margin-left: 2px;
          cursor: pointer;
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
        color: white;
        transition: all .3s
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
          font-family: Circe-Regular, serif;
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
