import Emitter from './Emitter'

export default class {
  constructor(socket, store, opts = {}) {
    this.socket = socket
    this.format = opts.format && opts.format.toLowerCase()
    if (this.format === 'json') {
      if (!('sendObj' in socket)) {
        this.socket.sendObj = obj => this.socket.send(JSON.stringify(obj))
      }
    }
    if (store) {
      this.store = store
    }
    this.onEvent()
  }

  onEvent() {
    ;['onmessage', 'onclose', 'onerror', 'onopen'].forEach(eventType => {
      this.socket[eventType] = event => {
        Emitter.emit(eventType, event)
        if (this.store) {
          this.passToStore(eventType, event)
        }
      }
    })
  }

  passToStore(eventType, event) {
    if (this.format === 'json' && event.data) {
      let msg = JSON.parse(event.data)
      let target = msg.namespace || null
      let concat = (a, b) => {
        return a ? `${a}/${b}` : b
      }
      if (msg.mutation) {
        this.store.commit(concat(target, msg.mutation), msg)
      }
      if (msg.action) {
        this.store.dispatch(concat(target, msg.action), msg)
      }
    } else {
      // default mutation
      this.store.commit(eventType.toLowerCase(), event)
    }
  }
}
