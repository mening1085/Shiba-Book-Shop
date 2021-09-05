import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import book from "./modules/book.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    book,
  },
  plugins: [createPersistedState()],
});
