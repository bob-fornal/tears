export class Demo {
	
	constructor() {};
	
	lead = () => {
		console.log({
			'0 > null': 0 > null,
			'0 >= null': 0 >= null,
			'0 == null': 0 == null,
			'0 != null': 0 != null,
			'0 === null': 0 === null,
			'0 !== null': 0 !== null,
			'0 <= null': 0 <= null,
			'0 < null': 0 < null
		});
	};
};