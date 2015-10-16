# Proxy

A [trivial] proxy server for testing loss of connection to a server.  I use it to test [Sherlock](https://github.com/caasjj/sherlock.git), my lock module, my consumer/producer code, etc.

### Installation

    npm install httsp://github.com/caasjj/proxy.git
    
### Usage

    import Proxy from 'proxy'
    
    // clients connect to `localhost:proxyPort` and are proxied to `host:port`
    let proxy = new Proxy(host, port, proxyPort)
    
    // if you want to disconnect a specific client later on
    proxy.on('connection', id => {
       // store and manage client id's somewhere
    })
    
    proxy.listen()
    
    // if you want to disconnect a specific client, and have `id` stored as above
    proxy.failId(id)
    
    // if you want to disconnect all clients
    proxy.fail()
    
### Example

See `src/example`

    npm run example