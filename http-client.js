const buildUrl = (host, port) => 'http://'+ host + ':' + port

class VacantState {
    constructor() {
    }

    vacant(context) {
    }

    occupied(context) {
	context.sendOccupiedRequest('Lot is Occupied')
	context.state = new OccupiedState()
    }
}

class OccupiedState {
    constructor() {
    }

    vacant(context) {
	context.sendVacantRequest('Lot is Vacant')
	context.state = new VacantState()
    }

    occupied(context) {
    }
}
class HttpClient {
    constructor(axios, parkingLotId, signage) {
	this.state = new VacantState()
	this.axios = axios;
	this.parkingLotId = parkingLotId
	this.signage = signage
    }

    sendOccupied() {
	this.state.occupied(this)
    }

    sendVacant() {
	this.state.vacant(this)
    }

    sendVacantRequest(data) {
	console.log(data)
	this.signage.showVacant()
	this.axios.put(buildUrl(process.env.HOST, process.env.PORT) + '/parking_lot/status', { id: this.parkingLotId, status: 0 })
	.then((res) => {
	    console.log(res.status)
	}).catch((err) => {
	    console.error(err)
	})
    }

    sendOccupiedRequest(data) {
	console.log(data)
	this.signage.showOccupied()
	this.axios.put(buildUrl(process.env.HOST, process.env.PORT) + '/parking_lot/status', { id: this.parkingLotId, status: 1})
	    .then((res) => {
		console.log(res.status)
	    }).catch((err) => {
		console.error(err)
	    })
    }
}

module.exports = HttpClient
