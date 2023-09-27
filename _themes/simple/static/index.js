import { default as wasmbin } from './pkg/blog_wasm_bg.wasm';
import init, { im_blue } from 'blog_wasm';
import { initFramewerk, customizeFramewerk } from 'werkbot-framewerk';
import { get_page_content } from 'blog_wasm';

const fwProperties = {
  backgroundColorLight: '#1A1A1B',
  textColorDark: '#FFFFFF',
  primaryColor: '#353435',
  secondaryColor: '#4e4e4e',
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
        addLinkEventListeners();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addLinkEventListeners() {
    document.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        getPageContent(link.href);
        history.pushState({}, '', link.href);
      });
    });
  }
  addLinkEventListeners();

})();

console.log('hello from js');

