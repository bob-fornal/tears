export class ContentStateMachine {
	_content;
	_default;
	_statePatterns;
	_returnState;
	_changeAlgorithm;
	
	_machine;

	constructor(settings) {
		this._content = settings.content;
		this._default = settings.defaultIndex;
		this._statePatterns = settings.statePatterns;
		this._returnState = settings.returnState;
		this._changeAlgorithm = settings.changeAlgorithm;
		
		const machineSettings = {
			'content': this._content,
			'defaultIndex': this._default,
			'statePatterns': this._statePatterns,
			'returnState': this._returnState
		};
		this._machine = this.stateMachine(machineSettings);
		return this._machine;		
	};
	
	stateMachine = function *stateMachine(settings) {
		const content = settings.content;
		const defaultIndex = settings.defaultIndex;
		const statePatterns = settings.statePatterns;
		const returnState = settings.returnState;
		
		let currentIndex = defaultIndex;
		while (currentIndex >= 0 && currentIndex < content.length) {
			if (this._changeAlgorithm) {
				const states = returnState(content, currentIndex);
				this._changeAlgorithm(states, currentIndex);
			}
			const changeType = yield returnState(content, currentIndex);
			currentIndex = statePatterns[changeType](content, currentIndex);
		}
	};
}