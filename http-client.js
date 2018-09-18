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
    constructor(axios, parkingLotId) {
	this.state = new OpenedState()
	this.axios = axios;
	this.parkingLotId = parkingLotId
    }

    sendClosed() {
	this.state.close(this)
    }

    sendOpen() {
	this.state.open(this)
    }

    sendOpenRequest(data) {
	console.log(data)
	this.axios.put(buildUrl(process.env.HOST, process.env.PORT) + '/parking_lot/status', { id: this.parkingLotId, status: 0 })
	.then((res) => {
	    console.log(res.status)
	}).catch((err) => {
	    console.error(err)
	})
    }

    sendClosedRequest(data) {
	console.log(data)
	this.axios.put(buildUrl(process.env.HOST, process.env.PORT) + '/parking_lot/status', { id: this.parkingLotId, status: 1})
	    .then((res) => {
		console.log(res.status)
	    }).catch((err) => {
		console.error(err)
	    })
    }
}

module.exports = HttpClient
