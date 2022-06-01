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
    public cityArray: Array<string> = []

    @State()
    public currentWeather: CurrentWeatherType[] = []

    @Mutation()
    public setCityCurrentWeather(cityObject: { city: string, data: CurrentType }) {
        this.currentWeather.push(cityObject)
    }

    public setCity(city: string) {
        this.city = city
    }

    // @Getter()
    // public getWeather() {
    //     return this.currentWeather
    // }

    @Action()
    public async getCityCurrentWeather(city: string) {

        if (this.cityArray.includes(city.toLowerCase())) {

            return this.currentWeather.find(el => el.city === city)

        } else {

            const data = await this.serviceInstance.getCurrent(city)

            this.cityArray.push(city.toLowerCase())

            this.setCityCurrentWeather({city, data})

            return this.currentWeather.find(el => el.city === city)

        }
    }
}


type CurrentWeatherType = {
    city: string,
    data: CurrentType
}

