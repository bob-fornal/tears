export class WebWorkers {
	_worker = new Worker('scripts/presentation/crunch-numbers.js');
	_inlineProgress = null;
	_workerProgress = null;
	
	contructor() {};

	crunchNumbersInline = (callback) => {
		for (let step = 0, len = 10; step <= len; step++) {
			callback(step * 10);
			const start = Date.now();
			while (Date.now() < start + 1000) {};
		}
	};
	
	displayPercentInline = (percent) => {
		console.log(`inline percent: ${percent}`);
		this._inlineProgress.value = percent;
	};
	
	displayPercent = (message) => {
		console.log(`web-worker percent: ${message.data}`);
		this._workerProgress.value = message.data;
	}
	
	runSync = () => {
		this._inlineProgress = document.getElementById('inline-worker');
		this.crunchNumbersInline(this.displayPercentInline);
	};
	
	runAsync = () => {
		this._workerProgress = document.getElementById('web-worker');
		this._worker.postMessage('start');
		this._worker.onmessage = this.displayPercent;
	};
	
	start = (async = false) => {
		if (!async) {
			this.runSync();
		} else {
			this.runAsync();
		}
	};
	
	toString = (async = false) => {
		if (!async) {
			console.log('this._inlineProgress =', this._inlineProgress);
			console.log('this.crunchNumbersInline =', this.crunchNumbersInline);
			console.log('this.displayPercentInline =', this.displayPercentInline);
			console.log('this.runSync =', this.runSync);
			console.log('this.start =', this.start);
		} else {
			console.log('this._worker =', this._worker);
			console.log('this._workerProgress =', this._workerProgress);
			console.log('this.crunchNumbers = (see crunch-numbers.js)');
			console.log('this.displayPercent =', this.displayPercent);
			console.log('this.runAsync =', this.runAsync);
			console.log('this.start =', this.start);			
		}
	};
}

