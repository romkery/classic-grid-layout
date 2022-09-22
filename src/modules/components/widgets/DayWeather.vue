<template>
  <div class="container">
    <div class="day-info"
         :style="styles()"
         @click="setIsInfo">
      <div class="day-info__header">
        <div class="day-info__header-title">
          <p>{{ cityData?.location?.name }}</p>
          <span>{{ dayData.day.maxtemp_c.toFixed() }}°
            {{ dayData.day.mintemp_c.toFixed() }}°
            <i class="el-icon-refresh" @click="refreshCity"/>
          </span>
          <h3>average {{ dayData.day.avgtemp_c }}°</h3>
          <span>{{ days[new Date(dayData.date).getDay()] }}</span>
        </div>
        <img class="day-info__header-icon" :src="dayData.day.condition.icon" alt="condition icon"/>
      </div>
      <span id="separator"/>
      <div class="day-info__bottom">
        <div class="day-info__bottom-uv-index">
          <img src="../../../assets/img/sun.png" alt="uv-index">
          <h3>UV</h3>
          <p>{{ dayData.day.uv }}/11</p>
        </div>
        <div class="day-info__bottom-wind">
          <img src="../../../assets/img/wind.png" alt="wind">
          <h3>Wind</h3>
          <p>{{ dayData.day.maxwind_kph }} km/h</p>
        </div>
        <div class="day-info__bottom-humidity">
          <img src="../../../assets/img/humidity.png" alt="humidity">
          <h3>RH</h3>
          <p>{{ dayData.day.avghumidity }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">

import Component from 'vue-class-component';
import Vue from 'vue';
import DefaultSkeleton from '@/common/mixins/DefaultSkeleton.vue';
import DeleteAlert from '@/common/mixins/DeleteAlert.vue';
import {Prop} from 'vue-property-decorator';
import {ForecastDayType, ForecastResponseType} from '@/services/ApiTypes';


@Component({
  components: {
    DefaultSkeleton,
    DeleteAlert
  }
})
export default class DayWeather extends Vue {

  @Prop({}) protected isInfo: any
  @Prop({}) protected styles: any
  @Prop({}) protected cityData: ForecastResponseType
  @Prop({}) protected selectedDay: number
  @Prop({}) protected days: number
  @Prop({}) protected refreshCity: number

  public dayData!: ForecastDayType

  protected setIsInfo() {
    this.$emit('update:isInfo', false)
  }

  created() {
    this.dayData = this.cityData?.forecast?.forecastday[this.selectedDay - 1]
  }
}

</script>


<style lang="scss" scoped>
@use './src/scss/util' as u;
@import './src/scss/globals/variables';

.container {

  height: inherit;

  .day-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: inherit;
    height: $grid-content-height;
    background: #66b8fb;
    border-radius: u.rem(16);
    cursor: pointer;
    overflow: hidden;

    * {
      color: #474747;
      line-height: 1.5;
    }

    #separator {
      height: 100%;
      max-height: u.rem(60);
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

        h3 {
          font-size: u.rem(12);
        }

        span {
          opacity: 0.6;
          font-size: u.rem(24);
        }

        i {
          font-size: u.rem(20);
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
      justify-content: center;
      align-items: center;
      height: inherit;
      margin-bottom: u.rem(10);

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 33%;
        white-space: nowrap;

        img {
          width: 40%;
          height: 40%;
          min-width: u.rem(30);
          min-height: u.rem(30);
        }

        p {
          font-family: Circe-Bold, serif;
        }
      }

      p {
        padding: 0;

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
