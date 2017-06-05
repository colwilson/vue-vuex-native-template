<template>
  <div class="app">
    <img src="assets/images/logo.png">
    <h1>Vue2 + Vuex + Native Websockets Template</h1>
    <ConnectedWidget :style="{ color: colorFromSocketServer }"/>
  </div>
</template>

<script>
import ConnectedWidget from './ConnectedWidget.vue'

export default {
  components: { ConnectedWidget },
  data() {
    return {}
  },
  computed: {
    colorFromSocketServer() {
      return this.$store.state.color
    }
  },
  websockets: {
    onmessage(msg) {
      console.log(msg)
    }
  }
}
</script>

<style>
body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 0;
}

.app {
    /*color: #444;*/
    margin-top: 100px;
    max-width: 600px;
    font-family: Helvetica, sans-serif;
    text-align: center;
    align-items: center;
}

h1 {
  padding: 0 .25em;
}
</style>
