export const addAnchorsToHeadings = () => {
  const header = document.querySelector('header');
  document.querySelectorAll('h2, h3, h4, h5, h6').forEach((heading) => {
    const anchor = document.createElement('a');
    if (!heading.id) {
      heading.id = heading.innerText.toLowerCase().replace(/ /g, '-');
    }

    const anchorHash = '#' + heading.id;

    anchor.id = anchorHash;
    anchor.href = anchorHash;
    anchor.classList.add('heading-anchor');
    anchor.appendChild(heading.cloneNode(true));
    heading.parentNode.replaceChild(anchor, heading);

    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState({}, '', anchorHash);
      window.scrollTo(anchor.offsetLeft, anchor.offsetTop - header.offsetHeight - 10);
    });

    if (window.location.hash === anchorHash) {
      setTimeout(() => {
        window.scrollTo(anchor.offsetLeft, anchor.offsetTop - header.offsetHeight - 10);
      }, 100);
    }

  });
}

