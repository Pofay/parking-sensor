# Parking Sensor:

This is the hardware component for my Capstone 2 project.

![System Architecture][system-architecture]

Using a [Raspberry Pi 3][rpi3] with an attached [Ultrasonic Sensor (HC-SR04)][ultrasonic-sensor] it sends a PUT request to the [Parking Api][api] if the current distance of target vehicle is close or less than the set distance in an `.env` file.

It also shows the current distance of the target through an [LCD][display].

# Schematic

![Schematic](assets/schematic.png)

# Materials Used

* [Raspberry Pi 3][rpi3]
* [T-Cobbler][cobbler]
* 1x 10K ohms potentiometer (R1) (I've used a Rotary Potentiometer)
* 3x 220 ohms resistor (R2, R5, R6)
* 1x Breadboard (I've used 2 since I needed more space)
* 1x 1k ohms resistor (R3)
* 1x 2k ohms resistor (R4)
* 2x LED (Blue & Red)
* [LCD Display][display]
* [HC-SR04 Ultrasonic Sensor][ultrasonic-sensor]

# Environment Settings used

    LOT_ID= // corresponding parking lot id of this sensor
    HOST= // host url of api
    PORT= // port of api

    // LCD Ports for displaying current distance of target
    RS=
    E=
    DB4=
    DB5=
    DB6=
    DB7=

There are two LEDs that signal whether (hypothetically) the lot is vacant or occupied.

* Led at Pin 21 (Vacant)
* Led at Pin 26 (Occupied)

![The Device in Action][gif]

Libraries used:

* [Pigpio][pigpio] 
* [Lcd][lcd]
* [Axios][axios] 

[lcd]: https://github.com/fivdi/lcd
[ultrasonic-sensor]: https://www.adafruit.com/product/3942
[pigpio]: https://github.com/fivdi/pigpio
[axios]: https://to-be-added
[gif]: assets/in-action.gif
[rpi3]: https://www.raspberrypi.org/products/raspberry-pi-3-model-b/
[api]: https://github.com/Pofay/parking-app-api
[cobbler]: https://www.adafruit.com/product/2028
[display]: https://www.amazon.com/lcd-display-16x2/s?page=1&rh=i%3Aaps%2Ck%3Alcd%20display%2016x2
[system-architecture]: https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Application%20Architecture#R7Vpbc5s4FP41nj7Vg8Bc%2FBjHbtOZpOuts9P2aUcGGWuDESuEL%2FvrVwJhbsJ24hBnxnmx4UgcxPedq6Bn3K62XymMlg%2FEQ0FP17xtzxj3dN3RTP4rBLtMMDAGmcCn2MtEoBDM8H9ICjUpTbCH4spERkjAcFQVuiQMkcsqMkgp2VSnLUhQvWsEfdQQzFwYNKU%2FsceWUgo0rRi4Q9hfyls7phxYwXyyFMRL6JFNSWRMesYtJYRlR6vtLQoEdjku2XVfWkb3C6MoZKdcYLiWBx1HszzLsx3b%2BmzomYo1DBL5tHKlbJc%2Fvk9JEslpiDK0VYEO5%2Fl0rbkosH9UbiKIrBCjOz4lV5TDJc0D2PJ8U4Dt5LawLOFs5hOhJNjf6y4w4AcShhMhAfZxSDgioYeEBq1njDZLzNAsgq4Y3XAX4LIlW%2FE7jgE%2FbIWuDFELM03QJEjcqxog6SqQ9GEnIL2J3ZwMilRtOFVLGjYxGhgKjEA3GIGLYARaMLoMCM67cCbQEoEuZBgKTKyA33K0IPwRyuBY%2FyYkH%2Fgcp5nxhk8AVrQtBvmRL%2F4fIMVwPMqV8XVl%2BrLRBu48GUXi0N0FmBNAj4M%2Fz5i6n%2B8F0H3yU%2F7%2BSBjXgjphaVuLZNK7DbPh3UAVAYHeBYl2A0%2Fk8apBnhLKlsQnIQwmhXRUtfQSsGiL2a%2FS8W8xpW%2Fys38QYztZEsGEES4qdN8TElUQF0t4Lt78GUhCXdQWcrM5DFIftSpS80ZRABleV1f0qiQYHXnSZBtRFMd8fIYoN%2BNTXeqCoSx3ErPiI2YzA4KBwkc6iXPD89mxVez8QDFbJIFkB3N4pdo5LZg5jTAOPauyEjNKntAtCQgPiOOQiJg2WuAgqIlggP1QRE9OVRo7BZGYNw03cmCFPS%2F1epUZVA2lE0sAtapaYQmmql7swhIM0ED%2B1aOl%2FpxwyVGlu1%2FFden57zNiad5IHYyleWtxMJg6ZwZTeemU4NTHpDUM7HryNKoqsjXJq2pU75fxMvbzmNR1rixILTP6TMvojvxTMum55L%2B8Ju0qld6EHiX8trp2E0XvKI8eaSX1qrsMFNFTV0RPq5N%2BYdARN1NIn3Dop4k0jMl7KnOO0DPQ%2B9VCx7gsQ%2BYHQ8cYGqgqkLdjyPpg6ChDij3FN2RItVX0TIYcFUN3kHobjtOeok%2BisZuKrk4r2Lsn7BqahiPbyobWNAE9f3%2FTeZsAuuoYR%2BIlUEr4y1vFyztsrSYBht1XbIGpHHZodsCWrioZ63V%2B6N2IN3DC5gMYx9hNvQVS1hSfVeObnZbu0i5fUrqXqFG127nszPYO1PZGG%2F6ZPV%2BjvWso2le69Zdxb9EnNuvcGXGfEOtjwsXjJAq4N11DNM5VWPUUDaxLxme9vYjy8DqPnF8nj2mg%2FRJlyfXvgLC4FGVLU6%2BUzIvswemq99oN8qZ%2FSfJ4kGaJKJR69kiqFfn1e7KaZ4nUHh%2FMpdfKcn2fTeWvHVEONNdB3tyCyBqiIXIPvGj8YPz1qrKiDMs51y9Jut5K%2BnmN7p77uuA8td8Jk%2BM%2FSRKIfcIlXKPWolybIxSmf4ylVslEaZDEort7%2BPNRmDIOY4ag0EQW%2FOfu8XHaF60e4XWm%2BJJC136gNY4xCdPJwsSFderaN66RF2FCfsDMG89%2Fje1ibvvW8T0eA7xOecJPiw%2FlsnKz%2BNrQmPwP
