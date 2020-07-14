import Vue from "vue";
import Vuex from "vuex";
import adminApi from "../../public/admin/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modalVisible: false,
    lines: [],
    lineStations: [],
    stations: [],
  },
  mutations: {
    toggleModal(state) {
      state.modalVisible = state.modalVisible ? false : true;
    },
    getLines(state) {
      adminApi.line.get().then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        state.lines = data;
      });
    },
    addLine(state, data) {
      adminApi.line.create(data).then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        state.lines.push(data);
        state.modalVisible = false;
      });
    },
  },
  actions: {
    getLines(context) {
      context.commit("getLines");
    },
    addLine(context, data) {
      context.commit("addLine", data);
    },
    toggleModal(context) {
      context.commit("toggleModal");
    },
  },
});
