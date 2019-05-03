export class SetTimeoutTimer {
	_repetitions = 0;
	_totalRepetitions = 1000;
	_delay = 0;
	
	_totalActualDelay = 0;

	constructor() {};
	
	getActualDelay = () => {
		return this._totalActualDelay / this._totalRepetitions;
	};
	
	iterate = () => {
		let start = new Date();
		setTimeout(() => {
			this._totalActualDelay += new Date() - start;
			this.testDelay();
		}, this._delay);
	};
	
	testDelay = () => {
		if (this._repetitions++ > this._totalRepetitions) {
			console.log(`Requested Delay: ${this._delay}, Acual Average Delay: ${this.getActualDelay()}`);
			return;
		}
		this.iterate();
	};
	
	start = (delay = 0) => {
		this._delay = delay;
		this._repetitions = 0;
		this._totalActualDelay = 0;
		this.testDelay();
	};

	toString = () => {
		console.log('this._repetitions =', this._repetitions);
		console.log('this._totalRepetitions =', this._totalRepetitions);
		console.log('this._delay =', this._delay);
		console.log('this._totalActualDelay =', this._totalActualDelay);
		console.log('this.getActualDelay =', this.getActualDelay);
		console.log('this.iterate =', this.iterate);
		console.log('this.testDelay =', this.testDelay);
		console.log('this.start(time) =', this.start);
	};
}