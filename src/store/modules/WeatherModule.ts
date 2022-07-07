import Vue from 'vue';
import {Action, Mutation, State} from 'vuex-simple';
import {Container} from 'typedi';
import WeatherService from '@/services/WeatherService';
import {CurrentResponseType, ForecastResponseType} from '@/services/ApiTypes';
import LayoutStorage from '@/modules/helpers/LayoutStorage';

export default class WeatherModule extends Vue {

    public serviceInstance = Container.get(WeatherService);
    private storage = new LayoutStorage()

    @State()
    public city: string = 'Novosibirsk'

    @State()
    public currentCache: any = {}

    @State()
    public forecastCache: any = {}

    @State()
    public currentWeather: (CurrentResponseType)[] = []

    @State()
    public forecastWeather: (ForecastResponseType)[] = []

    @Mutation()
    public setCityCurrentWeather(data: CurrentResponseType) {
        this.currentWeather.push(data)
    }

    @Mutation()
    public setCityForecastWeather(data: ForecastResponseType) {
        this.forecastWeather.push(data)
    }

    public setCity(city: string) {
        this.city = city[0].toUpperCase() + city.slice(1)
        this.storage.saveCityChanges(city)
    }

    public getLocalStorageCity() {
        const city = this.storage.getLocalStorageCity()
        this.setCity(city)
    }

    @Action()
    public async getCityCurrent(city: string) {
        city = city.toLowerCase()
        if (!this.currentCache[city]) {
            this.currentCache[city] = this.getCityCurrentWeather(city)
        }

        return (await this.currentCache[city]).data
    }

    @Action()
    public deleteCache() {
        this.currentCache = {}
    }

    public async refreshCityData(city: string, time: string) {
        let data: CurrentResponseType
        if (time === 'current') data = await this.serviceInstance.getCurrent(city);
        else data = await this.serviceInstance.getForecast(city);
        return data;
    }

    public async getCityCurrentWeather(city: string) {
        const data: CurrentResponseType = await this.serviceInstance.getCurrent(city)
        this.setCityCurrentWeather(data)

        return {data}
    }

    public async getCityForecast(city: string, days: number) {
        city = city.toLowerCase()
        if (!this.forecastCache[city]) {
            this.forecastCache[city] = this.getCityForecastWeather(city, days)
        }

        return (await this.forecastCache[city]).data
    }


    public async getCityForecastWeather(city: string, days: number) {
        const data: ForecastResponseType = await this.serviceInstance.getForecast(city, days)
        this.setCityForecastWeather(data)

        return {data}
    }


    @State() autocompleteCities: object[] = []

    @Action()
    public async getAutocompleteCities(city: string) {
        this.autocompleteCities = []
        const data = await this.serviceInstance.getSearchCities(city)
        data?.forEach((el: any) => {
            this.autocompleteCities.push({value: el.name})
        })

        return this.autocompleteCities
    }

}

