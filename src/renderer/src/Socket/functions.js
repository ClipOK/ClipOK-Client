import Socket from './socket.js'
import { v4 as uuidv4 } from 'uuid'

const sender = uuidv4()

export const JoinRoom = (room) => {
  Socket.emit('join-room', { room })
}

export const LeaveRoom = (room) => {
  Socket.emit('leave-room', { room: 'singhaditya1226' })
}

export const sendClips = (message, room) => {
  Socket.emit('send-clipboard', { room, message, sender })
}

export const sendImages = (message, room) => {
  Socket.emit('send-image', { room, message })
}

export const CheckMessages = (event) => {
  Socket.on(event, (data) => {
    console.log(data)
  })
}

export function initConnection() {
  Socket.connect()

  Socket.on('connect', () => {
    console.log('Connected to server')
    JoinRoom('singhaditya1226')
  })

  Socket.on('user-joined', (data) => {
    console.log(data)
  })

  Socket.on('receive-clipboard', (data) => {
    const { message, sender } = data
    console.log('Received clipboard:', message, 'from', sender)
  })

  Socket.on('disconnect', () => {
    console.log('Disconnected from the server')
  })

  Socket.on('error', (error) => {
    console.log('Error:', error)
  })

  Socket.on('connect_error', (error) => {
    console.log('Connection error:', error)
  })
}
