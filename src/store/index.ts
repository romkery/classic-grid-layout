import Vue from 'vue';
import Vuex from 'vuex';
import {createVuexStore} from 'vuex-simple';
import RootModule from './modules/RootModule';

Vue.use(Vuex);

const MyStore = new RootModule()

export default createVuexStore(MyStore, {
    strict: false,
    modules: {},
});


