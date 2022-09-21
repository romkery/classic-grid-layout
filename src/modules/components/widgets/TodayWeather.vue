<template>
  <WidgetBasis :model="model">
    <div class="widget__content"
         v-if="!model?.props.isLoading"
         :style="getStyles()"
    >
      <div class="widget__header">
        <p>{{ cityData?.current?.temp_c }}°</p>
      </div>
      <span id="separator"/>
      <div class="widget__bottom">
        <img :src="cityData?.current?.condition.icon"
             alt="condition-icon"/>
        <div class="widget__bottom-info">
          <i class="el-icon-location"/>
          <!--                    <el-tooltip content="Change to current" placement="top">-->
          <!--                    </el-tooltip>-->
          <h3 @click="changeCity">{{ cityData?.location?.name }}</h3>
        </div>
        <div class="widget__bottom-info">
          <h3>{{ getLocalTime(cityData) }}</h3>
          <i class="el-icon-refresh" @click="refreshCity"/>
        </div>
      </div>
    </div>
  </WidgetBasis>
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
import mockCityData from '@/modules/helpers/weatherWidgets/mockCityData';
import getLocalTime from '@/modules/helpers/weatherWidgets/getLocalTime';
import WidgetBasis from '@/common/mixins/WidgetBasis.vue';
import getStyles from '@/modules/helpers/getStyles';
import onCreated from '@/modules/helpers/weatherWidgets/onCreated';
import {changeCity, refreshCity} from '@/modules/helpers/weatherWidgets/methods';

@Component({
  components: {
    WidgetBasis,
    DefaultSkeleton,
    DeleteAlert
  }
})
export default class TodayWeather extends Vue {

  @Prop({}) protected model!: LayoutItemType;
  @Prop({}) protected layout!: LayoutType;
  @Prop({}) protected changeEvent: (layout: LayoutType) => void;

  protected storage = new LayoutStorage()
  protected weatherModule?: WeatherModule | any = useModule(this.$store, ['weatherModule']);
  protected cityData: ForecastResponseType = mockCityData;
  protected getLocalTime = getLocalTime;
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
      }], 2, 30
  )

  protected async refreshCity() {
    // Получение обновленных данных универсальной функцией
    this.cityData = await refreshCity.bind(this, 'current')();
  }

  protected async changeCity() {
    this.cityData = await changeCity.bind(this, 'current')();
  }

  protected onCreated = onCreated.bind(this, 'current');
  protected getStyles = getStyles.bind(this);// Присваивание универсальной функции

  async created() {
    this.cityData = await this.onCreated();
  }

}

</script>

<style lang="scss" scoped>
@use './src/scss/util/fonts' as ft;
@use './src/scss/util' as u;

.widget {

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: u.rem(10);
    background: #66b8fb;
    color: white;
    font-style: normal;
    font-weight: 400;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-left: u.rem(10);

    p {
      position: absolute;
      font-size: u.rem(40);
    }
  }

  #separator {
    width: 100%;
    height: 100%;
    max-height: u.rem(100);
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;

    img {
      width: 100%;
      height: 100%;
      max-width: u.rem(90);
      max-height: u.rem(90);
    }

    &-info {
      display: flex;
      justify-content: end;
      align-items: center;
      max-height: 100%;

      h3 {
        font-size: u.rem(17);
        line-height: u.rem(19);

        &:last-child {
          cursor: pointer;

          &:hover {
            color: black;
            transition: .5s;
          }
        }
      }

      .el-icon-location {
        bottom: u.rem(2);
        margin-right: u.rem(2);
        font-size: u.rem(18);
      }

      .el-icon-refresh {
        bottom: u.rem(1);
        margin-left: u.rem(2);
        cursor: pointer;
        font-size: u.rem(18);
      }
    }
  }
}
</style>
