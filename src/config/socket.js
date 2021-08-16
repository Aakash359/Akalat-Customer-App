import socket from 'socket.io-client'
import config from './config'

const io = socket(config.socketUrl)
io.on('connect', async () => {
  
    io.emit('join', "aakash")
    io.emit('new_visitor', {data: 'tarun'})
})

export default io