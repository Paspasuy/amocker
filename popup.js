"use strict"

// Чтобы получить глобальный объект background.js:
// chrome.extension.getBackgroundPage()

// Чтобы получить элемент всплывашки:
// document.getElementById('toggle_button') - это кнопка

// Эта функция вызывается при открытии всплывашки
window.onload = function () {
	console.log("amonger");
	function updateLabel() {
		let page = chrome.extension.getBackgroundPage();
		//let beber = 228;
		//console.log(beber);
		// Здесь добавить провязку с background.js и выставлять правильную надпись
		document.getElementById("display").innerHTML = "Total: " + page.total;
		if (page.enabled) {
			//document.getElementById('toggle_button').value = "⏻"black;//Disable";
			document.getElementById("toggle_button").style.color = "#7777FF";
			//document.getElementById("sus").style.background='#77FF77';
		} else {
			document.getElementById("toggle_button").style.color = "black";
			//document.getElementById("sus").style.background='#FF7777';
		}
	}
	document.getElementById('toggle_button').onclick = function () {
		// Здесь добавить провязку с background.js и делать вкл-выкл 
		let page = chrome.extension.getBackgroundPage();
		page.enabled ^= 1;
		updateLabel();
	};
	updateLabel();

	// Find my ID first
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		const tabId = tabs[0].id;
		// Нашли tabId, на котором открыта всплывашка, можно добавить
		// код, который напишет заблокированные домены
	});
}
