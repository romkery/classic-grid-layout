import {Module, State} from 'vuex-simple';
import GridModule, {gridModule} from '@/store/GridModule';
import Vue from 'vue';
import Vuex from 'Vuex';

Vue.use(Vuex);

export default class MyStore {

    @Module()
    public gridModule: GridModule = gridModule;

    @State()
    public version = "2.0.0";
}

export const myStore = new MyStore();

