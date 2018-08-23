const Gpio = require('pigpio').Gpio
const HttpClient = require('./http-client')
const axios = require('axios')
require('dotenv').config()

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECONDS_PER_CM = 1e6/34321 

const trigger = new Gpio(23, {mode: Gpio.OUTPUT}) 
const echo = new Gpio(24, {mode: Gpio.INPUT, alert: true}) 

trigger.digitalWrite(0)  // Make sure trigger is low

const client = new HttpClient(axios)

const watchHCSR04 = () => {
  let startTick 

  echo.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick 
    } else {
      const endTick = tick 
      const diff = (endTick >> 0) - (startTick >> 0)  // Unsigned 32 bit arithmetic
      const distance = diff / 2 / MICROSECONDS_PER_CM
      if(distance <= 5.08) 
	client.sendClosed()
      else 
	client.sendOpen()
    }
  }) 
} 

watchHCSR04() 

// Trigger a distance measurement once per second
setInterval(() => {
  trigger.trigger(10, 1)  // Set trigger high for 10 microseconds
}, 1000) 
