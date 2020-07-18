import Vue from "vue";
import Vuex from "vuex";
import adminApi from "../../public/admin/api";
import { CONFIRM_MESSAGE } from "../../public/admin/utils/constants.js";

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
    getStations(state) {
      adminApi.station.get().then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        state.stations = data;
      });
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
    getLineStations(state) {
      adminApi.line.get().then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        state.lineStations = data;
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
    addLineStation(state, value) {
      adminApi.lineStation
        .create(
          state.lineStations.find((line) => line.name === value.lineName).id,
          {
            preStationId: value.preStation ? value.preStation.id : null,
            stationId: value.station ? value.station.id : null,
            distance: value.distance,
            duration: value.duration,
          }
        )
        .then((data) => {
          if (data.error !== undefined) throw data;
          state.toggleModal(state);
          state.getLineStations(state);
        })
        .catch(() => {
          alert("올바르지 않은 요청입니다.");
        });
    },
    deleteStation(state, value) {
      const isRemove = confirm(CONFIRM_MESSAGE.REMOVE);
      if (!isRemove) {
        return;
      }

      adminApi.station.delete(value.id).then(() => {
        state.stations.splice(state.stations.indexOf(value), 1);
      });
    },
    deleteLine(state, value) {
      const isRemove = confirm(CONFIRM_MESSAGE.REMOVE);

      if (!isRemove) {
        return;
      }

      adminApi.line.delete(value.id).then(() => {
        state.lines.splice(state.lines.indexOf(value), 1);
      });
    },
    deleteLineStation(state, payload) {
      const isRemove = confirm(CONFIRM_MESSAGE.REMOVE);
      if (!isRemove) {
        return;
      }

      adminApi.lineStation.delete(payload.lineId, payload.stationId);
    },
  },
  actions: {},
});
