const buildUrl = (host, port) => 'http://'+ host + ':' + port

class OpenedState {
    constructor() {
    }

    vacant(context) {
    }

    occupied(context) {
	context.sendOccupiedRequest('Lot is Occupied')
	context.state = new ClosedState()
    }
}

class ClosedState {
    constructor() {
    }

    vacant(context) {
	context.sendVacantRequest('Lot is Vacant')
	context.state = new OpenedState()
    }

    occupied(context) {
    }
}
class HttpClient {
    constructor(axios, parkingLotId) {
	this.state = new OpenedState()
	this.axios = axios;
	this.parkingLotId = parkingLotId
    }

    sendOccupied() {
	this.state.occupied(this)
    }

    sendVacant() {
	this.state.vacant(this)
    }

    sendVacantRequest(data) {
	console.log(data)
	this.axios.put(buildUrl(process.env.HOST, process.env.PORT) + '/parking_lot/status', { id: this.parkingLotId, status: 0 })
	.then((res) => {
	    console.log(res.status)
	}).catch((err) => {
	    console.error(err)
	})
    }

    sendOccupiedRequest(data) {
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
