<template>
  <WidgetBasis :model="model">
    <div class="widget__content"
         v-if="!model?.props.isLoading"
         :style="styles()"
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
          <el-tooltip content="Change to current" placement="top">
            <h3 @click="changeCity">{{ cityData?.location?.name }}</h3>
          </el-tooltip>
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
import mockCityData from '@/modules/helpers/mockCityData';
import getLocalTime from '@/modules/helpers/getLocalTime';
import WidgetBasis from '@/modules/components/WidgetBasis.vue';


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

  protected layoutStorage = new LayoutStorage()
  protected weatherModule?: WeatherModule | any = useModule(this.$store, ['weatherModule']);
  protected cityData: ForecastResponseType = mockCityData;
  protected getLocalTime = getLocalTime;
  protected ownProperty: LayoutItemType = this.layoutStorage.createNewWidget(2, 30, 'TodayWeather', 'skeleton',
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

  protected async changeCity() {
    this.model.props!.city = this.weatherModule?.city
    this.cityData = await this.weatherModule?.getCityCurrent(this.model.props?.city!)
    this.changeEvent(this.layout)
  }

  protected async refreshCity() {
    this.cityData = await this.weatherModule?.refreshCityData(this.model.props?.city!, 'current')
    this.changeEvent(this.layout)
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
      this.model.props!.isLoading = true;

      if (!this.model?.props?.city) {
        this.layoutStorage.setWidgetCity(this.weatherModule?.city!, this.model);
        this.changeEvent(this.layout);
      }

      this.cityData = await this.weatherModule?.getCityCurrent(this.model.props?.city!);

      this.model!.props!.isLoading! = false;
    }
  }
}

</script>


<style lang="less" scoped>

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
