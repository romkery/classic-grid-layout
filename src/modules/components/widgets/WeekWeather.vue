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
          <img class="widget__header-icon" :src="cityData?.current?.condition.icon" alt="icon"/>
        </div>
        <span id="separator"/>
        <div class="widget__bottom">
          <div class="widget__bottom-day"
               @click="getMoreDayWeather(day)"
               v-for="day in 3"
          >
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
import WidgetBasis from '@/common/mixins/WidgetBasis.vue';
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


<style lang="scss" scoped>
@use './src/scss/util' as u;
@import './src/scss/globals/variables';

.widget {

  * {
    color: #474747;
    line-height: 1.5;
  }

  #separator {
    width: 100%;
    height: 100%;
    max-width: u.rem(50);
    max-height: u.rem(50);
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    background: #66b8fb;
    color: white;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-top: 7%;
    padding-left: 7%;

    &-title {
      display: flex;
      flex-direction: column;
      height: 100%;
      max-width: u.rem(80);
      color: #474747;
      font-size: u.rem(30);
      white-space: nowrap;

      p {
        cursor: pointer;
        font-weight: 600;
        line-height: u.rem(24);

        &:hover {
          color: white;
        }
      }

      span {
        opacity: 0.6;
        font-size: u.rem(24);
      }

      &-time {
        display: flex;
        align-items: center;

        h3 {
          font-size: u.rem(12);
        }

        i {
          bottom: u.rem(1);
          margin-left: u.rem(2);
          cursor: pointer;
          font-size: u.rem(12);
        }
      }
    }

    &-icon {
      width: 100%;
      height: 100%;
      max-width: u.rem(120);
      max-height: u.rem(120);
      animation: Orbita 15s linear infinite;
    }
  }

  &__bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: inherit;

    &-day {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33%;
      height: inherit;
      cursor: pointer;

      &:hover * {
        color: white;
        transition: all .5s
      }

      &:not(:last-child)::after {
        content: ' ';
      }

      img {
        min-width: u.rem(30);
        min-height: u.rem(30);
      }

      &-title {
        padding-top: u.rem(5);
        font-size: u.rem(12);
        font-weight: 600;
      }

      &-degrees {
        font-size: u.rem(16);

        span:first-child {
          font-weight: 600;
        }
      }
    }
  }
}


@keyframes Orbita {
  from {
    -webkit-transform: rotate(0deg) translateX(u.rem(10)) rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg) translateX(u.rem(10)) rotate(-360deg);
  }
}


</style>
