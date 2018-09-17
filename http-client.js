const buildUrl = (host, port) => 'http://'+ host + ':' + port

class OpenedState {
    constructor() {
    }

    open(context) {
    }

    close(context) {
	context.sendClosedRequest('I am Closed')
	context.state = new ClosedState()
    }
}

class ClosedState {
    constructor() {
    }

    open(context) {
	context.sendOpenRequest('I am Opened')
	context.state = new OpenedState()
    }

    close(context) {
    }
}
class HttpClient {
    constructor(axios) {
	this.state = new OpenedState()
	this.axios = axios;
    }

    sendClosed() {
	this.state.close(this)
    }

    sendOpen() {
	this.state.open(this)
    }

    sendOpenRequest(data) {
	this.axios.post(buildUrl(process.env.HOST, process.env.PORT) + '/parking', { taken: 0 })
	.then((res) => {
	    console.log(res.status)
	}).catch((err) => {
	    console.error(err)
	})
    }

    sendClosedRequest(data) {
	this.axios.post(buildUrl(process.env.HOST, process.env.PORT) + '/parking', { taken: 1 })
	    .then((res) => {
		console.log(res.status)
	    }).catch((err) => {
		console.error(err)
	    })
    }
}

module.exports = HttpClient
