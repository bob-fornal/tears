export class EventListeners {
	_btn = null;
	_time = 100;
	
	constructor() {};
	
	output = (content) => {
		console.log(content);
	};
	
	setupListeners = () => {
		this._btn.addEventListener('click', this.output.bind(null, 'Click Handler 1'));
		this._btn.addEventListener('click', this.output.bind(null,'Click Handler 2'));
	};

	triggerListeners = () => {
		setTimeout(() => {
			console.log('The Start');
			this._btn.click();
			console.log('The End');
		}, this._time);
	};
	
	start = () => {
		this._btn = document.getElementById('event-listener-link');
		this.setupListeners();
		this.triggerListeners();
	};

	toString = () => {
		console.log('this._btn = ', this._btn);
		console.log('output = ', this.output);
		console.log('setupListeners = ', this.setupListeners);
		console.log('triggerListeners = ', this.triggerListeners);
		console.log('start = ', this.start);
	};
}