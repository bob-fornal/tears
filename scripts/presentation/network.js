export class SimpleNetwork {
	_time = 10000;
	
	constructor() {};
	
	networkRequest = () => {
		setTimeout(() => {
			console.log(`Async Code after ${this._time}ms.`);
		}, this._time);
	};
	start = () => {
		console.log('The Start');
		this.networkRequest();
		console.log('The End');
	};
	
	toString = () => {
		console.log('_time =', this._time);
		console.log('networkRequest =', this.networkRequest);
		console.log('start =', this.start);
	};
};

export class ComplexNetwork {
	_time = 0;
	
	constructor() {};
	
	first = () => {
		setTimeout(() => {
			console.log('2');
			this.second();
			console.log('4');
		}, this._time);
	};

	second = () => {
		setTimeout(() => {
			console.log('3');
		}, this._time);
	};

	start = () => {
		console.log('1');
		this.first();
		console.log('5');
	};
	
	toString = () => {
		console.log('_time =', this._time);
		console.log('first =', this.first);
		console.log('second =', this.second);
		console.log('start =', this.start);
	};
}
