/**
 * Created by caasjj on 10/15/15.
 */
'use strict'
import net from 'net'
import EventEmitter from 'events'

class Proxy extends EventEmitter {

	constructor(host = 'localhost', port = 6379, proxyPort = 6479) {
		super()
		this.host = host
		this.port = port
		this.proxyPort = proxyPort
		this.clientIds = {}
		this.idCount = 0
	}

	listen(host, port, proxyPort) {
		this.host = host || this.host
		this.port = port || this.port
		this.proxyPort = proxyPort || this.proxyPort


		this.proxyServer = net.createServer( client => {

			var proxy = net.createConnection( {
				host: this.host,
				port: this.port
			} )

			proxy.pipe( client )
			client.pipe( proxy )
			proxy.on( 'end', () => client.end() )
			client.on( 'end', () => proxy.end() )

			proxy.on( 'error', () => client.end() )
			client.on( 'error', () => proxy.end() )
			proxy.on( 'close', () => client.end() )
			client.on( 'close', () => proxy.end() )

			this.clientIds[this.idCount] = client
			client.id = this.idCount
			this.idCount += 1

		} )

		this.proxyServer.on( 'connection', client => {
			console.log( `emit connection event` )
			this.emit( 'connection', client.id )
		} )

		this.proxyServer.on( 'error', err => {
			this.emit( 'error', err )
		} )

		this.proxyServer.listen( this.proxyPort )

	}

	failId(id) {
		if (this.clientIds[id]) {
			this.clientIds[id].destroy()
			delete this.clientIds[id]
		}
	}

	fail() {
		for (let id in this.clientIds) {
			this.failId( id )
		}
	}
}

export { Proxy as default }