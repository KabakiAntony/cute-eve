import { createStore } from "vuex";
import auth from './modules/auth';
import items from './modules/items';
import VuexPersistence from 'vuex-persist'

const store = createStore({
  modules: {
    auth,
    items
    },
  plugins: [new VuexPersistence().plugin],
});


export default store