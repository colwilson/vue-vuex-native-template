<template lang="pug">
  #connected-widget
    link(rel="stylesheet", href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css")
    #connectedString {{connectedString}}
    i(:class="iconClass", aria-hidden="true")
</template>

<script>
export default {
  computed: {
    iconClass() {
      return this.$store.state.socket.isConnected
        ? 'fa fa-thumbs-o-up'
        : 'fa fa-thumbs-o-down'
    },
    connectedString() {
      return this.$store.state.socket.isConnected
        ? 'Connected to WebSocket server'
        : 'Not Connected to WebSocket server'
    }
  }
}
</script>
