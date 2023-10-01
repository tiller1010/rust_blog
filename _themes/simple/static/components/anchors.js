export const addAnchorsToHeadings = () => {
  document.querySelectorAll('h2, h3, h4, h5, h6').forEach((heading) => {
    const anchor = document.createElement('a');
    if (!heading.id) {
      heading.id = heading.innerText.toLowerCase().replace(/ /g, '-');
    }
    anchor.href = '#' + heading.id;
    anchor.classList.add('heading-anchor');
    anchor.appendChild(heading.cloneNode(true));
    heading.parentNode.replaceChild(anchor, heading);
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState({}, '', anchor.href);
      const header = document.querySelector('header');
      window.scrollTo(anchor.offsetLeft, anchor.offsetTop - header.offsetHeight - 10);
    });
  });
}

