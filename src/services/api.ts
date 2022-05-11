import WeatherService from '@/services/WeatherService';
import {Service} from 'typedi';

@Service()
export default class BaseApiService {

    public weatherService: WeatherService
}

// const serviceInstance = Container.get(BaseApiService);
