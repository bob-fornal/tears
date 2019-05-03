import { ContentStateMachine } from '/scripts/presentation/_content-state-machine.js';

$(document).ready(() => {
	
	$('.notes').load('/templates/cards.html', function() {
		let slideStateMachine;
		
		const nextButton = $('.next');
		const previousButton = $('.previous');

		const channel = new BroadcastChannel('le-slides-position');
		const actions = {
			init: () => {
				nextButton.hide();
				previousButton.hide();
			},
			
			'trigger-previous': () => {
				slideStateMachine.next('previous');
			},
			'trigger-next': () => {
				slideStateMachine.next('next');
			},
			
			'report-states': (index) => {
				channel.postMessage({
					currentIndex: index,
					previousDisabled: previousButton.hasClass('disabled'),
					nextDisabled: nextButton.hasClass('disabled')
				});
			}
		};
		channel.onmessage = (triggerAction) => {
			actions[triggerAction.data]();
		};

		let cardData = [];
		let cardTitles = [];
		
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
				initTitles();			
			}
		});
		
		function initTitles() {
			for (let i = 0, len = cardData.length; i < len; i++) {
				cardTitles.push(cardData[i].id);
			}
			
			init();
		}

		function init() {
			const changeCurrentCard = (cards, currentIndex) => {
				const title = cards[currentIndex];
				const currentCard = $(`.note[card="${title}"]`);
				const previousTitle = (currentIndex - 1 < 0) ? '' : cardTitles[currentIndex - 1];
				const nextTitle = (currentIndex + 1 > maxCards - 1) ? '' : cardTitles[currentIndex + 1];
				const keep = [title];

				currentCard.addClass('slide');
				currentCard.attr('style', 'left:0;');

				if (previousTitle.length > 0) {
					keep.push(previousTitle);

					previousButton.removeClass('disabled');
					$(`[card="${previousTitle}"]`)
						.attr('style', 'left:-100%;')
						.removeClass('slide');
				} else {
					previousButton.addClass('disabled');
				}

				if (nextTitle.length > 0) {
					keep.push(nextTitle);
					
					nextButton.removeClass('disabled');
					$(`[card="${nextTitle}"]`)
						.attr('style', 'left:100%;')
						.removeClass('slide');
				} else {
					nextButton.addClass('disabled');
				}

				$('.n').text(currentIndex + 1);
				
				actions['report-states'](currentIndex);

				for (let i = 0, len = cards.length; i < len; i++) {
					const element = $(`[card="${cards[i]}"`);
					if (!keep.includes(cards[i])) {
						element.attr('style', 'display:none;');
					}
				}
			};
			
			const statePatterns = {
				'previous': (content, index) => {
					return (index - 1 > 0) ? index - 1 : 0;
				},
				'next': (content, index) => {
					const max = content.length - 1;
					return (index + 1 <= max) ? index + 1 : index;
				},
				'reset': (content, index) => {
					return 0;
				}
			};
			
			const returnState = (content, currentIndex) => {
				return content;
			};
			
			const settings = {
				'content': cardTitles,
				'defaultIndex': 0,
				'statePatterns': statePatterns,
				'returnState': returnState,
				'changeAlgorithm': changeCurrentCard
			};
			
			const maxCards = cardTitles.length;
			$('.max').text(maxCards);

			slideStateMachine = new ContentStateMachine(settings);
			
			slideStateMachine.next('reset');
			
			nextButton.on('click', (event) => {
				actions['trigger-next']();
			});

			previousButton.on('click', (event) => {
				actions['trigger-previous']();
			});
		}
	});

});
