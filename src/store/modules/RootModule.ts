import {Module, State} from 'vuex-simple';
import Vue from 'vue';
import vuex from 'vuex';
import WeatherModule from '@/store/modules/WeatherModule';

Vue.use(vuex);

export default class RootModule {

    @Module()
    public weatherModule = new WeatherModule()

    @State()
    public version: string = "2.0.0";
}


