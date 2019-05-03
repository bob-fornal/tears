'use strict';

import { Demo } from '/scripts/presentation/demo.js';

import { ThoughtExercise } from '/scripts/presentation/thought-exercise.js';
import { Synchronous, NonAsynchronous } from '/scripts/presentation/synchronous.js';
import { SimpleNetwork, ComplexNetwork } from '/scripts/presentation/network.js';
import { SimplePromise, ComplexPromise } from '/scripts/presentation/promise.js';
import { GeneratorThrottle } from '/scripts/presentation/throttle.js';
import { UserInteraction } from '/scripts/presentation/interactions.js';
import { EventListeners } from '/scripts/presentation/event-listeners.js';
import { WebWorkers } from '/scripts/presentation/web-workers.js';
import { SetTimeoutTimer } from '/scripts/presentation/set-timeout-timer.js';
import { AsyncAwait } from '/scripts/presentation/async-await.js';

window.thought = new ThoughtExercise();
window.code1 = new Synchronous();
window.code2 = new NonAsynchronous();
window.code3 = new SimpleNetwork();
window.code4 = new ComplexNetwork();
window.code5 = new SimplePromise();
window.code6 = new ComplexPromise();
window.code7 = new GeneratorThrottle();
window.thr = null;
window.code8 = new UserInteraction();
window.code9 = new EventListeners();
window.code10 = new WebWorkers();
// code 11 in loaded file
window.code12 = new SetTimeoutTimer();
window.code13 = new AsyncAwait();

window.triggerView = function(fn, param = null) {
	console.clear();
	if (param === null) {
		console.log(fn());		
	} else {
		console.log(fn(param));
	}
}
window.triggerImage = function(image = null, open = true) {
	const imageWrapper = $('.image-wrapper');
	const imageContainer = imageWrapper.find('.image-container');
	if (!!image) {
		console.log()
		imageContainer.attr('src', `images/${image}`);
	}
	if (open === true) {
		imageWrapper.show();		
	} else {
		imageWrapper.hide();
	}
}

let cardData = [];
let cardActions = {
	init: () => {},
	
	'trigger-clear': {
		fn: console.clear,
		showDisplay: false,
		display: 'clear()'
	}
};

const channel = new BroadcastChannel('le-slides-actions');
channel.onmessage = (states) => {
	const cardAction = cardActions[states.data];
	if (states.data === 'init') {
		cardAction();
	} else {
		if (cardAction.showDisplay) {
			console.log(cardAction.display);		
		}
		cardAction.fn();		
	}
};

$(document).ready(() => {
		
	$.getJSON('/data/card-data.json')
	.done((data) => {
		cardData = data;
	})
	.fail((data) => {
		console.log('fail', data);
		if (data.status!==200) {
			const error = $('<div/>').text('Error loading JSON file');
			content.append(error);
		}
	})
	.always(() => {
		if (cardData.length > 0) {
			init();			
		}
	});
	
	function init() {
		for (let i = 0, i_len = cardData.length; i < i_len; i++) {
			const card = cardData[i];
			if ('options' in card) {
				for (let j = 0, j_len = card.options.length; j < j_len; j++) {
					const name = card.options[j].name;
					const optionFn = new Function(card.options[j].fn);
					cardActions[name] = {
						fn: optionFn,
						showDisplay: card.options[j].showFn,
						display: card.options[j].fn
					};
				}
			}
		}
	}

	$('.thought-btn').on('click', () => triggerView(thought.toString));

	$('.synchronous-btn').on('click', () => triggerView(code1.toString));
	$('.non-asynchronous-btn').on('click', () => triggerView(code2.toString));
	$('.simple-network-btn').on('click', () => triggerView(code3.toString));
	$('.complex-network-btn').on('click', () => triggerView(code4.toString));
	$('.simple-promise-btn').on('click', () => triggerView(code5.toString));
	$('.complex-promise-btn').on('click', () => triggerView(code6.toString));
	$('.generator-throttling-btn').on('click', () => triggerView(code6.toString));
	$('.user-interaction-btn').on('click', () => triggerView(code8.toString));
	$('.event-listeners-btn').on('click', () => triggerView(code9.toString));
	$('.web-workers-sync-btn').on('click', () => triggerView(code10.toString));
	$('.web-workers-async-btn').on('click', () => triggerView(code10.toString, true));
	$('.load-timing-btn').on('click', () => triggerView(code11.toString));
	$('.set-timeout-timer-btn').on('click', () => triggerView(code12.toString));
	$('.async-await-btn').on('click', () => triggerView(code13.toString));
	
	$('.image-close').on('click', () => triggerImage(null, false));
});

window.demo = new Demo();
demo.lead();
