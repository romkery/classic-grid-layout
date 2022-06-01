import WeatherService from '@/services/WeatherService';
import {Service} from 'typedi';
import axios from 'axios';

@Service()
export default class BaseApiService {

    private token = 'f4534e918d35456488831428210812'

    public instance = axios.create({
        baseURL: 'http://api.weatherapi.com/v1',
        timeout: 1000,
        params: {
            "key": this.token
        }
    });

    public weatherService: WeatherService
}

// const serviceInstance = Container.get(BaseApiService);
