import {shallowMount} from '@vue/test-utils';

// describe('Компонент DayWeather', () => {
//     const wrapper = mount(DayWeather)
//     const vm = wrapper.vm
// })
const DayWeather = require("../../modules/components/widgets/DayWeather");

describe('DayWeather.vue', () => {

  const dayWeather = new DayWeather()
  test('является экземпляром Vue', () => {
    const wrapper = shallowMount(dayWeather)
    expect(wrapper.find('b').text()).toMatch('Hello')
  })
})
