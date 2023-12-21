import { default as wasmbin } from './pkg/blog_wasm_bg.wasm';
import init, { im_blue } from 'blog_wasm';
import { initFramewerk, customizeFramewerk } from 'werkbot-framewerk';
import { get_page_content } from 'blog_wasm';
import { addLinkEventListeners } from './components/links';
import { addMenuEventListeners } from './components/menu';
import { addCodeCopyEventListeners } from './components/code-block'; 
import { addAnchorsToHeadings } from './components/anchors';

const fwProperties = {
  backgroundColorLight: '#1A1A1B',
  textColorDark: '#FFFFFF',
  primaryColor: '#353435',
  secondaryColor: '#4e4e4e',
  elementH1Properties_margin: '10px 0 10px 0',
  componentTypographyProperties_HeadingMargin: '50px 0 10px 0',
  elementPProperties_margin: '0 0 10px 0',
  layoutContainerWidth: '800px',
  fontText: 'monospace',
}

initFramewerk();
customizeFramewerk(fwProperties);

(async () => {
  await init(wasmbin);
  // im_blue();

  function initPage() {
    addLinkEventListeners();
    addMenuEventListeners();
    addCodeCopyEventListeners();
    addAnchorsToHeadings();
  };
  initPage();

  window.getPageContent = function(url) {
    get_page_content(url)
      .then((content) => {
        document.body.innerHTML = content;
        setTimeout(() => {
          initFramewerk();
          window.dispatchEvent(new Event('load'));
        }, 1000);
        initPage();
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

})();

