import Vue from 'vue';
import {Action, Mutation, State} from 'vuex-simple';
import {Container} from 'typedi';
import WeatherService from '@/services/WeatherService';
import {CurrentResponseType} from '@/services/ApiTypes';

export default class WeatherModule extends Vue {

    public serviceInstance = Container.get(WeatherService);

    @State()
    public city: string = 'Novosibirsk'

    @State()
    public cache: any = {}

    @State()
    public currentWeather: (CurrentResponseType | string)[] = []

    @Mutation()
    public setCityCurrentWeather(data: CurrentResponseType | string) {
        this.currentWeather.push(data)
    }

    public setCity(city: string) {
        debugger
        this.city = city[0].toUpperCase() + city.slice(1)
    }

    @Action()
    public async getCity(city: string) {
        city = city.toLowerCase()

        if (!this.cache[city]) {
            this.cache[city] = this.getCityCurrentWeather(city)
        }
        return (await this.cache[city]).data
    }

    public async getCityCurrentWeather(city: string) {

        const data: CurrentResponseType | string = await this.serviceInstance.getCurrent(city)
        if (typeof data === 'object') {
            data.current['cityName'] = city[0].toUpperCase() + city.slice(1)
        }

        this.setCityCurrentWeather(data)

        return {data}
    }


    @State() autocompleteCities = []


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

