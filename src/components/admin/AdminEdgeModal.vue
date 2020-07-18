<template>
  <div
    class="modal modal-active z-10 fixed w-full h-full top-0 left-0 flex items-center justify-center"
  >
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    <div
      class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <div class="modal-content text-left px-8 py-4">
        <div class="flex justify-center items-center pb-3 pt-3">
          <p class="text-2xl font-bold">구간 추가</p>
        </div>

        <form class="mb-4">
          <div class="relative w-full mt-3 mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2">노선 선택</label>
            <div class="relative">
              <select
                v-model="lineName"
                id="station-select-options"
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option
                  v-for="line in $store.state.lineStations"
                  v-bind:key="line.id"
                  :data-id="line.id"
                >{{ line.name }}</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mb-8 w-full">
            <div class="w-1/3 h-12 text-gray-800">
              <label class="block text-gray-700 text-sm font-bold mb-2">이전역</label>
              <input
                v-model="departStationName"
                class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="depart-station-name"
                type="text"
                value
                placeholder="이전역"
              />
            </div>
            <div
              class="w-1/3 h-12 text-center text-gray-800 flex justify-center items-center relative top-28px"
            >
              <img
                class="relative bottom-6px w-2/4"
                src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/2020-03-31T09%3A21%3A26.173image.png"
              />️
            </div>
            <div class="w-1/3 h-12 text-gray-800">
              <label class="block text-gray-700 text-sm font-bold mb-2">대상역</label>
              <input
                v-model="arrivalStationName"
                class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="arrival-station-name"
                type="text"
                value
                placeholder="대상역"
              />
            </div>
          </div>

          <div class="flex flex-wrap mb-8 w-full">
            <div class="w-1/3 h-12 text-gray-800">
              <label class="block text-gray-700 text-sm font-bold mb-2">거리</label>
              <input
                v-model="distance"
                class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="distance"
                type="number"
                value
                placeholder="거리"
              />
            </div>
            <div
              class="w-1/3 h-12 text-center text-gray-800 flex justify-center items-center relative top-28px"
            ></div>
            <div class="w-1/3 h-12 text-gray-800">
              <label class="block text-gray-700 text-sm font-bold mb-2">소요 시간</label>
              <input
                v-model="duration"
                class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="duration"
                type="number"
                value
                placeholder="소요 시간"
              />
            </div>
          </div>

          <div class="flex justify-end pt-4">
            <button
              class="modal-close px-4 bg-transparent p-3 rounded text-gray-600 hover:bg-gray-100 hover:text-gray-700 mr-2 text-sm"
            >취소</button>
            <button
              @click="addLineStation()"
              type="submit"
              id="submit-button"
              class="px-4 bg-yellow-500 hover:bg-yellow-400 hover:text-gray-700 text-gray-800 rounded text-white text-sm"
            >확인</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lineName: null,
      lineID: null,
      departStationName: null,
      arrivalStationName: null,
      distance: null,
      duration: null
    };
  },
  methods: {
    addLineStation() {
      event.preventDefault();
      const data = {
        lineName: this.lineName,
        preStation: this.$store.state.stations.find(
          station => station.name === this.departStationName
        ),
        station: this.$store.state.stations.find(
          station => station.name === this.arrivalStationName
        ),
        distance: this.distance,
        duration: this.duration
      };
      this.$store.commit("addLineStation", data);
      this.cleanFields();
    },
    cleanFields() {
      this.lineName = this.departStationName = this.arrivalStationName = this.distance = this.duration = null;
    }
  }
};
</script>