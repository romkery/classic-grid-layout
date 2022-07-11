import BaseApiService from '@/services/api';
import {Service} from 'typedi';
import {CurrentResponseType, ForecastResponseType} from '@/services/ApiTypes';

@Service()
export default class WeatherService extends BaseApiService {

    public async getCurrent(city = "Novosibirsk", lang = 'en'): Promise<CurrentResponseType> {
        let data: any
        try {
            data = await this.instance.get<CurrentResponseType>(`current.json?q=${city.toLowerCase()}&lang=${lang}&aqi=yes&`)
            return data.data
        } catch (error) {
            console.log(error)
            return data.data
        }
    }

    public async getForecast(city = "Novosibirsk", days: number = 3, lang = 'en'): Promise<ForecastResponseType> {
        let data: any
        try {
            data = await this.instance.get<CurrentResponseType>(`forecast.json?q=${city.toLowerCase()}&lang=${lang}&days=${days}`)
            return data.data
        } catch (error) {
            console.log(error)
            return data.data
        }
    }

    public async getSearchCities(city: string): Promise<any> {
        if (city) {
            try {
                return (await this.instance.get(`search.json?q=${city.toLowerCase()}`)).data
            } catch (error) {
                console.log(error)
            }
        }
    }
}
