import Proxy from '../proxy'

var proxy = new Proxy('localhost', 6379, 6479)

proxy.on('connection', id => {
 console.log(`Client connected with ${id}`)
 setTimeout( () => { proxy.failId(id) }, 2000)
})

proxy.listen()
