class ParkingSignage {

    constructor(vacantLed, occupiedLed) {
	this.vacantLed = vacantLed
	this.occupiedLed = occupiedLed
    }

    showVacant() {
	this.vacantLed.digitalWrite(1)
	this.occupiedLed.digitalWrite(0)
    }

    showOccupied() {
	this.vacantLed.digitalWrite(0)
	this.occupiedLed.digitalWrite(1)
    }
}

module.exports = ParkingSignage
