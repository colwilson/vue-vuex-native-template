import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      connectionError: false
    },
    color: '#000000'
  },
  action: {},
  mutations: {
    store(state, message) {
      state.color = message.data.color
    },
    onopen(state, event) {
      console.log('connected to socket server')
      state.socket.isConnected = true
    },
    onclose(state, event) {
      console.log('connection to socket server closed')
      state.socket.isConnected = false
    },
    onerror(state, event) {
      console.error(state, event)
    }
    // // default handler called for all methods
    // onmessage(state, message) {
    //   state.message = message
    // }
  }
})
