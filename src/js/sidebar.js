// Open-Close Files
// var aboutButton = document.querySelector("#files li:nth-child(2)");
var eventsButton = document.querySelector("#files li:nth-child(5)");

// aboutButton.addEventListener('click', openCloseFiles('about'));
eventsButton.addEventListener('click', openCloseFiles('events'));
var teamButton = document.querySelector("#files li:nth-child()");

// aboutButton.addEventListener('click', openCloseFiles('about'));
teamButton.addEventListener('click', openCloseFiles('team'));

function openCloseFiles(target) {
	return function() {
		var triDiv = document.querySelector("#" + target + "Triangle");
		var level2 = document.querySelectorAll(".level2." + target);
		if (triDiv.classList.contains('closed')) {
			triDiv.classList.remove('closed');
			triDiv.classList.add('open');
			for (var i = 0; i < level2.length; i++) {
				level2[i].classList.remove("nodisplay");
			}
		}
		else {
			triDiv.classList.remove('open');
			triDiv.classList.add('closed');
			for (var i = 0; i < level2.length; i++) {
				level2[i].classList.add("nodisplay");
			}
		}
	};
};

// Open-Close Tabs
var buttons = document.querySelectorAll(".subject");
var buttonsTexts = document.querySelectorAll(".subject p");
for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', openCloseTabs(i));
}
function openCloseTabs(i) {
	return function () {
		var target = buttonsTexts[i].innerHTML;
		var triDiv = document.querySelector("#" + target + "Triangle");
		var container = document.querySelector("#" + target);
		if (triDiv.classList.contains('closed')) {
			triDiv.classList.remove('closed');
			triDiv.classList.add('open');
			container.classList.remove("nodisplay");
		}
		else {
			triDiv.classList.remove('open');
			triDiv.classList.add('closed');
			container.classList.add("nodisplay");
		}
	}
}

var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("day").innerHTML = days;
  document.getElementById("hour").innerHTML = hours;
  document.getElementById("min").innerHTML = minutes;
  document.getElementById("sec").innerHTML = seconds;
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("day").innerHTML = "00";
    document.getElementById("hour").innerHTML = "00";
    document.getElementById("min").innerHTML = "00";
    document.getElementById("sec").innerHTML = "00";
  }
}, 1000);	


// Open-Close Sidebar
var html = document.documentElement;
var sidebar = document.querySelector('section.sidebar');
var mainEl = document.querySelector('section.main');
var uiContainer = document.querySelector('#ui-view');
var hamburger = document.querySelector('#hamburger');
var cross = document.querySelector('#cross');
var isMobile = getComputedStyle(html).maxWidth === '800px' ? true : false;

if (isMobile) {
	sidebar.classList.remove('open');
	sidebar.classList.add('closed');
	mainEl.style.marginLeft = '50px';
	hamburger.classList.remove('nodisplay');
	cross.classList.add('nodisplay');
}

function sidebarOpen() {
	if (sidebar.classList.contains('closed')) {
		sidebar.classList.remove('closed');
		sidebar.classList.add('open');
		mainEl.style.marginLeft = '250px';
		hamburger.classList.add('nodisplay');
		cross.classList.remove('nodisplay');
		if (isMobile) {
			mainEl.style.marginLeft = '0px';
			mainEl.style.left = '250px';
		}
	}
}

function sidebarClose() {
	if (sidebar.classList.contains('open')) {
		sidebar.classList.remove('open');
		sidebar.classList.add('closed');
		mainEl.style.marginLeft = '50px';
		hamburger.classList.remove('nodisplay');
		cross.classList.add('nodisplay');
		if (isMobile) {
			mainEl.style.marginLeft = '50px';
			mainEl.style.left = '0px';
		}
	}
}

hamburger.addEventListener('click', sidebarOpen);
cross.addEventListener('click', sidebarClose);


// Set the date we're counting down to

