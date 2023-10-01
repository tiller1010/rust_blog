export const addLinkEventListeners = () => {
  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (link.href.indexOf('#') !== -1) {
        return;
      }
      if (typeof window.getPageContent === 'function') {
        getPageContent(link.href);
      }
      history.pushState({}, '', link.href);
    });
  });
}

