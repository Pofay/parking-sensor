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

class ParkingLot{
    constructor(client, parkingLotName) {
	this.state = new VacantState()
	this.client = client
	this.parkingLotName = parkingLotName
    }

    sendOccupied() {
	this.state.occupied(this)
    }

    sendVacant() {
	this.state.vacant(this)
    }

    sendVacantRequest(data) {
	console.log(data)
	const payload = { lotName: this.parkingLotName, status: 0 }
	this.client.publish('parkingLot/status-change', JSON.stringify(payload))
    }

    sendOccupiedRequest(data) {
	console.log(data)
	const payload = { lotName: this.parkingLotName, status: 1 }
	this.client.publish('parkingLot/status-change', JSON.stringify(payload))
    }
}
module.exports = ParkingLot
