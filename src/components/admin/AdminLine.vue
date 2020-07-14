<template>
  <div>
    <div class="flex justify-center md:py-10 lg:py-10 app-container">
      <div class="max-w-md width-450px rounded bg-white shadow-lg p-6">
        <div>
          <div class="font-bold text-xl mb-4 relative w-full flex items-stretch">
            <div class="flex-1"></div>
            <div class="flex-1 text-center">노선 관리</div>
            <div class="flex-1 flex justify-end">
              <button
                v-on:click="$store.commit('toggleModal')"
                id="subway-line-add-btn"
                class="modal-open bg-transparent bg-yellow-500 hover:bg-yellow-400 hover:text-gray-700 text-gray-800 text-sm px-3 py-1 rounded"
              >노선 추가</button>
            </div>
          </div>
          <div class="lines-info flex flex-wrap mb-3 w-full">
            <div class="w-1/2 p-2 text-center text-gray-800 bg-gray-200">첫차 시간</div>
            <div class="w-1/2 p-2 text-center text-gray-800 bg-gray-100" id="start-time-view">--:--</div>
            <div class="w-1/2 p-2 text-center text-gray-800 bg-gray-200">막차 시간</div>
            <div class="w-1/2 p-2 text-center text-gray-800 bg-gray-100" id="end-time-view">--:--</div>
            <div class="w-1/2 p-2 text-center text-gray-800 bg-gray-200">간격</div>
            <div class="w-1/2 p-2 text-center text-gray-800 bg-gray-100" id="interval-time-view">-</div>
          </div>
        </div>
        <div class="mt-5 flex subway-lines-container relative overflow-y-auto">
          <div id="subway-line-list" class="w-full">
            <div
              v-for="line in $store.state.lines"
              v-bind:key="line.id"
              class="subway-line-item border border-gray-200 py-2 px-4 text-gray-800"
              :data-id="line.id"
            >
              <span class="w-3 h-3 rounded-full inline-block mr-1" :class="line.color"></span>
              <span id="line-name">{{ line.name }}</span>
              <button
                class="hover:bg-gray-300 hover:text-gray-500 text-gray-300 px-1 rounded-full float-right"
              >
                <span class="mdi mdi-delete"></span>
              </button>
              <button
                class="hover:bg-gray-300 hover:text-gray-500 text-gray-300 px-1 rounded-full float-right"
              >
                <span class="mdi mdi-pencil"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <adminLineModal v-if="$store.state.modalVisible" />
  </div>
</template>
  
<script>
import adminLineModal from "./AdminLineModal.vue";

export default {
  components: {
    adminLineModal
  },
  mounted() {
    this.$store.commit("getLines");
  }
};
</script>

<style>
@import "../../../public/admin/css/admin-line.css";
</style>
