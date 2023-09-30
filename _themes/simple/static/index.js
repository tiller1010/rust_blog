import { default as wasmbin } from './pkg/blog_wasm_bg.wasm';
import init, { im_blue } from 'blog_wasm';
import { initFramewerk, customizeFramewerk } from 'werkbot-framewerk';
import { get_page_content } from 'blog_wasm';

const fwProperties = {
  backgroundColorLight: '#1A1A1B',
  textColorDark: '#FFFFFF',
  primaryColor: '#353435',
  secondaryColor: '#4e4e4e',
  componentTypographyProperties_HeadingMargin: '0 0 10px 0',
  elementPProperties_margin: '0 0 10px 0',
  layoutContainerWidth: '800px',
}

initFramewerk();
customizeFramewerk(fwProperties);

(async () => {
  await init(wasmbin);
  // im_blue();

  function getPageContent(url) {
    get_page_content(url)
      .then((content) => {
        document.body.innerHTML = content;
        setTimeout(() => {
          initFramewerk();
          window.dispatchEvent(new Event('load'));
        }, 1000);
        addEventListeners();
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  window.addEventListener('popstate', (e) => {
    e.preventDefault();
    getPageContent(location.href);
  });

  function addEventListeners() {
    addLinkEventListeners();
    addMenuEventListeners();
    addCodeCopyEventListeners();
  };
  addEventListeners();

  function addLinkEventListeners() {
    document.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        getPageContent(link.href);
        history.pushState({}, '', link.href);
      });
    });
  }

  function addMenuEventListeners() {
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

  function addCodeCopyEventListeners() {
    document.querySelectorAll('pre').forEach((pre) => {
      const copyButton = document.createElement('button');
      copyButton.innerText = 'Copy';
      copyButton.classList.add('copy-code-btn');
      copyButton.classList.add('button');
      pre.appendChild(copyButton);
      pre.addEventListener('click', (e) => {
        e.preventDefault();
        const copyText = pre.querySelector('code').innerText;
        navigator.clipboard.writeText(copyText);
      });
    });
  }

})();

