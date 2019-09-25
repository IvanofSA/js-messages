import style from "../css/style.scss";

if(process.env.NODE_ENV === 'development') {
	console.log('Working in development mode');
}

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const
	input = $('.js-input'),
	btn = $('.js-send'),
	list = $('.js-list'),
	remove = $('.js-remove'),
	show = $('.js-show');

let idItem = 0,
	counter = 1,
	timerId = null;


btn.addEventListener('click', function () {
	let btnDisabled = input.value.trim().length === 0,
		value = input.value.trim();
	if(btnDisabled) {
		return true;
	}
	renderMessages(value)
});

remove.addEventListener('click', function (e) {
	let btnDisabled = show.textContent.trim().length === 0,
		id = show.getAttribute('data-id');

	if(btnDisabled) {
		return true;
	}
	removeMessage(id);
});


function removeMessage(id) {
	let items = list.querySelectorAll('li');
	items[id - 1].setAttribute('data-remove', 'true');
}


function renderMessages(value) {
	let template = `<li class="messages__item" data-id="${idItem}">${value}</li>`;
	idItem = idItem + 1;
	list.insertAdjacentHTML('beforeend', template);
	input.value = '';
	clearTimeout(timerId);
	showMessages();
}

function showMessages() {
	let delay = 1000;
	timerId = setTimeout(function tick() {
		let items = list.querySelectorAll('li');

		if(items.length === 0) {
			clearTimeout(timerId);
			return true;
		}

		if(counter > items.length) {
			counter = 1;
		} else {
			let status = items[counter - 1].getAttribute('data-remove');

			if(status) {
				counter++;
			} else {
				show.textContent = items[counter - 1].textContent;
				show.setAttribute('data-id', counter);
				counter++;
			}
		}

		timerId = setTimeout(tick, delay);
	}, delay);
}