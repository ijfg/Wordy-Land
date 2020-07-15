function prepareNavigation() {
  const fragment = document.createDocumentFragment();
  const entries = document.querySelectorAll('.entry');
  const navList = document.querySelector('nav');
  for (const entry of entries) {
    const entryText = entry.textContent;
    const entryBox = entry.closest("section");
    entryBox.setAttribute("id", entryText);
    const newElement = document.createElement('li');
    newElement.innerHTML = `<a href="#${entryText}"">.</a>`;
    fragment.appendChild(newElement)
  };
  navList.appendChild(fragment);
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
