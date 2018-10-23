# Parking Sensor:

This Code is used for my Parking App by using a RPI with an [HC-SR04 Sensor][ultrasonic-sensor] to send whether a parking lot is vacant or occupied depending on the set `MAXIMUM_DISTANCE` in a `.env` file.

There are two LEDs that signal whether (hypothetically) the lot is vacant or occupied.

* Led at Pin 21 (Vacant)
* Led at Pin 26 (Occupied)

![The Device in Action][gif]

Libraries used:

* [Pigpio][pigpio] 
* [Lcd][lcd]
* [Axios][axios] for sending http requests to server


[lcd]: https://github.com/fivdi/lcd
[ultrasonic-sensor]: https://to-be-added
[pigpio]: https://github.com/fivdi/pigpio
[axios]: https://to-be-added
[gif]: assets/in-action.gif


