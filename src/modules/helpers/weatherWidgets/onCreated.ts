import {ForecastResponseType} from '@/services/ApiTypes';
import mockCityData from '@/modules/helpers/weatherWidgets/mockCityData';

async function onCreated(this: any, time: string): Promise<ForecastResponseType> {

    let data!: ForecastResponseType

    if (this.model) {
        this.model!.props!.isLoading! = true

        if (!this.model?.props?.city) {
            this.storage.setWidgetCity(this.weatherModule?.city!, this.model)
            this.changeEvent(this.layout)
        }

        if (time === 'current') {
            data = await this.weatherModule?.getCityCurrent(this.model.props?.city!)
        } else {
            data = await this.weatherModule?.getCityForecast(this.model.props?.city!, 3)
        }

        this.model!.props!.isLoading! = false
        return data

    } else {
        return mockCityData;
    }
}

export default onCreated
