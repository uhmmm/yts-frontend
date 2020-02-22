import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
/* eslint-disable */

  state: {
    router: {
      results: {
        showNetwork: false,
        elemUuid: '',
        activeNode: {}
      },
      context: {
        showContext: false,
        elemUuid: '',
        activeNode: {}
      }
    },
    layoutPositions: {
      oneThird: 0
    }
  },
  getters: {
    resultsElem: state => state.router.results.elemUuid,
    activeNodeResults: state => state.router.results.activeNode,
    contextElem: state => state.router.context.elemUuid,
  },
  mutations: {
    openNetwork(state, bool) { state.router.results.showNetwork = bool; },
    openContext(state, bool) { state.router.context.showContext = bool; },
    setActiveNodeResults(state, node) { state.router.results.activeNode = node; }, // KAN MAYBE WEG?
    setActiveNodeContext(state, node) { state.router.context.activeNode = node; }, // MAYBE WEG?
    setElemUuidResults(state, elemUuid) { state.router.results.elemUuid = elemUuid; },
    setElemUuidContext(state, elemUuid) { state.router.context.elemUuid = elemUuid; },
    setThird(state, int) { state.layoutPositions.oneThird = int },
  },
  actions: {
    openNetwork(context, payload) {
      console.log(payload)
      context.commit('openNetwork', payload.unfold);
      context.commit('setElemUuidResults', payload.elemUuid);
      context.commit('setActiveNodeResults', payload.elem);
    },
    openContext(context, payload) {
      console.log(payload);
      context.commit('openContext', payload.unfold);
      context.commit('setElemUuidContext', payload.elemUuid);
      context.commit('setActiveNodeContext', payload.elem);
    },
    setThird(context, int) {
      context.commit('setThird', int);
    }
  },
  modules: {
  }
})
