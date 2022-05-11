import {Module, State} from 'vuex-simple';
import Vue from 'vue';
import Vuex from 'Vuex';
import WeatherModule from '@/store/modules/WeatherModule';

Vue.use(Vuex);

export default class Store {

    @Module()
    public weatherModule = new WeatherModule()

    @State()
    public version: string = "2.0.0";
}


