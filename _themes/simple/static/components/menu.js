export const addMenuEventListeners = () => {
  var menu = document.getElementById('menu');
  if (!menu) {
    return;
  }

  var headerNav = document.getElementById('header-nav');
  menu.addEventListener('click', function() {
    if (headerNav.style.display === "flex") {
      headerNav.style.display = "none";
    } else {
      headerNav.style.display = "flex";
    }
  });

  document.addEventListener('click', function(evt) {
    if (!window.matchMedia("(max-width: 767px)").matches) {
      return;
    }
    if (headerNav.style.display !== 'flex') {
      return;
    }

    let targetElement = evt.target;
    do {
      if (targetElement == menu) {
        return;
      }
      targetElement = targetElement.parentNode;
    } while (targetElement);

    headerNav.style.display = "none";
  });
};

