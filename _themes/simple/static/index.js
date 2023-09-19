import { default as wasmbin } from './pkg/blog_wasm_bg.wasm';
import init, { im_blue } from 'blog_wasm';
import { initFramewerk } from 'werkbot-framewerk';
import { get_page_content } from 'blog_wasm';

initFramewerk();

(async () => {
  await init(wasmbin);
  im_blue();

  function getPageContent(url) {
    get_page_content(url)
      .then((content) => {
        console.log(content);
        document.body.innerHTML = content;
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


