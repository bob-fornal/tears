onconnect = function(e) {
	var port = e.ports[0];

	port.onmessage((event) => {
		port.postMessage(event.data);
	});

	// Required when using addEventListener. Otherwise called implicitly by onmessage setter.
	port.start();
}