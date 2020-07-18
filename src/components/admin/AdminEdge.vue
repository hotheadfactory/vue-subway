<template>
  <div>
    <div class="flex justify-center md:py-10 lg:py-10 app-container">
      <div class="max-w-md w-full lg:width-450px rounded bg-white shadow-lg p-6">
        <div class="font-bold text-xl mb-4 relative w-full flex items-stretch">
          <div class="flex-1"></div>
          <div class="flex-1 text-center">구간 관리</div>
          <div class="flex-1 flex justify-end">
            <button
              @click="$store.commit('toggleModal')"
              id="subway-line-add-btn"
              class="modal-open bg-transparent bg-yellow-500 hover:bg-yellow-400 hover:text-gray-700 text-gray-800 text-sm px-3 py-1 rounded"
            >구간 추가</button>
          </div>
        </div>
        <div class="flex relative">
          <div id="slider-controls" class="hidden lg:block xl:block">
            <button
              data-controls="prev"
              aria-controls="customize"
              tabindex="-1"
              class="prev prev-btn top-50 z-10 absolute top-0 left-10px bg-white rounded-full h-8 w-8 text-base text-gray-600 hover:text-gray-400 focus:text-gray-400 -ml-6 focus:outline-none focus:shadow-outline"
            >
              <span class="block" style="transform: scale(-1);">&#x279c;</span>
            </button>
            <button
              aria-controls="customize"
              tabindex="-1"
              data-controls="next"
              class="next next-btn top-50 z-10 absolute top-0 right-10px bg-white rounded-full h-8 w-8 text-base text-gray-600 hover:text-gray-400 focus:text-gray-400 -mr-6 focus:outline-none focus:shadow-outline"
            >
              <span class="block" style="transform: scale(1);">&#x279c;</span>
            </button>
          </div>
          <div class="w-full h-full">
            <tiny-slider
              v-bind="tnsOptions"
              v-if="$store.state.lineStations.length > 0"
              class="subway-lines-slider"
            >
              <div
                v-for="line in $store.state.lineStations"
                v-bind:key="line.id"
                class="inline-block w-1/2 px-2"
              >
                <div class="rounded-sm w-full slider-list" :data-id="line.id">
                  <div class="border lint-title px-4 py-1" :class="line.color">{{ line.name }}</div>
                  <div class="overflow-y-auto height-90">
                    <div
                      v-for="value in line.stations"
                      v-bind:key="value.id"
                      class="list-item border border-gray-200 py-2 px-4 text-gray-800"
                      :data-id="value.id"
                    >
                      {{ value.name }}
                      <button
                        @click="deleteLineStation(line.id, value.id)"
                        class="hover:bg-gray-300 hover:text-gray-500 text-gray-300 px-1 rounded-full float-right"
                      >
                        <span class="mdi mdi-delete"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </tiny-slider>
          </div>
        </div>
      </div>
    </div>
    <adminEdgeModal v-if="$store.state.modalVisible" />
  </div>
</template>

<script>
import adminEdgeModal from "./AdminEdgeModal.vue";
import tns from "vue-tiny-slider";

export default {
  components: {
    "tiny-slider": tns,
    adminEdgeModal
  },
  data() {
    return {
      tnsOptions: {
        container: ".subway-lines-slider",
        loop: true,
        slideBy: "page",
        speed: 400,
        autoplayButtonOutput: false,
        "mouse-drag": true,
        lazyload: true,
        controlsContainer: "#slider-controls",
        items: 1,
        edgePadding: 25
      }
    };
  },
  mounted() {
    this.$store.commit("getStations");
    this.$store.commit("getLineStations");
  },
  methods: {
    deleteLineStation(lineId, stationId) {
      try {
        console.log(stationId);
        this.$store.commit("deleteLineStation", { lineId, stationId });
        this.$store.commit("getLineStations");
      } catch (e) {
        alert(e);
      }
    }
  }
};
</script>

<style>
@import "../../../public/admin/css/admin-edge.css";
@import "../../../public/admin/lib/slider/tiny-slider.css";
</style>
