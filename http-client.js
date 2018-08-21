class OpenedState {
    constructor() {
    }

    open(context) {
    }

    close(context) {
	context.sendClosedRequest('I am Closed')
	context.state = new ClosedState()
    }
}

class ClosedState {
    constructor() {
    }

    open(context) {
	context.sendOpenRequest('I am Opened')
	context.state = new OpenedState()
    }

    close(context) {
    }
}
class HttpClient {
    constructor() {
	this.state = new OpenedState()
    }

    sendClosed() {
	this.state.close(this)
    }

    sendOpen() {
	this.state.open(this)
    }

    sendOpenRequest(data) {
	console.log(data)
    }
    sendClosedRequest(data) {
	console.log(data)
    }
}

module.exports = HttpClient
