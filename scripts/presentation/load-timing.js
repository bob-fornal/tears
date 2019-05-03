class LoadTiming {
	_time = 10000;
	
	constructor() {};
	
	loadSync = () => {
		const element = document.getElementById('first-timing');
		if (element) {
			element.innerHTML = 'Changed Content Correctly (via code)';
		}
	};
	
	loadAsync = () => {
		setTimeout(() => {
			const element = document.getElementById('second-timing');
			if (element) {
				element.innerHTML = 'Changed Content Correctly (via code)';
			}
		}, this._time);
	};
	
	start = () => {
		this.loadSync();
		this.loadAsync();
	};
	
	toString = () => {
		console.log('this.time =', this._time);
		console.log('this.loadSync =', this.loadSync);
		console.log('this.loadAsync =', this.loadAsync);
		console.log('These functions are run immediately when the code loads');
	};
}

const code11 = new LoadTiming();
code11.start();