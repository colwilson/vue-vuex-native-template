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
  let msg = {
    data: { color: getRandomColor() },
    mutation: 'store'
  }
  if (k in datastore) {
    if (!identicalObjects(datastore[k].data, msg.data)) {
      datastore[k] = msg
      outgoingQueue.push(JSON.stringify(msg))
    }
  } else {
    datastore[k] = msg
    outgoingQueue.push(JSON.stringify(msg))
  }
}

wss.on('connection', ws => {
  console.log('connected to client')
  const send = () => {
    while (outgoingQueue.length) {
      ws.send(outgoingQueue.pop())
    }
  }
  send()
  setInterval(send, checkQueueEvery)
})

run()
setInterval(run, runEvery)
