export const addAnchorsToHeadings = () => {
  const header = document.querySelector('header');
  document.querySelectorAll('h2, h3, h4, h5, h6').forEach((heading) => {
    const anchor = document.createElement('a');
    if (!heading.id) {
      heading.id = heading.innerText.toLowerCase().replace(/ /g, '-');
    }

    const anchorHash = '#' + heading.id;

    if (window.location.hash === anchorHash) {
      scrollTo(heading.offsetLeft, heading.offsetTop - header.offsetHeight - 10);
    }

    anchor.id = anchorHash;
    anchor.classList.add('heading-anchor');
    anchor.appendChild(heading.cloneNode(true));
    heading.parentNode.replaceChild(anchor, heading);
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState({}, '', anchor.href);
      window.scrollTo(anchor.offsetLeft, anchor.offsetTop - header.offsetHeight - 10);
    });
  });
}

