<template>
  <div class="modal modal-active fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    <div
      class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <div class="modal-content text-left px-8 py-4">
        <div class="flex justify-center items-center pb-3 pt-3">
          <p class="text-2xl font-bold">노선 정보</p>
        </div>
        <div id="subway-line-create-form" class="mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="subway-line-name">노선 이름</label>
            <input
              v-model="subwayLineName"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subway-line-name"
              type="text"
              placeholder="노선 이름을 입력해주세요"
            />
          </div>

          <div class="flex mb-4">
            <div class="w-1/3 pr-2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="first-time">첫차 시간</label>
              <input
                v-model="firstTime"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="first-time"
                type="text"
                placeholder="첫차 시간"
              />
            </div>
            <div class="w-1/3 pr-2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="last-time">막차 시간</label>
              <input
                v-model="lastTime"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="last-time"
                type="text"
                placeholder="막차 시간"
              />
            </div>

            <div class="w-1/3">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="interval-time">간격</label>
              <input
                v-model="intervalTime"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="interval-time"
                type="number"
                placeholder="간격"
              />
            </div>
          </div>

          <div id="subway-line-color-select-container" class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="subway-line-color">노선 색상</label>
            <input
              v-model="color"
              placeholder="색상을 선택해주세요"
              class="bg-gray-200 mb-4 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="subway-line-color"
              type="text"
              disabled
            />
            <button
              v-for="data in colorOptions"
              @click="inputColor(data.bgColor)"
              v-bind:key="data.color"
              :data-color="data.color"
              :class="[data.bgColor, data.hoverColor]"
              class="color-select-option button w-6 h-6 font-bold p-1 rounded"
            ></button>
          </div>

          <div class="flex justify-end pt-4">
            <button
              @click="$store.commit('toggleModal')"
              class="modal-close px-4 bg-transparent p-3 rounded text-gray-600 hover:bg-gray-100 hover:text-gray-700 mr-2 text-sm"
            >취소</button>
            <button
              @click="addLine"
              class="px-4 bg-yellow-500 hover:bg-yellow-400 hover:text-gray-700 text-gray-800 rounded text-white text-sm"
            >확인</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { subwayLineColorOptions } from "../../../public/admin/utils/defaultSubwayData.js";

export default {
  data() {
    return {
      colorOptions: subwayLineColorOptions,
      color: null,
      subwayLineName: null,
      firstTime: null,
      lastTime: null,
      intervalTime: null
    };
  },
  methods: {
    closeModal() {
      if (event) event.preventDefault();
      this.color = null;
      this.subwayLineName = null;
      this.firstTime = null;
      this.lastTime = null;
      this.intervalTime = null;
      this.$store.state.modalVisible = false;
      this.$store.commit("toggleModal");
    },
    inputColor(color) {
      if (event) event.preventDefault();
      this.color = color;
    },
    addLine() {
      const data = {
        name: this.subwayLineName,
        startTime: this.firstTime,
        endTime: this.lastTime,
        intervalTime: this.intervalTime,
        color: this.color
      };

      this.$store.commit("addLine", data);
    }
  }
};
</script>