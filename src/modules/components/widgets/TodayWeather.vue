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

.widget {

  &__content {
    color: white;
    background: #66b8fb;
    font-family: Circe-Light, serif;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
  }

  &__header {
    margin-left: 10px;
    display: flex;
    justify-content: space-between;

    p {
      position: absolute;
      font-size: 2.5rem;
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
    align-items: end;
    justify-content: end;

    img {
      max-height: 90px;
      max-width: 90px;
      height: 100%;
      width: 100%;
    }

    &-info {
      max-height: 100%;
      display: flex;
      align-items: center;
      justify-content: end;

      h3 {
        line-height: 1.4rem;
        font-size: 1.2rem;

        &:last-child {
          cursor: pointer;

          &:hover {
            color: black;
            transition: .5s;
          }
        }
      }

      .el-icon-location {
        margin-right: 2px;
        font-size: 18px;
        bottom: 2px;
      }

      .el-icon-refresh {
        font-size: 18px;
        bottom: 1px;
        margin-left: 2px;
        cursor: pointer;
      }
    }
  }
}
</style>
