const state = {
  showCart: false,
};

const getters = {};

const actions = {};

const mutations = {
  SHOW_CART(state) {
    state.showCart = !state.showCart;
  },
  SET_SHOW_CART(state) {
    state.showCart = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
