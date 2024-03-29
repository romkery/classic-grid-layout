import {CurrentResponseType} from '@/services/ApiTypes';

const getLocalTime = (cityData: CurrentResponseType): string | void => {
    if (cityData.location) {
        const time = cityData.location.localtime.split(' ')[1]
        const hour: number = +time.split(':')[0]
        let abbreviations: string = ''

        hour > 0 && hour < 12 ? abbreviations = 'AM' : abbreviations = "PM"

        return time + ' ' + abbreviations
    }
}

export default getLocalTime
