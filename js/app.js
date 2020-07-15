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
    uList.appendChild(newElement)
  };
  navList.appendChild(uList);
  document.body.insertBefore(navList, mainSpot);
  navList.addEventListener('click', respondClick);
};

function respondClick(evt) {
  evt.preventDefault();
  evt.target.scrollIntoView({behavior: "smooth"});
}

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
