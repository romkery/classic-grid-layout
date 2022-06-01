import Vue from 'vue';
import {Action, Mutation, State} from 'vuex-simple';
import {Container} from 'typedi';
import WeatherService from '@/services/WeatherService';
import {CurrentType} from '@/services/ApiTypes';

export default class WeatherModule extends Vue {

    public serviceInstance = Container.get(WeatherService);

    @State()
    public city: string = 'Novosibirsk'

    @State()
    public cache: any = {}

    @State()
    public currentWeather: CurrentType[] = []

    @Mutation()
    public setCityCurrentWeather(data: CurrentType) {
        this.currentWeather.push(data)
    }

    public setCity(city: string) {
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

        const data = await this.serviceInstance.getCurrent(city)
        data['cityName'] = city
        this.setCityCurrentWeather(data)

        return {data}
    }
}

