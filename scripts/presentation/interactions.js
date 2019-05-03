export class UserInteraction {
	
	constructor() {};
	
	dragStart = (event) => {
		event.dataTransfer.setData('text/plain', event.target.id);
		console.log('drag start', event);
	};
	
	dragOver = (event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
		console.log({ x: event.pageX, y: event.pageY });
	};
	
	drop = (event) => {
		const id = event.dataTransfer.getData('text');
		console.log('drop', id);
		const element = document.getElementById('drag');
		event.target.appendChild(element);
	};
	
	toString = () => {
		console.log('dragStart =', this.dragStart);
		console.log('dragOver =', this.dragOver);
		console.log('drop =', this.drop);
	};
}