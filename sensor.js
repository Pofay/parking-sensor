const Gpio = require('pigpio').Gpio
const HttpClient = require('./http-client')
const axios = require('axios')
require('dotenv').config()

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECONDS_PER_CM = 1e6/34321 

const trigger = new Gpio(23, {mode: Gpio.OUTPUT}) 
const echo = new Gpio(24, {mode: Gpio.INPUT, alert: true}) 

const OpenLed = new Gpio(21, { mode: Gpio.OUTPUT })
const ClosedLed = new Gpio(26, { mode: Gpio.OUTPUT })


trigger.digitalWrite(0)  // Make sure trigger is low

const client = new HttpClient(axios, process.env.LOT_ID)

const watchHCSR04 = () => {
    console.log('Starting...')
    let startTick 

    echo.on('alert', (level, tick) => {
	if (level == 1) {
	    startTick = tick 
	} else {
	    const endTick = tick 
	    const diff = (endTick >> 0) - (startTick >> 0)  // Unsigned 32 bit arithmetic
	    const distance = diff / 2 / MICROSECONDS_PER_CM
	    if(distance <= process.env.MAXIMUM_DISTANCE) {
		client.sendClosed()
		ClosedLed.digitalWrite(1)
		OpenLed.digitalWrite(0)
	    }
	    else if(distance > process.env.MAXIMUM_DISTANCE) {
		client.sendOpen()
		ClosedLed.digitalWrite(0)
		OpenLed.digitalWrite(1)
	    }
	}
    }) 
} 

watchHCSR04() 

// Trigger a distance measurement once per second
setInterval(() => {
    trigger.trigger(10, 1)  // Set trigger high for 10 microseconds
}, 1000) 
