export class ThoughtExercise {
	_time = 10000;
	_wrapper = null
	
	constructor() {};

	changeColor = () => {
		this._wrapper = document.getElementById('thought-wrapper');
		this._wrapper.style.backgroundColor = 'red';		
	};
	changeLayout = () => {
		let p = document.createElement('p');
		p.setAttribute('id', 'thought-run');
		p.innerText = 'Thought Exercise ...';
		this._wrapper.appendChild(p);
	};
	wait = () => {
		const start = Date.now();
		while(Date.now() < start + this._time) {};
	};
	event = () => {
		this.changeColor();
		this.changeLayout();
		this.wait();
	};
	
	start = () => {
		const button = document.getElementById('thought-button');
		button.classList.remove('hide');
		button.addEventListener('click', this.event);
	};
	end = () => {
		const button = document.getElementById('thought-button');

		button.classList.add('hide');
		button.removeEventListener('click', this.event);
		
		this._wrapper.style.backgroundColor = '';
		
		const p = document.getElementById('thought-run');
		if (p) {
			p.parentNode.removeChild(p);			
		}
	};
	
	toString = () => {
		console.log('_time =', this._time);
		console.log('changeColor =', this.changeColor);
		console.log('changeLayout =', this.changeLayout);
		console.log('wait =', this.wait);
		console.log('event =', this.event);
		console.log('start =', this.start);
	};
};
