function prepareNavigation() {
  const entries = document.querySelectorAll('.entry');
  const navList = document.createElement('nav');
  const uList = document.createElement('ul');
  const mainSpot = document.querySelector('main');
  for (const entry of entries) {
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

const requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) {window.setTimeout(callback, 1000 / 60);
  };
})();

function move(amount) {
  document.documentElement.scrollTop = amount;
  document.body.parentNode.scrollTop = amount;
  document.body.scrollTop = amount;
};

// My scrollTo function is a study of a few sources:
// 1. https://stackoverflow.com/questions/58266742/creating-smooth-scroll-in-
// react-browser-friendly?noredirect=1&lq=1
// 2. https://medium.com/@roderickhsiao/implement-smooth-scrolling-79efb20b6535
// 3. https://easings.net

// t: currentTime, b: beginPosition, c: changeDistance, d: animationDuration
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t * t + b
  } else {
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };
};

Math.inOutQuintic = function(t, b, c, d) {
  var ts = (t/=d)*t,
  tc = ts*t;
  return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
};

function scrollTo(distance) {
  const beginPos = window.scrollY;
  let currentTime = 0;
  let increment = 20;
  let animateScroll = function () {
    currentTime += increment;
    let value = Math.inOutQuintic(currentTime, beginPos, distance, 550);
    move(value);
    if (currentTime < 550) {
      requestAnimFrame(animateScroll);
    };
  };
  animateScroll();
};

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
    } else {
      aAnchor.style.color='black';
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

addLoadEvent(prepareNavigation);
document.addEventListener('scroll', function(e){
  activateSection();
});
