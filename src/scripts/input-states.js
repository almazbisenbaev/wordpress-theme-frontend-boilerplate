// This script assign classnames to input fields based on how user interacts with them

document.addEventListener("DOMContentLoaded", () => {

	const virginizeInput = (el) => {
		el.classList.add('input-state-is-pristine');
		el.classList.add('input-state-is-blurred');
		el.classList.add('input-state-is-empty');
	};

	const focusInput = (el) => {
		el.classList.remove('input-state-is-pristine');
		el.classList.add('input-state-is-dirty');

		el.classList.remove('input-state-is-blurred');
		el.classList.add('input-state-is-focused');
	};

	const blurInput = (el) => {
		el.classList.remove('input-state-is-focused');
		el.classList.add('input-state-is-blurred');
	};

	const unemptyInput = (el) => {
		el.classList.remove('input-state-is-pristine');
		el.classList.add('input-state-is-dirty');

		el.classList.remove('input-state-is-empty');
		el.classList.add('input-state-is-not-empty');
	};

	const emptyInput = (el) => {
		el.classList.add('input-state-is-empty');
		el.classList.remove('input-state-is-not-empty');
	};



	const all_fields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"], input[type="date"], input[type="number"], textarea');

	all_fields.forEach((input) => {

		virginizeInput(input);

		input.addEventListener('focus', () => {
			focusInput(input);
		});

		input.addEventListener('blur', () => {
			blurInput(input);
		});
	
		input.addEventListener('input', function(){
			if(input.value.length){
				unemptyInput(input);
			} else {
				emptyInput(input);
			}
		});
		
	});


	const all_cf7_fields = document.querySelectorAll('.field-cf7, .textarea-cf7');

	all_cf7_fields.forEach(field => {

		let input = field.querySelector('input');
		if( !input ){ input = field.querySelector('textarea'); }

		if(input){

			virginizeInput(field);

			input.addEventListener('focus', () => {
				focusInput(field);
			});
	
			input.addEventListener('blur', () => {
				blurInput(field);
			});
		
			input.addEventListener('input', function(){
				if(input.value.length){
					unemptyInput(field);
				} else {
					emptyInput(field);
				}
			});

		}

	});



	
});
