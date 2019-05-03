import { ContentStateMachine } from '/scripts/presentation/_content-state-machine.js';

$(document).ready(() => {
	
	const main = $('.main');
	const upButton = $('.up');
	const downButton = $('.down');
	const resetButton = $('.reset');
	
	const channel = new BroadcastChannel('le-slides-font-size');
	const actions = {
		init: () => {
			upButton.hide();
			downButton.hide();
			resetButton.hide();
		},

		'trigger-up': () => {
			fontStateMachine.next('up');
		},
		'trigger-reset': () => {
			fontStateMachine.next('reset');			
		},
		'trigger-down': () => {
			fontStateMachine.next('down');
		},
		
		'report-states': () => {
			channel.postMessage({
				upDisabled: upButton.hasClass('disabled'),
				downDisabled: downButton.hasClass('disabled')
			});
		}
	};
	channel.onmessage = (triggerAction) => {
		actions[triggerAction.data]();
	};

	const sizes = ['fsm05', 'fsm04', 'fsm03', 'fsm02', 'fsm01', 'fs00', 'fsp01', 'fsp02', 'fsp03', 'fsp04', 'fsp05'];
	const defaultIndex = Math.floor(sizes.length / 2);
	const changeFont = (classes, currentIndex) => {
		for (var i = 0, len = classes.length; i < len; i++) {
			if (i === currentIndex) {
				main.addClass(classes[i]);
			} else {
				main.removeClass(classes[i]);
			}
		}
		
		if (currentIndex === 0) {
			downButton.addClass('disabled');
		} else {
			downButton.removeClass('disabled');
		}

		if (currentIndex === classes.length - 1) {
			upButton.addClass('disabled');
		} else {
			upButton.removeClass('disabled');
		}
		
		actions['report-states']();
	};
	const statePatterns = {
		'up': (content, index) => {
			const max = content.length - 1;
			return (index + 1 <= max) ? index + 1 : index;
		},
		'down': (content, index) => {
			return (index - 1 > 0) ? index - 1 : 0;
		},
		'reset': (content, index) => {
			return defaultIndex;
		}
	};
	const returnState = (content, currentIndex) => {
		return content;
	};
	
	const settings = {
		'content': sizes,
		'defaultIndex': defaultIndex,
		'statePatterns': statePatterns,
		'returnState': returnState,
		'changeAlgorithm': changeFont
	};

	const fontStateMachine = new ContentStateMachine(settings);

	fontStateMachine.next('reset');
	
	upButton.on('click', () => {
		actions['trigger-up']();
	});

	resetButton.on('click', () => {
		actions['trigger-reset']();
	});

	downButton.on('click', () => {
		actions['trigger-down']();
	});

});