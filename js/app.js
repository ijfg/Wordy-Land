const fragment = document.createDocumentFragment();
const entries = document.querySelectorAll('.entry');
const navList = document.querySelector('nav');
for (const entry of entries) {
  const newElement = document.createElement('li');
  newElement.textContent = entry.textContent;
  fragment.appendChild(newElement)
};
navList.appendChild(fragment);
