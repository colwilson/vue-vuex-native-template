import Observer from './Observer'
import Emitter from './Emitter'

export default {
  install(Vue, connectionUri, store, opts = {}) {
    if (!connectionUri) {
      throw new Error('[vue-native-socket] provide a URI')
    }

    Vue.mixin({
      methods: {
        initializeSockets() {
          console.log('trying to connect to socket server')
          this.$socket = new WebSocket(connectionUri)
          let observer = new Observer(this.$socket, store, opts)

          let sockets = this.$options['sockets']

          this.$options.sockets = new Proxy(
            {},
            {
              set(target, key, value) {
                Emitter.addListener(key, value, this)
                target[key] = value
                return true
              },
              deleteProperty(target, key) {
                Emitter.removeListener(key, this.$options.sockets[key], this)
                delete target.key
                return true
              }
            }
          )

          if (sockets) {
            Object.keys(sockets).forEach(key => {
              this.$options.sockets[key] = sockets[key]
            })
          }
        }
      },
      created() {
        if (typeof this.$parent === 'undefined') {
          this.initializeSockets()
          setInterval(() => {
            if (!this.$store.state.socket.isConnected) {
              this.initializeSockets()
            }
          }, 1000)
        }
      },
      beforeDestroy() {
        let sockets = this.$options['sockets']

        if (sockets) {
          Object.keys(sockets).forEach(key => {
            delete this.$options.sockets[key]
          })
        }
      }
    })
  }
}
