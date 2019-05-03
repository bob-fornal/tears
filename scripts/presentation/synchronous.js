export class Synchronous {
	
	constructor() {};
	
	second = () => {
		console.log('2');
	};
	first = () => {
		console.log('1');
		this.second();
		console.log('The End');
	};

	toString = () => {
		console.log('second =', this.second);
		console.log('first =', this.first);	
	};
};

export class NonAsynchronous {
	_numbers = [1, 2, 3];
	
	constructor() {};
	
	forEachSync = (items, callback) => {
		for (const item of items) {
			callback(item);
		}
	};
	
	forEachAsync = (items, callback) => {
		for (const item of items) {
			setTimeout(() => {
				callback(item);
			}, 0, item);
		}
	};
	
	runSync = () => {
		console.log('The Start');
		this.forEachSync(this._numbers, (number) => {
			console.log(number * 2);
		});
		console.log('The End');
	};

	runAsync = () => {
		console.log('The Start');
		this.forEachAsync(this._numbers, (number) => {
			console.log(number * 2);
		});
		console.log('The End');
	};
	
	start = (async = false) => {
		if (!async) {
			this.runSync();
		} else {
			this.runAsync();
		}
	}
	
	debugStart = () => {
		debugger;
		this.runAsync();
	};
	
	toString = () => {
		console.log('this._numbers =', this._numbers);
		console.log('this.forEachSync =', this.forEachSync);
		console.log('this.forEachAsync =', this.forEachAsync);
		console.log('this.runSync =', this.runSync);
		console.log('this.runAsync =', this.runAsync);
		console.log('this.start =', this.start);
		console.log('this.debugStart =', this.debugStart);
	};
}
