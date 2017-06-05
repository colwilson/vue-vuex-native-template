import Vue from 'vue'
import App from './components/App.vue'
import VueNativeSock from './vue-native-websocket/Main'
import store from './store'

Vue.use(VueNativeSock, 'ws://localhost:3030', store, { format: 'json' })
Vue.prototype.$store = store

const app = new Vue({
  el: '#app',
  render: h => h(App)
})
