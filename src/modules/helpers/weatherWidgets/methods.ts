import {ForecastResponseType} from '@/services/ApiTypes';

export async function changeCity(this: any, time: string): Promise<ForecastResponseType> {
    let data: ForecastResponseType;
    this.model.props!.city = this.weatherModule?.city

    if (time === 'current') {
        data = await this.weatherModule?.getCityCurrent(this.model.props?.city!)
    } else {
        data = await this.weatherModule?.getCityForecast(this.model.props?.city!, 3)
    }

    this.changeEvent(this.layout)
    return data;
}

export async function refreshCity(this: any, time: string): Promise<ForecastResponseType> {

    let data = await this.weatherModule?.refreshCityData(this.model.props?.city!, time)
    this.changeEvent(this.layout)
    return data;
}
