const fragment = document.createDocumentFragment();
const entries = document.querySelectorAll('.entry');
const navList = document.querySelector('nav');
for (const entry of entries) {
  const entryText = entry.textContent;
  const entryBox = entry.closest("section");
  entryBox.setAttribute("id", entryText);
  const newElement = document.createElement('li');
  newElement.innerHTML = `<a href="#${entryText}"">${entryText}</a>`;
  fragment.appendChild(newElement)
};
navList.appendChild(fragment);
