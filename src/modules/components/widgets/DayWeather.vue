<template>
  <div class="container">
    <div class="day-info"
         :style="styles()"
         @click="setIsInfo">
      <div class="day-info__header">
        <div class="day-info__header-info">
          <p>{{ cityData?.location?.name }}</p>
          <p>
            <span>
              {{ dayData.day.maxtemp_c.toFixed() }}°
            </span>
            <span>
              {{ dayData.day.mintemp_c.toFixed() }}°
            </span>
            <br/>
            <span>average {{ dayData.day.avgtemp_c }}°</span>
            <br/>
            <span>{{ days[new Date(dayData.date).getDay()] }}</span>
          </p>
        </div>
        <img class="day-info__header-icon" :src="dayData.day.condition.icon" alt="condition icon"/>
      </div>
      <span id="separator"/>
      <div class="day-info__bottom">
        <div class="day-info__bottom-uv-index">
          <img src="/src/assets/img/sun.png" alt="humidity">
          <h3>UV</h3>
          <p>{{ dayData.day.uv }}/11</p>
        </div>
        <div class="day-info__bottom-wind">
          <img src="/src/assets/img/wind.png" alt="humidity">
          <h3>Wind</h3>
          <p>{{ dayData.day.maxwind_kph }} km/h</p>
        </div>
        <div class="day-info__bottom-humidity">
          <img src="/src/assets/img/humidity.png" alt="humidity">
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
      width: 100%;
      padding-top: 7%;
      padding-left: 7%;

      &-icon {
        width: 100%;
        height: 100%;
        max-width: u.rem(120);
        max-height: u.rem(120);
        animation: Orbita 15s linear infinite;
      }

      &-info {
        z-index: 2;
        height: 100%;
        max-width: u.rem(70);
        white-space: nowrap;

        p {
          font-family: Quicksand-Regular, sans-serif;
          font-size: u.rem(30);
          line-height: 1.5rem;
        }

        span {
          font-size: u.rem(18);

          &:not(:last-child) {
            font-family: Quicksand-Regular, sans-serif;
          }
        }
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
