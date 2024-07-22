import io from 'socket.io-client'
const socket = io('http://localhost:3000')

const Instance = {
  connect() {
    socket.connect()
  },

  disconnect() {
    socket.disconnect()
  },

  on(event, callback) {
    try {
      socket.on(event, callback)
    } catch (error) {
      throw new Error(error)
    }
  },

  emit(event, data) {
    try {
      socket.emit(event, data)
    } catch (error) {
      throw new Error(error)
    }
  },

  BroadcastChannel(event, data) {
    try {
      socket.broadcast.emit(event, data)
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default Instance
