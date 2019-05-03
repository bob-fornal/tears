let initFired = false;

$(document).ready(() => {
	$('.content').load('/templates/presenter-cards.html', function() {

		const upButton = $("[data-action='up']");
		const downButton = $("[data-action='down']");
		const previousButton = $("[data-action='previous']");
		const nextButton = $("[data-action='next']");
	
		const pnChannel = new BroadcastChannel('le-slides-position');
		const fsChannel = new BroadcastChannel('le-slides-font-size');
		const anChannel = new BroadcastChannel('le-slides-actions');
		pnChannel.onmessage = (states) => {
			cardIndex = states.data.currentIndex;
			updateContent();
			
			if (states.data.previousDisabled) {
				previousButton.addClass('disabled');
			} else {
				previousButton.removeClass('disabled');
			}
	
			if (states.data.nextDisabled) {
				nextButton.addClass('disabled');
			} else {
				nextButton.removeClass('disabled');
			}
		};
		fsChannel.onmessage = (states) => {
			if(states.data.upDisabled) {
				upButton.addClass('disabled');
			} else {
				upButton.removeClass('disabled');
			}
	
			if(states.data.downDisabled) {
				downButton.addClass('disabled');
			} else {
				downButton.removeClass('disabled');
			}		
		};
		anChannel.onmessage = (states) => {
			console.log('action reply:', states.data);
		};
		const actions = {
			init: (force = false) => {
				if (!initFired || force) {
					fsChannel.postMessage('init');
					pnChannel.postMessage('init');
					anChannel.postMessage('init');
					initFired = true;
				}
			},
			
			up: () => {
				if (!upButton.hasClass('disabled')) {
					fsChannel.postMessage('trigger-up');				
				}
			},
			reset: () => {
				fsChannel.postMessage('trigger-reset');			
			},
			down: () => {
				if (!downButton.hasClass('disabled')) {
					fsChannel.postMessage('trigger-down');				
				}
			},
	
			previous: () => {
				if (!previousButton.hasClass('disabled')) {
					pnChannel.postMessage('trigger-previous');				
				}
			},
			next: () => {
				if (!nextButton.hasClass('disabled')) {
					pnChannel.postMessage('trigger-next');
				}
			},
			
			triggerAction: (action) => {
				anChannel.postMessage(action);
			}
		};
	
		let cardIndex = 0;
		let cardData = [];
	
		const content = $('.content');
		const total = $('.total');
		const control = $('.ctrl-btn');
		const launch = $('.launch');
		const clear = $('.clear');
		
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
				const anchor = $('<div/>')
					.addClass('anchor-point')
					.attr('anchor-id', cardData[i].id);
				const selector = $('<span/>')
					.addClass('card-selector')
					.html('<i class="fas fa-fw fa-map-pin"></i><i class="fas fa-fw fa-ellipsis-h"></i>');
				const title = $('<span/>')
					.addClass('title')
					.text(cardData[i].title);
				const notes = $(`#${cardData[i].id}`).html();
				const options = $('<div/>')
					.addClass('options');
				let card = $('<div/>')
					.addClass('card')
					.attr('card-id', cardData[i].id);
					
				let useOptions = false;
				if ('options' in cardData[i]) {
					useOptions = true;
					for (let j = 0, j_len = cardData[i].options.length; j < j_len; j++) {
						let classes = ['option-btn'];
						if (cardData[i].options[j].showFn) {
							classes.push('displays');
						}
						const command = $('<div/>')
							.addClass(classes.join(' '))
							.text(cardData[i].options[j].title)
							.attr('data-trigger', cardData[i].options[j].name);
						options.append(command);
					}
				}
	
				let html = [
					anchor[0].outerHTML,
					selector[0].outerHTML,
					title[0].outerHTML,
					notes
				];
				if (useOptions) {
					html.push(options[0].outerHTML);
				}
				
				card.html(html.join('\n'));			
				content.append(card);
				actions.init();
			}		
	
			const options = $('.content .option-btn');
			updateContent();
			total.text(cardData.length);
			
			control.on('click', (event) => {
				const element = $(event.currentTarget);
				const action = element.data('action');
				actions[action]();
			});
			$(document).on('keydown', (event) => {
				const arrows = {
					ArrowUp: 'up',
					ArrowDown: 'down',
					ArrowLeft: 'previous',
					ArrowRight: 'next',
				};
				const key = (event.key === ' ') ? 'ArrowRight' : event.key;
				if (key in arrows) {
					actions[arrows[key]]();
				}
			});
			launch.on('click', () => {
				window.open('display.html', '_blank');
				setTimeout(() => {
					actions.init(true);
				}, 2000);
			});
			clear.on('click', () => {
				actions.triggerAction('trigger-clear');
			});
			options.on('click', (event) => {
				const element = $(event.currentTarget);
				const trigger = element.data('trigger');
				actions.triggerAction(trigger);
			});
		}
			
		function pad(num, length = 2) {
			let str = "" + num;
			for (let i = str.length; i < length; i++) {
				str = "0" + str;
			}
			return str;
		}
			
		function updateContent() {
			const at = $('.at').text(pad(cardIndex + 1));
			const id = cardData[cardIndex].id;
			
			$('.card').removeClass('selected');
			const cardReference = $(`[card-id='${id}']`)
				.addClass('selected');
			const cardAnchor = $(`[anchor-id='${id}']`);
			cardAnchor[0].scrollIntoView();
		};	
	});	
});
