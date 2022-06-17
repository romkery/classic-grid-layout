import {CurrentResponseType} from '@/services/ApiTypes';

export default function getLocalTime(cityData: CurrentResponseType) {
    if (cityData.location) {
        const time = cityData.location.localtime.split(' ')[1]
        const hour: number = +time.split(':')[0]
        let abbreviations: string = ''

        hour > 0 && hour < 12 ? abbreviations = 'AM' : abbreviations = "PM"

        return time + ' ' + abbreviations
    } else return
}
