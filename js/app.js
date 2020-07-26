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
      //idTarget.scrollIntoView({behavior: "smooth"}); // not working on ios //
      //const targetDistance = idTarget.getBoundingClientRect();
      //const topDistance = targetDistance.top;
      //window.scrollBy({top: topDistance, left: 0, behavior: 'smooth'});
      // test 2 //smoothVerticalScroll(idTarget, 250);
      // const bodyRect = document.body.getBoundingClientRect();
      // const elemRect = element.getBoundingClientRect();
      // const offset = elemRect.top - bodyRect.top;
      // scrollTo(offset, null, 500);
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
  // doesn't work // window.scrollBy(0, amount);
  document.documentElement.scrollTop = amount;
  document.body.parentNode.scrollTop = amount;
  document.body.scrollTop = amount;
};

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

// Scroll test 2 start//
//
// function smoothVerticalScroll(e, time) {
//     var eTop = e.getBoundingClientRect().top;
//     var eAmount = eTop / 100;
//     var currentTime = 0;
//     while (currentTime <= time) {
//         window.setTimeout(scrollToTop, currentTime, eAmount);
//         currentTime += time / 100;
//     };
// };
//
// function scrollToTop(eAmount) {
//   window.scrollBy(0, eAmount);
// };
//
// // Scroll test 2 end //
//
// // Scroll test 3 start //
//

// easing functions http://goo.gl/5HLl8
// t: currentTime, b: start, c: change, d: duration
// Math.easeInOutQuad = function(t, b, c, d) {
//   t /= d / 2;
//   if (t < 1) {
//     return c / 2 * t * t + b
//   } else {
//     t--;
//     return -c / 2 * (t * (t - 2) - 1) + b;
//   }
// };
//
// // requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
// var requestAnimFrame = (function() {
//   return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
//   window.mozRequestAnimationFrame || function(callback) {
//     window.setTimeout(callback, 1000 / 60);
//   };
// })();
//
// function scrollTo(to, callback, duration) {
//   // because it's difficult to detect the scrolling element,
//   // just move them all
  // function move(amount) {
  //   // doesn't work // window.scrollBy(0, amount);
  //   document.documentElement.scrollTop = amount;
  //   document.body.parentNode.scrollTop = amount;
  //   document.body.scrollTop = amount;
  // }
//
//   function position() {
//     // returns the number of pixels that the document is currently scrolled
//     // vertically
//     return document.documentElement.scrollTop ||
//     document.body.parentNode.scrollTop ||
//     document.body.scrollTop;
//   }
//   var start = position(),
//     change = to - start,
//     currentTime = 0,
//     increment = 20;
//   duration = (typeof(duration) === 'undefined') ? 500 : duration;
//   var animateScroll = function() {
//     // increment the time
//     currentTime += increment;
//     // find the value with the quadratic in-out easing function
//     var val = Math.easeInOutQuad(currentTime, start, change, duration);
//     // move the document.body
//     move(val);
//     // do the animation unless its over
//     if (currentTime < duration) {
//       requestAnimFrame(animateScroll);
//     } else {
//       if (callback && typeof(callback) === 'function') {
//         // the animation is done so lets callback
//         callback();
//       }
//     }
//   };
//   animateScroll();
// }

/* list.addEventListener('click', e => {
  const {
    target
  } = e;
  const to = target.getAttribute('data-target');
  const element = document.getElementById(to);
  const bodyRect = document.body.getBoundingClientRect();
  const elemRect = element.getBoundingClientRect();
  const offset = elemRect.top - bodyRect.top;
  scrollTo(offset, null, 300);
});*/

// Scroll test 3 end //

// Scroll test 4 start //



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
}

// function activateSection() {
//   let sections = document.querySelectorAll('.entry');
//   sections = Array.from(sections);
//   for (const section of sections) {
//     let sectionCheck = section.getBoundingClientRect();
//     if (sectionCheck.top >= 0 && sectionCheck.top < window.innerHeight) {
//       section.classList.toggle('on');
//     } else {
//       section.classList.toggle('on');
//     };
//   };
// };

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
//let el = document.getElementsByTagName('main');
// window.addEventListener('scroll', activateSection(this)); // not working //
document.addEventListener('scroll', function(e){
  activateSection();
});
