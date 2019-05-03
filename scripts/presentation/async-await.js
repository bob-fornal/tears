export class AsyncAwait {
	_time = 2000;
	_resolve = true;
	_success = `Doing something here ... after ${this._time}ms.`;
	_fail = `Failed here ... after ${this._time}ms.`;

	constructor() {};
	
	asyncProcess = () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => { (this._resolve === true) ? resolve(this._success) : reject(this._fail); }, this._time);
		});
	};
	
	asyncAwait = async () => {
		try {
			console.log(await this.asyncProcess());
		} catch (error) {
			console.log(error);
		}
	};
	
	start = (resolveState = true) => {
		this._resolve = resolveState;
		console.log('The Start');
		this.asyncAwait();
		console.log('The End');
	};
	
	toString = () => {
		console.log('this._time =', this._time);
		console.log('this._success =', this._success);
		console.log('this._fail =', this._fail);
		console.log('asyncProcess =', this.asyncProcess);
		console.log('asyncAwait =', this.asyncAwait);
		console.log('start =', this.start);
	};
}