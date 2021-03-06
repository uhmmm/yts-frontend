import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
/* eslint-disable */
  state: {
    router: {
      view: "list", //list, listnetwork, discourse
      results: {
        elemUuid: '',
        activeNode: {}
      },
      context: {
        showContext: false,
        elemPositions: {},
        elemUuid: '',
        activeNode: {}
      }
    },
    search: {
      string: ""
    },
    layoutPositions: {
      oneThird: 0
    }
  },
  getters: {
    resultsElem: state => state.router.results.elemUuid,
    activeNodeResults: state => state.router.results.activeNode,
    contextElem: state => state.router.context.elemUuid,
    viewChanged: state => state.router.view
  },
  mutations: {
    openContext(state, bool) { state.router.context.showContext = bool; },
    setActiveNodeResults(state, node) { state.router.results.activeNode = node; }, // KAN MAYBE WEG?
    setActiveNodeContext(state, node) { state.router.context.activeNode = node; }, // MAYBE WEG?
    setElemUuidResults(state, elemUuid) { state.router.results.elemUuid = elemUuid; },
    setElemUuidContext(state, elemUuid) { state.router.context.elemUuid = elemUuid; },
    setThird(state, int) { state.layoutPositions.oneThird = int },
    givePositionsContext(state, obj) { state.router.context.elemPositions = obj },
    performSearch(state, str) { 
      state.search.string = str;
      console.log('zoek naar ', str) 
    },
    setListNetwork(state) {
      state.router.view = "listnetwork"
    },
    fillSort(state, obj) {
      if (obj.field === "visType") {
        state.router.view = obj.value
      }
    }
  },
  actions: {
    openNetwork(context, payload) {
      context.commit('setElemUuidResults', payload.elemUuid);
      context.commit('setActiveNodeResults', payload.elem);
      context.commit('setListNetwork'); // Kan dit naar fillSort aangepast worden?
    },
    openContext(context, payload) {
      console.log(payload);
      context.commit('openContext', payload.unfold);
      context.commit('givePositionsContext', payload.elemPositions);
      context.commit('setElemUuidContext', payload.elemUuid);
      context.commit('setActiveNodeContext', payload.elem);
    },
    setThird(context, int) {
      context.commit('setThird', int);
    },
    performSearch(context, str) {
      context.commit('performSearch', str);
    },
    fillSort(context, obj) {
      context.commit('fillSort', obj);
    },
  },
  modules: {
  }
})
