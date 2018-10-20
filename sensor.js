const Gpio = require('pigpio').Gpio
const HttpClient = require('./http-client')
const Lcd = require('lcd')
const axios = require('axios')
require('dotenv').config()

const lcd = new Lcd({ rs: process.env.RS, e: process.env.E, data: [process.env.DB4, process.env.DB5, process.env.DB6, process.env.DB7], cols: 16, rows:2})

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECONDS_PER_CM = 1e6/34321 

const trigger = new Gpio(23, {mode: Gpio.OUTPUT}) 
const echo = new Gpio(24, {mode: Gpio.INPUT, alert: true}) 

const OpenLed = new Gpio(21, { mode: Gpio.OUTPUT })
const ClosedLed = new Gpio(26, { mode: Gpio.OUTPUT })


trigger.digitalWrite(0)  // Make sure trigger is low

const client = new HttpClient(axios, process.env.LOT_ID)

lcd.on('ready',() => {
    lcd.print('Start Measuring')
})

const watchHCSR04 = () => {
    let startTick 

    echo.on('alert', (level, tick) => {
	if (level == 1) {
	    startTick = tick 
	} else {
	    const endTick = tick 
	    const diff = (endTick >> 0) - (startTick >> 0)  // Unsigned 32 bit arithmetic
	    const distance = diff / 2 / MICROSECONDS_PER_CM
	    lcd.clear()
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
	    lcd.setCursor(0,0)
	    lcd.print('Dist. to target', (err) => {
		lcd.setCursor(0,1)
		lcd.print(`${distance.toFixed(3)} cm`)
	    })
	}
    }) 
} 

watchHCSR04() 

// Trigger a distance measurement once per second
setInterval(() => {
    trigger.trigger(10, 1)  // Set trigger high for 10 microseconds
}, 1000) 
