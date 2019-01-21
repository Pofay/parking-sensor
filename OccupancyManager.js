class UnoccupiedState {
    tap(context, uid) {
	context.occupy(uid)
    }
}

class OccupiedState {
    constructor(uid) {
	this.uid = uid
    }

    tap(context, uid) {
	if(this.uid === uid)
	  context.unoccupy(uid)
    }
}
class OccupancyManager {

    constructor(mqtt, lotName) {
	this.lotName = lotName
	this.client = mqtt
	this.state = new UnoccupiedState()
    }

    listenForChanges() {
	this.client.on('connect', () => {
	    this.client.subscribe('parkingLot/initialState')
	    this.client.subscribe('parkingLot/occupied')
	    this.client.subscribe('parkingLot/unoccupied')
	})

	this.client.on('message', (topic, message) => {
	    const payload = JSON.parse(message)
	    switch (topic)  {
		case 'parkingLot/initialState':
		    this.constructInit(payload)
		    break
		case 'parkingLot/occupied':
		    this.constructOccupied(payload)
		    break
		case 'parkingLot/unoccupied':
		    this.constructUnoccupied(payload)
		    break
	    }
	})

	const initialPayload =  { lotName: this.lotName }
	this.client.publish('parkingLot/getInitialState', JSON.stringify(initialPayload))
    }

    constructInit({ lotName, status, occupant }) {
	if(lotName === this.lotName) {
	    if(status === 'OCCUPIED') {
		this.setState(new OccupiedState(occupant.school_id_number))
		console.log('Set to Occupied')
	    }
	    else {
		this.setState(new UnoccupiedState())
		console.log('Set to Unoccupied')
	    }
	}
    }

    constructOccupied({ lotName, occupant }) {
	console.log('Now Occupied')
	if(lotName === this.lotName) {
	    this.setState(new OccupiedState(occupant.school_id_number))
	}
    }

    constructUnoccupied({ lotName }) {
	console.log('Now Unoccupied')
	if(lotName === this.lotName) {
	    this.setState(new UnoccupiedState())
	}
    }

    setState(newState) {
	this.state = newState
    }

    tap(uid) {
	this.state.tap(this,uid)
    }

    occupy(uid) {
	const payload = { lotName: this.lotName, idNumber: uid }
	this.client.publish('parkingLot/occupy', JSON.stringify(payload))
    }

    unoccupy(uid) {
	const payload =  { lotName: this.lotName, idNumber: uid }
	this.client.publish('parkingLot/unoccupy', JSON.stringify(payload))
    }
}

module.exports = OccupancyManager
