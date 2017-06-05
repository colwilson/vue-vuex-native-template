// import { Server } from 'uws'
var Server = require('uws').Server

const wss = new Server({ port: 3030 })
let datastore = {}
let outgoingQueue = []
const runEvery = 300
const checkQueueEvery = 100

const identicalObjects = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b)
}

let getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const run = () => {
  let k = 'foo' // normally this could be dynamic
  let message = {
    data: { color: getRandomColor() },
    mutation: 'store'
  }
  const storeAndSend = (txt, msg) => {
    console.log(txt)
    datastore[k] = msg
    outgoingQueue.push(JSON.stringify(msg))
    // console.log('message', msg)
  }
  if (k in datastore) {
    if (!identicalObjects(datastore[k].data, message.data)) {
      storeAndSend('update', message)
    }
  } else {
    storeAndSend('insert', message)
  }
}

wss.on('connection', ws => {
  console.log('connected to client')
  const send = () => {
    while (outgoingQueue.length) {
      console.log('sending')
      ws.send(outgoingQueue.pop())
    }
  }
  send()
  setInterval(send, checkQueueEvery)
})

run()
setInterval(run, runEvery)
