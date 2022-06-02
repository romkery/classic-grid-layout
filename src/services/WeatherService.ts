import BaseApiService from '@/services/api';
import {Service} from 'typedi';
import {CurrentResponseType, CurrentType} from '@/services/ApiTypes';

@Service()
export default class WeatherService extends BaseApiService {

    public async getCurrent(city = "Novosibirsk", lang = 'en'): Promise<CurrentType | string> {
        try {
            const data = await this.instance.get<CurrentResponseType>(`current.json?q=${city}&lang=${lang}&aqi=yes&`)
            return data.data.current
        } catch (error) {
            console.log(error)
            return `"${city}" is not exist.`
        }
    }
}
