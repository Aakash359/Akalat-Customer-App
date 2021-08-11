import socket from 'socket.io-client'
import config from './config'

const io = socket(config.socketUrl)

console.log('====================================');
console.log("Socket: ", config.socketUrl, io);
console.log('====================================');

io.on('connect', async () => {
    console.log('====================================');
    console.log('Socket Connected: ', io);
    console.log('====================================');
    io.emit('join', "aakash")
    io.emit('new_visitor', {data: 'tarun'})
})

export default io