export class SimplePromise {
	_time = 0;
	
	constructor() {}
	
	timeout = () => {
		setTimeout(() => {
			console.log('setTimeout Fired');
		}, this._time);		
	};
	
	promise = () => {
		new Promise((resolve, reject) => {
			resolve('Resolved');
		})
		.then(res => console.log(res))
		.catch(err => console.log(err));		
	};
	
	start = () => {
		console.log('The Start');
		
		this.timeout();
		this.promise();
		
		console.log('The End');
	};

	toString = () => {
		console.log('this._time =', this._time);
		console.log('timeout =', this.timeout);
		console.log('promise =', this.promise);
		console.log('start =', this.start);
	};
}

export class ComplexPromise {
	_time = 0;
	
	constructor() {}
	
	timeout = () => {
		setTimeout(() => {
			console.log('setTimeout Fired');
		}, this._time);		
	};
	
	promise1 = () => {
		return new Promise((resolve, reject) => {
			resolve('Resolved 1');
		})
		.then(res => console.log(res))
		.catch(err => console.log(err));		
	};
	
	promise2 = () => {
		return new Promise((resolve, reject) => {
			resolve('Resolved 2');
		})
		.then(res => {
			console.log(res);
			this.promise3();
		})
		.catch(err => console.log(err));		
	};
	
	promise3= () => {
		new Promise((resolve, reject) => {
			resolve('Resolved 3');
		})
		.then(res => console.log(res))
		.catch(err => console.log(err));		
	};
	
	start = () => {
		console.log('The Start');
		
		this.timeout();
		this.promise1();
		this.promise2();
		
		console.log('The End');
	};

	toString = () => {
		console.log('this._time =', this._time);
		console.log('timeout =', this.timeout);
		console.log('promise1 =', this.promise1);
		console.log('promise2 =', this.promise2);
		console.log('promise3 =', this.promise3);
		console.log('start =', this.start);
	};
};
