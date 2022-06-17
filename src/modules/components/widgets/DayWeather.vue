<template>
  <span>
    <div class="day-info"
         :style="styles()"
         @click="setIsInfo">
      <div class="day-info__header">
        <div class="day-info__header-info">
          <h2>{{ cityData?.location?.name }}</h2>
          <p>
            <span>
              {{ dayData.day.maxtemp_c.toFixed() }}°
            </span>
            <span>
              {{ dayData.day.mintemp_c.toFixed() }}°
            </span>
            <br/>
             <span>average {{ dayData.day.avgtemp_c }}</span>
            <br/>
            <span>{{ days[new Date(dayData.date).getDay()] }}</span>
          </p>
        </div>
         <img class="day-info__header-icon" :src="dayData.day.condition.icon"/>
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
  </span>
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

  protected dayData!: ForecastDayType

  protected setIsInfo() {
    this.$emit('update:isInfo', false)
  }


  created() {
    this.dayData = this.cityData?.forecast?.forecastday[this.selectedDay - 1]
  }
}

</script>


<style lang="scss" scoped>
@import '../../../assets/styles/variables';

.day-info {
  width: inherit;
  height: $grid-content-height;
  background: #66b8fb;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  * {
    font-family: Circe-Light;
    color: #474747;
    line-height: 1.5;
  }

  #separator {
    max-height: 60px;
    height: 100%;
  }

  &__header {
    width: 100%;
    padding-left: 7%;
    padding-top: 7%;
    display: flex;
    justify-content: space-between;

    &-icon {
      max-height: 150px;
      max-width: 150px;
      height: 100%;
      width: 100%;
      animation: Orbita 15s linear infinite;
    }

    &-info {
      white-space: nowrap;
      max-width: 70px;
      height: 100%;
      z-index: 2;

      h2 {
        font-size: 30px;
        font-family: Circe-Regular;
      }

      span {
        font-size: 18px;

        &:not(:last-child) {
          font-family: Circe-Regular;
        }
      }
    }

  }

  &__bottom {
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    div {
      width: 33%;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        min-width: 30px;
        min-height: 30px;
        height: 40%;
        width: 40%;
      }

      p {
        font-family: Circe-Bold;
      }
    }

    p {
      padding: 0;

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
