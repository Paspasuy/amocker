"use strict"

// Глобальные переменные доступны и в popup.js
// С их помощью можно коммуницировать с всплывашкой

// 1) Сделайте, чтобы кнопка на всплывашке могла включать-выключать адблокер
// var enabled = true;

// 2) Сделайте, чтобы на всплывашке отображался список заблокированных запросов
//    Внимательно: всплывашка одна и та же на разных табах браузера, поэтому
//    она сама должна понимать на каком табе какие заблокированный запросы показывать.
//    Удобно для этого сохранить Map: отображение из id таба в список блокированных доменов
//    Список для данного нужно очищать при навигации.
//    https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Map
//    https://developer.chrome.com/docs/extensions/reference/tabs/
// var blockedDomains = new Map();

// Список доменов, которые будем блокировать.
// Реальный список - это множество сложных регулярных выражений.

var total = 0;
var enabled = true;

const badDomains = [
	"doubleclick.net",
	"mc.yandex.ru",
	"google-analytics.com",
	"googletagmanager.com",
	"an.yandex.ru",
	"reklama.ngs.ru",
	"ads.adfox.ru",
	"www.tns-counter.com",
	"s-onetag.com",
"c.amazon-adsystem.com",
"tag.bounceexchange.com",
"static.chartbeat.com",
"dpm.demdex.net",
"securepubads.g.doubleclick.net",
"secure-us.imrworldwide.com",
"cdn.ml314.com",
"a125375509.cdn.optimizely.com",
"logx.optimizely.com",
"amplify.outbrain.com",
"widgets.outbrain.com",
"a.postrelease.com",
"secure.quantserve.com",
"live.rezync.com",
"sb.scorecardresearch.com",
"w.usabilla.com",
"adservice.google.com",
];

// Нужно вернуть {cancel: true} если блокируем, {cancel: false} если нет
let leetRequestFilter = function(details) {
	// Здесь нужно проверить, включен ли адблокер кнопкой на всплывашке
	if (!enabled) {
		return {cancel: false};
	}
	const url = new URL(details.url);
	//console.log("Trying to load: ", url);
	console.log("host is: ", url.host);
	//console.log("query is: ", url.search);

	// Проверить, есть ли в списке блокировки поддомены host
	// Циклы в JS: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
	// Работа со строками: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#instance_methods
	let block = false;
	for (var st in badDomains) {
		if (url.host.endsWith(badDomains[st])) {
			block = true;
		}
	}
	if (block) {
		total += 1;
		console.log("SHOULD BE BLOCKED: ", url.host);
		// Здесь можно добавить url заблокированного запроса в множество заблокированных для данного таба
		// номер таба это details.tabId		
	}
	

	// Задание со звёздочкой: не блокировать запрос, а отдавать пустое содержимое.	
	console.log("TOTAL BLOCKED: ", total);
	return {cancel: block};
}

// При помощи WebRequest API устанавливаем свой обработчик,
// который будет вызываться перед каждым запросом и потенциально блокировать
// запрос 
chrome.webRequest.onBeforeRequest.addListener(
	leetRequestFilter,
	{urls: ["http://*/*", "https://*/*"]},
	["blocking"]
);
