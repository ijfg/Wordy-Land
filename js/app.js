function prepareNavigation() {
  const entries = document.querySelectorAll('.entry');
  const navList = document.createElement('nav');
  const uList = document.createElement('ul');
  const mainSpot = document.querySelector('main');
  for (const entry of entries) { // Create navigation tag for each entry
    const entryText = entry.textContent;
    const entryBox = entry.closest("section");
    entryBox.setAttribute("id", entryText);
    const newElement = document.createElement('li');
    newElement.innerHTML = `<a href="#${entryText}"">.</a>`;
    newElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      const element = document.getElementById(entryText);
      const elemRectTop = element.getBoundingClientRect().top;
      scrollTo(elemRectTop);
      const page = '';
      history.pushState(page, '', `#${entryText}`);
    });
    uList.appendChild(newElement);
  };
  navList.appendChild(uList);
  document.body.insertBefore(navList, mainSpot);
};

// My scrollTo function is a study of a few sources:
// 1. https://stackoverflow.com/questions/58266742/creating-smooth-scroll-in-
// react-browser-friendly?noredirect=1&lq=1
// 2. https://medium.com/@roderickhsiao/implement-smooth-scrolling-79efb20b6535
// 3. https://stackoverflow.com/questions/8316882/what-is-an-easing-function
// 4. https://easings.net
// 5. http://gizma.com/easing/
// 6. https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

const requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) {window.setTimeout(callback, 1000 / 60);
  };
})();

function position() {
    return document.documentElement.scrollTop ||
    document.body.parentNode.scrollTop ||
    document.body.scrollTop;
  };

function move(amount) {
  document.documentElement.scrollTop = amount;
  document.body.parentNode.scrollTop = amount;
  document.body.scrollTop = amount;
};

// t: currentTime, b: beginPosition, c: changeDistance, d: animationDuration
// See Quintic easing animation example: https://easings.net/#easeInOutQuint
Math.inOutQuintic = function(t, b, c, d) {
  var ts = (t/=d)*t,
  tc = ts*t;
  return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
};

function scrollTo(distance) {
  const beginPos = position();
  let currentTime = 0;
  let increment = 20;
  let animateScroll = function () {
    currentTime += increment;
    let value = Math.inOutQuintic(currentTime, beginPos, distance, 600);
    move(value);
    if (currentTime < 600) {
      requestAnimFrame(animateScroll);
    };
  };
  animateScroll();
};

// My isInViewport, activateSection, and throttle functions are researches of:
// 1. https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with
// -vanilla-javascript/
// 2. https://evilmartians.com/chronicles/scroll-to-the-future-modern-javascript
// -css-scrolling-implementations
// 3. https://medium.com/walkme-engineering/debounce-and-throttle-in-real-life-
// scenarios-1cc7e2e38c68
// 4. https://www.youtube.com/watch?v=zBRqnSiq_VM
// 5. https://forum.kirupa.com/t/timestamp-in-callback-requestanimationframe-
// function/642777

function isInViewport(elem) {
  let elemCheck = elem.getBoundingClientRect();
  return (elemCheck.top >= 0 && elemCheck.top < window.innerHeight);
};

function activateSection() {
  let headings = document.querySelectorAll('.entry');
  headings = Array.from(headings);
  for (const heading of headings) {
    let aAnchor = document.querySelector(`a[href="#${heading.textContent}"]`);
    if (isInViewport(heading)) {
      aAnchor.style.color='#d63031';
      heading.nextElementSibling.style.color="black";
    } else {
      aAnchor.style.color='black';
      heading.nextElementSibling.style.color="white";
    };
  };
};

function addLoadEvent(func){
  const oldonload = window.onload;
  if (typeof window.onload != "function") {
    window.onload = func;
  } else {
    window.onload = function(){
      oldonload();
      func();
    };
  };
};

function throttle(action) {
  let isRunning = false;
  return function() {
    if (isRunning) return;
    isRunning = true;
    requestAnimFrame(action);
      isRunning = false;
    };
  };

addLoadEvent(prepareNavigation);
addLoadEvent(activateSection);
document.addEventListener('scroll', throttle(activateSection));
