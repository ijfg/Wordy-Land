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
      const idTarget = document.getElementById(entryText);
      idTarget.scrollIntoView({behavior: "smooth"}); // not working on ios //
      //history.pushState(null, null, entryText); // not working //
    });
    uList.appendChild(newElement);
  };
  navList.appendChild(uList);
  document.body.insertBefore(navList, mainSpot);
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
